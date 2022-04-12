import useAssignmentList from "../utils/useAssignmentList";
import AssignmentList from "./assignmentList";

import { CircularProgress, Box, Tabs, Tab, Card, Divider } from "@mui/material";
import { useEffect, useState } from "react";

import type { AssignmentFilter, CurrentAssignment } from "../utils/types";

function AssignmentSidebar({
  selected,
  onSelect,
}: {
  selected: CurrentAssignment | undefined;
  onSelect: (assignment: CurrentAssignment) => void;
}) {
  const { assignments, loading } = useAssignmentList();
  const [filter, setFilter] = useState<AssignmentFilter>("working");

  useEffect(() => {
    if (selected) return;
    if (assignments[filter].length === 0) return;
    onSelect(assignments[filter][0]);
  }, [assignments]);

  return (
    <>
      <Box
        sx={{
          maxWidth: 300,
          paddingBottom: 4,
          height: "100%",
          width: "100%",
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Tabs
            value={filter}
            onChange={(_event, newFilter) => setFilter(newFilter)}
            variant="fullWidth"
          >
            {assignments.working.length > 0 && (
              <Tab label="Assigned" value="working" />
            )}
            {assignments.submitted.length > 0 && (
              <Tab label="Submitted" value="submitted" />
            )}
          </Tabs>
          <Divider />
          {loading ? (
            <Box
              sx={{
                pt: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
              }}
            >
              <AssignmentList
                assignments={assignments[filter]}
                selectedId={selected?.id}
                onSelect={onSelect}
              />
            </Box>
          )}
        </Card>
      </Box>
    </>
  );
}

export default AssignmentSidebar;
