import { useEffect, useState } from "react";

import { getDashboardMetrics } from "../../services/dashboard-service";

import MetricCard from "../common/MetricCard";

function DashboardMetrics() {
  const [metrics, setMetrics] = useState({
    totalFleet: 0,
    totalDrivers: 0,
    alerts: 0,
    activeDrivers: 0,
  });

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await getDashboardMetrics();

        console.log("Dashboard metrics:", data);

        setMetrics(data);
      } catch (error) {
        console.error(
          "Failed to load dashboard metrics:",
          error
        );
      }
    }

    loadMetrics();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "60px",
        alignItems: "center",
      }}
    >
      {/* Top Row */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <MetricCard
          title="Total Fleet"
          value={`${metrics.totalFleet} Fleets`}
        />

        <MetricCard
          title="Total Drivers"
          value={`${metrics.totalDrivers} Drivers`}
        />
      </div>

      {/* Bottom Row */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <MetricCard
          title="Active Drivers"
          value={`${metrics.activeDrivers} Drivers`}
        />

        <MetricCard
          title="Alerts"
          value={metrics.alerts}
          valueColor="red"
        />
      </div>
    </div>
  );
}

export default DashboardMetrics;