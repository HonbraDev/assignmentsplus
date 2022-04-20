import { ListItemButton, Box, Typography, Chip } from "@mui/material";

import type { AssignmentListItem, CurrentAssignment } from "@utils/types";

function AssignmentListRow({
  assignment,
  selectedId,
  onSelect,
}: {
  assignment: AssignmentListItem;
  selectedId: string | undefined;
  onSelect: (assignment: CurrentAssignment) => void;
}) {
  return (
    <ListItemButton
      key={assignment.id}
      selected={assignment.id === selectedId}
      onClick={() =>
        onSelect({ id: assignment.id, classId: assignment.classId })
      }
      sx={{
        flexDirection: "column",
        mb: 1,
        mx: 1,
        borderRadius: 1,
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
              sx={{
                cursor: "inherit",
              }}
            />
          ))}
        </Box>
      )}
    </ListItemButton>
  );
}

export default AssignmentListRow;
