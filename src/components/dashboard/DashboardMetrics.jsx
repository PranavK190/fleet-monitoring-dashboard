import { useEffect, useState } from "react";

import {
  getDashboardMetrics,
} from "../../services/dashboard-service";

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
    <section
      aria-label="Fleet overview metrics"
      style={{
        width: "100%",
        minWidth: 0,
      }}
    >
      <div
        style={{
          marginBottom: "28px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#F8FAFC",
            fontSize: "clamp(21px, 2vw, 27px)",
            fontWeight: "700",
            letterSpacing: "-0.3px",
          }}
        >
          Fleet Overview
        </h2>

        <p
          style={{
            margin: "8px 0 0",
            color: "#94A3B8",
            fontSize: "14px",
            lineHeight: 1.5,
          }}
        >
          A quick overview of your fleet operations.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
          gap: "24px",
          width: "100%",
          minWidth: 0,
          alignItems: "stretch",
        }}
      >
        <MetricCard
          title="Total Fleet"
          value={`${metrics.totalFleet} Fleets`}
          accentColor="#38BDF8"
        />

        <MetricCard
          title="Total Drivers"
          value={`${metrics.totalDrivers} Drivers`}
          accentColor="#818CF8"
        />

        <MetricCard
          title="Active Drivers"
          value={`${metrics.activeDrivers} Drivers`}
          accentColor="#2DD4BF"
        />

        <MetricCard
          title="Alerts"
          value={metrics.alerts}
          accentColor="#FB7185"
          valueColor="#FDA4AF"
        />
      </div>
    </section>
  );
}

export default DashboardMetrics;