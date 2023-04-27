import { useEffect, useState } from "react";

import type DashboardType from "./dashboard";

function DashboardLoader() {
  const [Dashboard, setDashboard] = useState<typeof DashboardType | null>(null);

  useEffect(() => {
    (async () => {
      const { default: Dashboard } = await import("./dashboard");
      setDashboard(Dashboard);
    })();
  }, []);

  if (!Dashboard) return <>Loading...</>;

  return <Dashboard />;
}

export default DashboardLoader;
