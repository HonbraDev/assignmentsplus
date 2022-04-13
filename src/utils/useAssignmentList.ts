import client from "./graphClient";

import { useEffect, useState } from "react";

import type { EducationAssignment } from "@microsoft/microsoft-graph-types";
import type { AssignmentFilter, AssignmentListItem } from "./types";

import {
  Reply as ReplyIcon,
  RunningWithErrors as RunningWithErrorsIcon,
} from "@mui/icons-material";

const ignoredIds = [
  "5e93b18f-bd3e-4fe7-85df-cbdac5b3e168",
  "298e5edf-6814-42b9-b048-3a4312a94689",
  "3cb57e19-8f4c-4885-adf8-1271f729f458",
  "8947b886-f1f0-42b8-9acb-0671c374c707",
  "0099e0c9-a756-467b-9da6-7fc9c150ef91",
  "3d6b473e-c5ea-4b76-94cb-128becb325da",
  "a5057d0e-1c8d-4748-9c10-c296098ae619",
  "e8d7273e-5f32-48ac-b03a-43738d8b101a",
  "325cdcdb-5dc8-487a-9e4e-27e6695be250",
  "e2d53ce5-1909-4fda-a340-2ad87ab1d42b",
  "6251b366-fb3c-46ff-bf3b-a2b90b7ea616",
  "f1903eb7-7acd-4c94-bc3b-3cf82d56e97b",
  "39d303f2-ec9e-47d6-b7f3-9fdbd59512da",
  "dc208f0a-dae3-4d53-a117-35f87368fbff",
  "64f17091-7d2e-43ba-89a0-f37de6760e4c",
  "14cebb55-b015-4684-9121-236d7bb781e5",
  "022e3bf2-1538-4f68-b841-7d2cd5688837",
];

function useAssignmentList() {
  const [assignments, setAssignments] = useState<
    Record<AssignmentFilter, AssignmentListItem[]>
  >({
    working: [],
    submitted: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async () => {
    setLoading(true);
    setLoading(true);
    const response = await client
      .api(
        "/education/me/assignments?$expand=submissions&$orderby=dueDateTime desc&$top=1000"
      )
      .get();
    const all = response.value as EducationAssignment[];
    console.time("parseAssignments");
    const parsed = parseAssignments(all);
    console.timeEnd("parseAssignments");
    setAssignments(parsed);
    setLoading(false);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return { assignments, loading, refetch: fetchAssignments };
}

export default useAssignmentList;

function parseAssignments(assignments: EducationAssignment[]) {
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
