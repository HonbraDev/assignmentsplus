import client from "./graphClient";

import { useEffect, useState } from "react";

import type { EducationAssignment } from "@microsoft/microsoft-graph-types";
import type { AssignmentFilter, AssignmentListItem } from "./types";

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
    let working: AssignmentListItem[] = [];
    let submitted: AssignmentListItem[] = [];
    const fourMonthsAgo = Date.now() - 10368000000;
    all.forEach((assignment) => {
      const listItem = {
        id: assignment.id!,
        classId: assignment.classId!,
        displayName: assignment.displayName!,
        dateString: new Date(assignment.dueDateTime!).toLocaleString(),
        due: Date.parse(assignment.dueDateTime!),
        submitted: assignment.submissions![0].submittedDateTime
          ? Date.parse(assignment.submissions![0].submittedDateTime)
          : undefined,
        returned: assignment.submissions![0].status === "returned",
        reassigned: assignment.submissions![0].status === "reassigned",
        status: assignment.submissions![0].status!,
      };
      if (Date.parse(assignment.dueDateTime!) < fourMonthsAgo) return;
      switch (assignment.submissions![0].status!) {
        case "working":
          working.push(listItem);
          break;
        case "reassigned":
          working.push(listItem);
          break;
        case "submitted":
          submitted.push(listItem);
          break;
        case "returned":
          submitted.push(listItem);

        default:
          break;
      }
    });
    working = working.sort((a, b) => a.due - b.due);
    submitted = submitted.sort((a, b) => a.submitted! - b.submitted!);
    setAssignments({
      working,
      submitted,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return { assignments, loading, refetch: fetchAssignments };
}

export default useAssignmentList;
