import AssignmentListRow from "./assignmentListRow";

import { Box, Typography } from "@mui/material";
import { Virtuoso } from "react-virtuoso";

import type {
  AssignmentFilter,
  AssignmentListItem,
  CurrentAssignment,
} from "@utils/types";
import ErrorMessage from "@components/errorMessage";

function AssignmentList({
  assignments,
  currentFilter,
  selectedId,
  onSelect,
  onIgnore,
}: {
  assignments: AssignmentListItem[];
  currentFilter: AssignmentFilter;
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
      {assignments.length > 0 ? (
        <Virtuoso
          totalCount={assignments.length}
          itemContent={(index) => (
            <AssignmentListRow
              assignment={assignments[index]}
              selectedId={selectedId}
              onSelect={onSelect}
              onIgnore={onIgnore}
            />
          )}
        />
      ) : (
        <Box
          sx={{
            p: 2,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {(() => {
            switch (currentFilter) {
              case "working":
                return (
                  <>
                    <Typography variant="h5">All done!</Typography>
                    <Typography variant="body1">
                      You have completed all of your assignments.
                    </Typography>
                  </>
                );
              case "submitted":
                return (
                  <>
                    <Typography variant="h5">All done!</Typography>
                    <Typography variant="body1">
                      You have completed all of your assignments.
                    </Typography>
                  </>
                );
              default:
                return (
                  <>
                    <ErrorMessage variant="h5" />
                    <Typography variant="body1">
                      This is a bug. The funny words are{" "}
                      "<code>{currentFilter}</code>". Please tell the magic man
                      about this.
                    </Typography>
                  </>
                );
            }
          })()}
        </Box>
      )}
    </Box>
  );
}

export default AssignmentList;
