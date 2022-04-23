import useAssignmentList from "@hooks/useAssignmentList";
import AssignmentList from "./assignmentList";
import SidebarTabs from "./sidebarTabs";

import { CircularProgress, Box, Card } from "@mui/material";
import { useEffect, useState } from "react";
import {
  InboxOutlined as InboxIcon,
  Done as DoneIcon,
} from "@mui/icons-material";

import type { AssignmentFilter, CurrentAssignment } from "@utils/types";

function AssignmentSidebar({
  selected,
  onSelect,
}: {
  selected: CurrentAssignment | undefined;
  onSelect: (assignment: CurrentAssignment) => void;
}) {
  const {
    data: assignments,
    loading,
    error,
    ignore,
    fetch: fetchAssignments,
  } = useAssignmentList();
  const [filter, setFilter] = useState<AssignmentFilter>("working");

  useEffect(() => {
    fetchAssignments();
  }, []);

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
          <SidebarTabs
            loading={loading}
            filter={filter}
            setFilter={(_, filter) => setFilter(filter)}
            tabs={[
              {
                label: "Assigned",
                icon: <InboxIcon />,
                value: "working",
              },
              {
                label: "Submitted",
                icon: <DoneIcon />,
                value: "submitted",
              },
            ]}
          />
          {loading && (
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
          {error && (
            <Box
              sx={{
                pt: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <p>Error fetching assignments</p>
            </Box>
          )}
          {!loading && !error && (
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
                onIgnore={ignore}
              />
            </Box>
          )}
        </Card>
      </Box>
    </>
  );
}

export default AssignmentSidebar;
