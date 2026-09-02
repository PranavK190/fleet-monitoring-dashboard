import { useEffect, useState } from "react";

import { getDashboardMetrics } from "../../services/dashboard-service";

import MetricCard from "../common/MetricCard";

function DashboardMetrics() {
  const [metrics, setMetrics] = useState({
    totalFleet: 0,
    alerts: 0,
    activeDrivers: 0,
  });

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await getDashboardMetrics();
        setMetrics(data);
      } catch (error) {
        console.error("Failed to load dashboard metrics:", error);
      }
    }

    loadMetrics();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "70px",
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
        }}
      >
        <MetricCard
          title="Total Fleet"
          value={`${metrics.totalFleet} Fleets`}
        />

        <MetricCard
          title="Alerts"
          value={metrics.alerts}
          valueColor="red"
        />
      </div>

      {/* Bottom Card */}
      <MetricCard
        title="Active Drivers"
        value={`${metrics.activeDrivers} Drivers`}
      />
    </div>
  );
}

export default DashboardMetrics;