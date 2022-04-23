import parseAssignments from "@utils/parseAssignments";

import { useState, useEffect } from "react";

import type { AssignmentList } from "@utils/types";
import type { EducationAssignment } from "@microsoft/microsoft-graph-types";

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
