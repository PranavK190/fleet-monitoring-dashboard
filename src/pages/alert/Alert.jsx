import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { resolveAlert } from "../../services/alert-service";

import PageHeader from "../../components/layout/PageHeader";
import PrimaryButton from "../../components/common/PrimaryButton";
import VideoPlaceholder from "../../components/common/VideoPlaceholder";

function displayValue(value) {
  return value !== null && value !== undefined && value !== ""
    ? value
    : "N/A";
}

function Alert() {
  const location = useLocation();
  const navigate = useNavigate();

  const alertData = location.state;

  const [resolved, setResolved] = useState(
    alertData?.resolved ?? false
  );

  const [loading, setLoading] = useState(false);

  async function handleResolve() {
    if (!alertData?.id) {
      alert("Alert ID is not available.");
      return;
    }

    try {
      setLoading(true);

      await resolveAlert(alertData.id);

      setResolved(true);

      alert("Alert Resolved");
    } catch (error) {
      console.error("Failed to resolve alert:", error);
      alert("Failed to resolve alert.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0B1220",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <PageHeader
        title="Alert"
        showBackButton={true}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "50px 80px",
          gap: "80px",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            flex: 1,
          }}
        >
          <h1
            style={{
              color: resolved ? "#2DD4BF" : "#FDA4AF",
              fontSize: "42px",
              marginBottom: "80px",
              lineHeight: "1.2",
              fontWeight: "700",
            }}
          >
            {resolved
              ? "ALERT RESOLVED"
              : displayValue(alertData?.status)}
            <br />
            {!resolved && "[TAKE QUICK ACTION]"}
          </h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "35px",
              width: "350px",
            }}
          >
            <PrimaryButton
              text={resolved ? "ALREADY RESOLVED" : "MARK AS RESOLVED"}
              backgroundColor="#2DD4BF"
              textColor="#0B1220"
              width="350px"
              height="65px"
              onClick={handleResolve}
            />

            <PrimaryButton
              text="ESCALATE"
              backgroundColor="#FBBF24"
              textColor="#0B1220"
              width="350px"
              height="65px"
              onClick={() => alert("Escalation functionality pending")}
            />

            <PrimaryButton
              text="CONTACT EMERGENCY TEAM"
              backgroundColor="#FB7185"
              textColor="#0B1220"
              width="350px"
              height="65px"
              onClick={() =>
                alert("Emergency team contact functionality pending")
              }
            />
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VideoPlaceholder
            width="420px"
            height="320px"
            text="VIDEO / IMAGE"
          />
        </div>
      </div>
    </div>
  );
}

export default Alert;