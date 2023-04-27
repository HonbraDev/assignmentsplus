import AssignmentDetails from "./assignmentDetails";
import AssignmentSidebar from "./assignmentSidebar";

import { MoreVertOutlined as MoreVertIcon } from "@mui/icons-material";
import { Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { useState } from "react";

import type { CurrentAssignment } from "@utils/types";

function Dashboard() {
  const [currentAssignment, setCurrentAssignment] =
    useState<CurrentAssignment>();

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,

        height: "100%",
        width: "100%",

        userSelect: "none",
      }}
    >
      <Container
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Toolbar disableGutters>
          <Typography variant="h6">Assignments+</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton aria-label="options">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
        <Box
          sx={{
            gap: 4,
            flexGrow: 1,
            overflowY: "auto",
            display: "flex",
          }}
        >
          <AssignmentSidebar
            selected={currentAssignment}
            onSelect={(assignment: CurrentAssignment) =>
              setCurrentAssignment(assignment)
            }
          />
          {currentAssignment && (
            <AssignmentDetails
              id={currentAssignment.id}
              classId={currentAssignment?.classId}
            />
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Dashboard;
