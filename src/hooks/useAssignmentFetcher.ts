import fetchAssignments from "@utils/fetchAssignments";

import { useState } from "react";

import type { EducationAssignment } from "@microsoft/microsoft-graph-types";

function useAssignmentFetcher() {
  const [assignments, setAssignments] = useState<EducationAssignment[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = async () => {
    setError(false);
    setLoading(true);
    try {
      const data = await fetchAssignments();
      setAssignments(data);
    } catch (e) {
      console.error(e);
      setError(true);
    }
    setLoading(false);
  };

  return { data: assignments, fetch, error, loading };
}

export default useAssignmentFetcher;
