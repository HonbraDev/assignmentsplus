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
    returned: [],
    released: [],
    reassigned: [],
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
    const working: AssignmentListItem[] = [];
    const submitted: AssignmentListItem[] = [];
    const returned: AssignmentListItem[] = [];
    const released: AssignmentListItem[] = [];
    const reassigned: AssignmentListItem[] = [];
    const fourMonthsAgo = Date.now() - 10368000000;
    all
      .sort((a, b) => Date.parse(a.dueDateTime!) - Date.parse(b.dueDateTime!))
      .forEach((assignment) => {
        const listItem = {
          id: assignment.id!,
          classId: assignment.classId!,
          displayName: assignment.displayName!,
          dateString: assignment.dueDateTime!.toLocaleString(),
        };
        if (Date.parse(assignment.dueDateTime!) < fourMonthsAgo) return;
        switch (assignment.submissions![0].status!) {
          case "working":
            working.push(listItem);
            break;
          case "submitted":
            submitted.push(listItem);
            break;
          case "returned":
            returned.push(listItem);
            break;
          case "released":
            released.push(listItem);
            break;
          case "reassigned":
            reassigned.push(listItem);
            break;
          default:
            break;
        }
      });
    setAssignments({
      working,
      submitted,
      returned,
      released,
      reassigned,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return { assignments, loading, refetch: fetchAssignments };
}

export default useAssignmentList;
