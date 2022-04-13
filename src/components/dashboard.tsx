import AssignmentSidebar from "./assignmentSidebar";
import AssignmentDetails from "./assignmentDetails";

import { useState } from "react";
import { Box, Toolbar, Typography, IconButton, Container } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

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
      }}
    >
      <Container
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Toolbar disableGutters>
          <Typography variant="h6">Assignments+</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton aria-label="options">
            <MoreVert />
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
