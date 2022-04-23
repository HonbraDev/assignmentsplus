import AssignmentListRow from "./assignmentListRow";

import { Box, List } from "@mui/material";
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
        py: 1,
      }}
    >
      <Virtuoso
        totalCount={assignments.length}
        itemContent={(index) => (
          <AssignmentListRow
            assignment={assignments[index]}
            selectedId={selectedId}
            onSelect={onSelect}
            onIgnore={onIgnore}
            isFirst={index === 0}
          />
        )}
        components={{
          // @ts-ignore
          List,
        }}
      />
    </Box>
  );
}

export default AssignmentList;
