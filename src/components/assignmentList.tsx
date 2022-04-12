import {
  Box,
  ButtonBase,
  Card,
  Chip,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

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
  const today = new Date().getTime();
  return (
    <List disablePadding>
      {assignments.map((assignment) => {
        if (assignment.reassigned) console.log(assignment);
        return (
          <ListItemButton
            key={assignment.id}
            selected={assignment.id === selectedId}
            onClick={() =>
              onSelect({ id: assignment.id, classId: assignment.classId })
            }
            sx={{
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 0.5,
              }}
            >
              <Typography variant="body1">{assignment.displayName}</Typography>
              <Typography variant="body2" color="text.secondary">
                {assignment.dateString}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 0.5,
                }}
              >
                {assignment.due < today &&
                  (assignment.status === "working" ||
                    assignment.status === "reassigned") && (
                    <Chip
                      variant="outlined"
                      size="small"
                      label="Late"
                      sx={{ marginTop: 0.5 }}
                    />
                  )}
                {assignment.returned && (
                  <Chip
                    variant="outlined"
                    size="small"
                    label="Returned"
                    sx={{ marginTop: 0.5 }}
                  />
                )}
                {assignment.submitted && (
                  <Chip
                    variant="outlined"
                    size="small"
                    label="Submitted"
                    sx={{ marginTop: 0.5 }}
                  />
                )}
                {assignment.reassigned && (
                  <Chip
                    variant="outlined"
                    size="small"
                    label="Reassigned"
                    sx={{ marginTop: 0.5 }}
                  />
                )}
              </Box>
            </Box>
          </ListItemButton>
        );
      })}
    </List>
  );
}

export default AssignmentList;
