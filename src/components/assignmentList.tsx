import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";

import { List, ListItemButton, ListItemText } from "@mui/material";
import type { AssignmentListItem, CurrentAssignment } from "../utils/types";

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
    <List disablePadding>
      {assignments.map((assignment) => (
        <ListItemButton
          key={assignment.id}
          selected={assignment.id === selectedId}
          onClick={() =>
            onSelect({ id: assignment.id, classId: assignment.classId })
          }
        >
          <ListItemText
            primary={assignment.displayName}
            secondary={assignment.dateString}
          />
        </ListItemButton>
      ))}
    </List>
  );
}

export default AssignmentList;
