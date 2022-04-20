import AssignmentListRow from "./assignmentListRow";

import { List } from "@mui/material";
import { Virtuoso } from "react-virtuoso";

import type { AssignmentListItem, CurrentAssignment } from "@utils/types";

function AssignmentList({
  assignments,
  selectedId,
  onSelect,
}: {
  assignments: AssignmentListItem[];
  selectedId: string | undefined;
  onSelect: (assignment: CurrentAssignment) => void;
}) {
  return (
    <List
      sx={{
        height: "100%",
        pt: 1,
      }}
    >
      <Virtuoso
        totalCount={assignments.length}
        itemContent={(index) => (
          <AssignmentListRow
            assignment={assignments[index]}
            selectedId={selectedId}
            onSelect={onSelect}
          />
        )}
      />
    </List>
  );
}

export default AssignmentList;
