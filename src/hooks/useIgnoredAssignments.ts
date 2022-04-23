import useLocalStorage from "./useLocalStorage";

function useIgnoredAssignments() {
  const [ignoredIds, setIgnoredIds] = useLocalStorage<string[]>(
    "ignoredIds",
    []
  );

  const add = (id: string) => {
    if (ignoredIds.includes(id)) return false;
    setIgnoredIds([...ignoredIds, id]);
    return true;
  };

  const remove = (id: string) => {
    const index = ignoredIds.indexOf(id);
    if (index === -1) return false;
    const copy = [...ignoredIds];
    copy.splice(index, 1);
    setIgnoredIds(copy);
    return true;
  };

  return { data: ignoredIds, add, remove };
}

export default useIgnoredAssignments;
