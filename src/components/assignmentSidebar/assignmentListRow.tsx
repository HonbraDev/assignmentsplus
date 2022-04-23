import copy from "copy-to-clipboard";

import {
  ListItemButton,
  Box,
  Typography,
  Chip,
  Menu,
  MenuItem,
  ListItemText,
  ListItemIcon,
  ListItem,
} from "@mui/material";
import { useState } from "react";
import {
  BlockOutlined as BlockIcon,
  ContentCopyOutlined as ContentCopyIcon,
} from "@mui/icons-material";

import type { AssignmentListItem, CurrentAssignment } from "@utils/types";

function AssignmentListRow({
  assignment,
  selectedId,
  onSelect,
  onIgnore,
}: {
  assignment: AssignmentListItem;
  selectedId: string | undefined;
  onSelect: (assignment: CurrentAssignment) => void;
  onIgnore: (id: string) => void;
}) {
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : null
    );
  };

  const handleClose = () => setContextMenu(null);

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          key={assignment.id}
          selected={assignment.id === selectedId}
          onContextMenu={handleContextMenu}
          onClick={() =>
            onSelect({ id: assignment.id, classId: assignment.classId })
          }
          sx={{
            flexDirection: "column",
            mx: 1,
            mb: 1,
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
                mt: 1,
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
      </ListItem>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            onIgnore(assignment.id);
            handleClose();
          }}
        >
          <ListItemIcon>
            <BlockIcon />
          </ListItemIcon>
          <ListItemText>Ignore</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            copy(assignment.url);
            handleClose();
          }}
        >
          <ListItemIcon>
            <ContentCopyIcon />
          </ListItemIcon>
          <ListItemText>Copy URL</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default AssignmentListRow;
