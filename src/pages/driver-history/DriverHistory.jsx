
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getDriverHistory } from "../../services/driver-service";

import PageHeader from "../../components/layout/PageHeader";

function displayValue(value) {
  return value !== null && value !== undefined && value !== ""
    ? value
    : "N/A";
}

function formatPercentage(value) {
  if (value === null || value === undefined) {
    return "N/A";
  }

  return `${Math.round(value)}%`;
}

function DriverHistory() {
  const { state } = useLocation();

  const [history, setHistory] = useState({
    metrics: [],
    averageFatigue: null,
    maxFatigue: null,
    drowsyEvents: 0,
    unresponsiveEvents: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      if (!state?.id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getDriverHistory(state.id);

        setHistory(data);
      } catch (error) {
        console.error("Failed to load driver history:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [state]);

  const stats = [
    {
      label: "Avg Fatigue Level",
      value: formatPercentage(history.averageFatigue),
    },
    {
      label: "Max Fatigue Level",
      value: formatPercentage(history.maxFatigue),
    },
    {
      label: "Total Drowsy Events",
      value: displayValue(history.drowsyEvents),
    },
    {
      label: "Total Unresponsive Events",
      value: displayValue(history.unresponsiveEvents),
    },
  ];

  const chartMetrics = history.metrics
    .filter(
      (metric) =>
        metric.fatigue_score !== null &&
        metric.fatigue_score !== undefined
    )
    .slice(-6);

  const chartPoints = chartMetrics.map((metric, index) => {
    const x =
      chartMetrics.length === 1
        ? 250
        : 20 + (index * 450) / (chartMetrics.length - 1);

    const score = Math.max(
      0,
      Math.min(100, metric.fatigue_score)
    );

    const y = 230 - (score / 100) * 200;

    return {
      x,
      y,
    };
  });

  const polylinePoints = chartPoints
    .map((point) => `${point.x},${point.y}`)
    .join(" ");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0B1220",
        color: "#F8FAFC",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <PageHeader
        title="Drivers History"
        showBackButton={true}
        showAlertButton={true}
        alertRoute="/alert"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "40px",
          padding: "clamp(20px, 3vw, 50px)",
          flexWrap: "wrap",
          boxSizing: "border-box",
          alignItems: "flex-start",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flex: "1.4 1 450px",
            minWidth: 0,
          }}
        >
          <div
            style={{
              background: "linear-gradient(145deg, #111B2E 0%, #152238 100%)",
              border: "1px solid #26364D",
              borderRadius: "14px",
              minHeight: "420px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              boxSizing: "border-box",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.16)",
            }}
          >
            <h2
              style={{
                margin: "0 0 30px",
                color: "#F8FAFC",
                fontSize: "clamp(18px, 2vw, 24px)",
                textAlign: "center",
                fontWeight: "650",
              }}
            >
              Driver Safety Score History
            </h2>

            {loading ? (
              <p
                style={{
                  color: "#CBD5E1",
                  fontSize: "18px",
                }}
              >
                Loading history...
              </p>
            ) : chartPoints.length === 0 ? (
              <p
                style={{
                  color: "#94A3B8",
                  fontSize: "18px",
                }}
              >
                No history available
              </p>
            ) : (
              <div
                style={{
                  width: "85%",
                  height: "250px",
                  borderLeft: "2px solid #64748B",
                  borderBottom: "2px solid #64748B",
                  position: "relative",
                  boxSizing: "border-box",
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 500 250"
                >
                  <polyline
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="3"
                    points={polylinePoints}
                  />

                  {chartPoints.map((point, index) => (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="5"
                      fill="#38BDF8"
                    />
                  ))}
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: "1 1 360px",
            minWidth: 0,
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#111B2E",
              color: "#F8FAFC",
              fontSize: "18px",
              border: "1px solid #334863",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.16)",
            }}
          >
            <tbody>
              {stats.map((item) => (
                <tr key={item.label}>
                  <td
                    style={{
                      border: "1px solid #334863",
                      padding: "24px 18px",
                      width: "70%",
                      color: "#CBD5E1",
                      lineHeight: "1.5",
                    }}
                  >
                    {item.label}
                  </td>

                  <td
                    style={{
                      border: "1px solid #334863",
                      textAlign: "center",
                      padding: "18px 12px",
                      fontWeight: "700",
                      color: "#7DD3FC",
                      lineHeight: "1.5",
                    }}
                  >
                    {item.value}
                  </td>
                </tr>
              ))}

              <tr>
                <td
                  colSpan="2"
                  style={{
                    height: "110px",
                    border: "1px solid #334863",
                    backgroundColor: "#152238",
                  }}
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DriverHistory;
