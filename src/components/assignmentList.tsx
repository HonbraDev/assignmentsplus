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
  return (
    <List disablePadding>
      {assignments.map((assignment) => {
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
                {assignment.dueDateString}
              </Typography>
            </Box>
            {assignment.showTags && (
              <Box
                sx={{
                  display: "flex",
                  gap: 0.5,
                  width: "100%",
                  my: 1,
                }}
              >
                {assignment.tags!.map((tag) => (
                  <Chip
                    key={tag.label}
                    label={tag.label}
                    icon={<tag.icon />}
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          </ListItemButton>
        );
      })}
    </List>
  );
}

export default AssignmentList;
