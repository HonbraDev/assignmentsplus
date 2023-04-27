import useAssignmentDetails from "@hooks/useAssignmentDetails";
import AssignmentFiles from "./assignmentFiles";
import AssignmentInstructions from "./assignmentInstructions";

import { Box, CircularProgress, Typography } from "@mui/material";

function AssignmentDetails({ classId, id }: { classId: string; id: string }) {
  const {
    data: assignment,
    loading,
    error,
  } = useAssignmentDetails(classId, id);

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
        {loading && <CircularProgress />}
        {error && <Typography>An error has occured.</Typography>}
        {assignment && (
          <>
            <Typography variant="h4">{assignment.displayName}</Typography>
            {assignment.instructions!.content && (
              <AssignmentInstructions instructions={assignment.instructions!} />
            )}
            {assignment.resources!.length > 0 && (
              <AssignmentFiles resources={assignment.resources!} />
            )}
          </>
        )}
      </Box>
    </>
  );
}

export default AssignmentDetails;
