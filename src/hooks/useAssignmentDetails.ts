import getAssignment from "@utils/getAssignment";

import { useEffect, useState } from "react";

import type { EducationAssignment } from "@microsoft/microsoft-graph-types";

function useAssignmentDetails(classId: string, id: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [assignment, setAssignment] = useState<EducationAssignment | null>(
    null
  );

  const loadAssignment = async (classId: string, id: string) => {
    setAssignment(null);
    setError(false);
    setLoading(true);
    try {
      const assignment = await getAssignment(classId, id);
      setAssignment(assignment);
    } catch (e) {
      console.error(e);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAssignment(classId, id);
  }, [classId, id]);

  return {
    data: assignment,
    loading,
    error,
    fetch: loadAssignment,
  };
}

export default useAssignmentDetails;
