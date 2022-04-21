import AssignmentListRow from "./assignmentListRow";

import { Box } from "@mui/material";
import { Virtuoso } from "react-virtuoso";

import type { AssignmentListItem, CurrentAssignment } from "@utils/types";

function AssignmentList({
  assignments,
  selectedId,
  onSelect,
  onIgnore,
}: {
  assignments: AssignmentListItem[];
  selectedId: string | undefined;
  onSelect: (assignment: CurrentAssignment) => void;
  onIgnore: (id: string) => void;
}) {
  return (
    <Box
      sx={{
        height: "100%",
        pt: 1,
      }}
    >
      <Virtuoso
        totalCount={assignments.length + 1}
        itemContent={(index) =>
          index !== assignments.length ? (
            <AssignmentListRow
              assignment={assignments[index]}
              selectedId={selectedId}
              onSelect={onSelect}
              onIgnore={onIgnore}
            />
          ) : (
            <Box
              sx={{
                pt: 1,
              }}
            />
          )
        }
      />
    </Box>
  );
}

export default AssignmentList;
