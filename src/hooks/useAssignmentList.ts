import client from "@utils/graphClient";
import useLocalStorage from "@hooks/useLocalStorage";

import {
  ReplyOutlined as ReplyIcon,
  RunningWithErrorsOutlined as RunningWithErrorsIcon,
} from "@mui/icons-material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PageIterator } from "@microsoft/microsoft-graph-client";

import type { EducationAssignment } from "@microsoft/microsoft-graph-types";
import type {
  AssignmentFilter,
  AssignmentListItem,
  AssignmentList,
} from "@utils/types";

function useAssignmentList() {
  const [assignments, setAssignments] = useState<AssignmentList>({
    working: [],
    submitted: [],
  });
  const [ignoredIds, setIgnoredIds] = useLocalStorage<string[]>(
    "ignoredIds",
    []
  );
  const [loading, setLoading] = useState(true);

  const fetchAssignments = assignmentFetcher(
    setLoading,
    setAssignments,
    ignoredIds
  );
  const sortAssignments = assignmentFilterer(
    assignments,
    setAssignments,
    ignoredIds
  );
  const ignore = (id: string) => {
    setIgnoredIds((ids) => [...ids, id]);
    sortAssignments(id);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return { assignments, loading, refetch: fetchAssignments, ignore };
}

export default useAssignmentList;

function assignmentFilterer(
  assignments: AssignmentList,
  setAssignments: Dispatch<SetStateAction<AssignmentList>>,
  ignoredIds: string[]
) {
  return (newId?: string) => {
    if (newId) ignoredIds.push(newId);
    const filtered = {
      working: assignments.working.filter((a) => !ignoredIds.includes(a.id)),
      submitted: assignments.submitted.filter(
        (a) => !ignoredIds.includes(a.id)
      ),
    };
    setAssignments(filtered);
  };
}

function assignmentFetcher(
  setLoading: Dispatch<SetStateAction<boolean>>,
  setAssignments: Dispatch<SetStateAction<AssignmentList>>,
  ignoredIds: string[]
) {
  return async () => {
    setLoading(true);
    setLoading(true);
    const response = await client
      .api(
        "/education/me/assignments?$expand=submissions&$orderby=dueDateTime desc&$top=1000"
      )
      .get();

    const assignments: EducationAssignment[] = [];

    const iterator = new PageIterator(client, response, (data) =>
      Boolean(assignments.push(data))
    );

    await iterator.iterate();

    console.time("Parse assignments");
    const parsed = parseAssignments(assignments, ignoredIds);
    console.timeEnd("Parse assignments");
    setAssignments(parsed);
    setLoading(false);
  };
}

function parseAssignments(
  assignments: EducationAssignment[],
  ignoredIds: string[]
) {
  const lists: Record<AssignmentFilter, AssignmentListItem[]> = {
    working: [],
    submitted: [],
  };

  for (const assignment of assignments) {
    if (ignoredIds.includes(assignment.id!)) continue;
    const parsed = parseAssignment(assignment);
    if (!parsed) continue;
    lists[parsed.list].push(parsed);
  }

  lists.working = lists.working.sort((a, b) => a.dueDateInt - b.dueDateInt);
  lists.submitted = lists.submitted.sort(
    (a, b) =>
      (b.submittedDateInt || b.returnedDateInt!) -
      (a.submittedDateInt || a.returnedDateInt!)
  );

  return lists;
}

function parseAssignment(
  assignment: EducationAssignment
): AssignmentListItem | void {
  const list = getList(assignment);
  if (!list) return;

  // get statuses
  const status = assignment.submissions![0].status!;
  const submitted = ["submitted", "returned"].includes(
    assignment.submissions![0].status!
  );
  const returned = assignment.submissions![0].status === "returned";
  const reassigned = assignment.submissions![0].status === "reassigned";

  // get dates
  const dueDateInt = Date.parse(assignment.dueDateTime!);
  const dueDateString = new Date(dueDateInt).toLocaleDateString();
  const submittedDateInt = submitted
    ? Date.parse(assignment.submissions![0].submittedDateTime!)
    : undefined;
  const returnedDateInt = returned
    ? Date.parse(assignment.submissions![0].returnedDateTime!)
    : undefined;

  // get tags
  const tags: AssignmentListItem["tags"] = [];
  if (!submitted && Date.now() > dueDateInt)
    tags.push({
      label: "Past due",
      icon: RunningWithErrorsIcon,
    });
  if (status === "reassigned")
    tags.push({
      label: "Reassigned",
      icon: ReplyIcon,
    });
  else if (returned)
    tags.push({
      label: "Returned",
      icon: ReplyIcon,
    });

  const showTags = tags.length > 0;

  return {
    list,
    id: assignment.id!,
    classId: assignment.classId!,
    displayName: assignment.displayName!,
    dueDateInt,
    dueDateString,
    returnedDateInt,
    status,
    submitted,
    returned,
    reassigned,
    tags,
    showTags,
    submittedDateInt,
    url: assignment.webUrl!,
  };
}

function getList(assignment: EducationAssignment) {
  switch (assignment.submissions![0].status!) {
    case "working":
    case "reassigned":
      return "working";
    case "submitted":
    case "returned":
      return "submitted";
    default:
      return;
  }
}
