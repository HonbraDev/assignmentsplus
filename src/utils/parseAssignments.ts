import parseAssignment from "@utils/parseAssignment";

import type { EducationAssignment } from "@microsoft/microsoft-graph-types";
import type { AssignmentFilter, AssignmentListItem } from "@utils/types";

function parseAssignments(
  assignments: EducationAssignment[],
  ignoredIds: string[]
) {
  console.time("parseAssignments");

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

  console.timeEnd("parseAssignments");

  return lists;
}

export default parseAssignments;
