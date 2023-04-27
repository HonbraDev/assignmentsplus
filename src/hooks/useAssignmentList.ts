import useAssignmentFetcher from "@hooks/useAssignmentFetcher";
import useIgnoredAssignments from "@hooks/useIgnoredAssignments";
import useParsedAssignments from "@hooks/useParsedAssignments";

function useAssignmentList() {
  const {
    data: rawAssignments,
    fetch: fetchAssignments,
    error,
    loading,
  } = useAssignmentFetcher();
  const {
    data: ignored,
    add: ignore,
    remove: unignore,
  } = useIgnoredAssignments();

  const { data: assignments } = useParsedAssignments(rawAssignments, ignored);

  return {
    data: assignments,
    fetch: fetchAssignments,
    loading,
    error,
    ignore,
    unignore,
  };
}

export default useAssignmentList;
