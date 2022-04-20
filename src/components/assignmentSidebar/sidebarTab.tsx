import { Tab } from "@mui/material";

import type { TabProps } from "@mui/material";

function SidebarTab(props: TabProps) {
  return (
    <Tab
      iconPosition="start"
      sx={{ minHeight: 40, mt: 1, mx: 0.5, borderRadius: 1 }}
      {...props}
    />
  );
}

export default SidebarTab;
