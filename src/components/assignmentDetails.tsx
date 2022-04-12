import client from "../utils/graphClient";

import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import type { EducationAssignment } from "@microsoft/microsoft-graph-types";

function AssignmentDetails({ classId, id }: { classId: string; id: string }) {
  const [assignment, setAssignment] = useState<EducationAssignment>();

  const getAssignment = async () => {
    setAssignment(undefined);
    const response = await client
      .api(`/education/classes/${classId}/assignments/${id}?$expand=*`)
      .get();
    setAssignment(response);
    console.log("Assignment details", response);
  };

  useEffect(() => {
    getAssignment();
  }, [classId, id]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        {assignment !== undefined ? (
          <>
            <Typography variant="h5">{assignment.displayName}</Typography>
            <Typography variant="body1">
              Due {new Date(assignment.dueDateTime!).toLocaleString()}
              {assignment.closeDateTime && (
                <>
                  {" "}
                  - Closes{" "}
                  {new Date(assignment.closeDateTime!).toLocaleString()}
                </>
              )}
            </Typography>

            <Grid container spacing={2}>
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography variant="h6">Instructions</Typography>
                <Typography variant="body1">
                  {assignment.instructions?.contentType === "html" ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: assignment.instructions?.content!,
                      }}
                    />
                  ) : (
                    assignment.instructions?.content
                  )}
                </Typography>
              </Grid>
              {(assignment.resources || []).length > 0 && (
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <Typography variant="h6">Files</Typography>
                  <ul>
                    {assignment.resources!.map((resource) => (
                      <li key={resource.id}>
                        {resource.resource!.displayName}
                      </li>
                    ))}
                  </ul>
                </Grid>
              )}
            </Grid>
          </>
        ) : (
          <Box
            sx={{
              pt: 4,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
}

export default AssignmentDetails;
