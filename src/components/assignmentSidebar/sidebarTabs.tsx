import SidebarTab from "./sidebarTab";

import { Tabs } from "@mui/material";

import type { AssignmentFilter, AssignmentTabProps } from "@utils/types";

function SidebarTabs({
  loading,
  filter,
  tabs,
  setFilter,
}: {
  loading: boolean;
  filter: AssignmentFilter;
  tabs: AssignmentTabProps[];
  setFilter: (_event: any, filter: AssignmentFilter) => void;
}) {
  return (
    <Tabs
      value={filter}
      onChange={setFilter}
      variant="fullWidth"
      TabIndicatorProps={{
        children: <span className="MuiTabs-indicatorSpan" />,
      }}
      sx={{
        "& .MuiTabs-indicator": {
          display: "flex",
          justifyContent: "center",
          backgroundColor: "transparent",
          paddingX: 1,
        },
        "& .MuiTabs-indicatorSpan": {
          width: "100%",
          backgroundColor: "primary.main",
          borderRadius: 2,
        },
        px: 0.5,
      }}
    >
      {tabs.map((tab) => (
        <SidebarTab key={tab.value} disabled={loading} {...tab} />
      ))}
    </Tabs>
  );
}

export default SidebarTabs;
