import parseAssignments from "@utils/parseAssignments";

import { useEffect, useState } from "react";

import type { EducationAssignment } from "@microsoft/microsoft-graph-types";
import type { AssignmentList } from "@utils/types";

function useParsedAssignments(
  rawAssignments: EducationAssignment[],
  ignoredIds: string[]
) {
  const [assignments, setAssignments] = useState<AssignmentList>({
    working: [],
    submitted: [],
  });

  useEffect(() => {
    if (rawAssignments.length === 0) return;
    const parsed = parseAssignments(rawAssignments, ignoredIds);
    setAssignments(parsed);
  }, [rawAssignments, ignoredIds]);

  return { data: assignments };
}

export default useParsedAssignments;
