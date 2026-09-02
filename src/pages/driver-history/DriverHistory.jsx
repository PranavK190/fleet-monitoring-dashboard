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
        : 20 +
          (index * 450) / (chartMetrics.length - 1);

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
        backgroundColor: "#14004D",
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
          gap: "60px",
          padding: "50px",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flex: 1.4,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "4px",
              height: "420px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2
              style={{
                marginBottom: "30px",
                color: "#222",
              }}
            >
              Driver Safety Score History
            </h2>

            {loading ? (
              <p
                style={{
                  color: "#222",
                  fontSize: "18px",
                }}
              >
                Loading history...
              </p>
            ) : chartPoints.length === 0 ? (
              <p
                style={{
                  color: "#222",
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
                  borderLeft: "2px solid #444",
                  borderBottom: "2px solid #444",
                  position: "relative",
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 500 250"
                >
                  <polyline
                    fill="none"
                    stroke="#2456ff"
                    strokeWidth="3"
                    points={polylinePoints}
                  />

                  {chartPoints.map((point, index) => (
                    <circle
                      key={index}
                      cx={point.x}
                      cy={point.y}
                      r="5"
                      fill="#2456ff"
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
            width: "440px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#94BDF3",
              fontSize: "22px",
            }}
          >
            <tbody>
              {stats.map((item) => (
                <tr key={item.label}>
                  <td
                    style={{
                      border: "1px solid #555",
                      padding: "28px 20px",
                      width: "70%",
                    }}
                  >
                    {item.label}
                  </td>

                  <td
                    style={{
                      border: "1px solid #555",
                      textAlign: "center",
                      fontWeight: "600",
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
                    border: "1px solid #555",
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