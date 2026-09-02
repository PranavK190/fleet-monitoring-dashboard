import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { getDriverProfile } from "../../services/driver-service";

import PageHeader from "../../components/layout/PageHeader";
import PrimaryButton from "../../components/common/PrimaryButton";

function displayValue(value) {
  return value !== null && value !== undefined && value !== ""
    ? value
    : "N/A";
}

function formatDateTime(value) {
  if (!value) {
    return "N/A";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "N/A";
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function formatFatigueScore(value) {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }

  return `${value}%`;
}

function DriverProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDriverProfile() {
      if (!state?.id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getDriverProfile(state.id);

        setDriver({
          id: data.driver.id,
          name: data.driver.name,
          driverId: data.driver.employee_id,
          age: data.driver.age,
          contact: data.driver.contact,
          fleetNo: data.fleet?.fleet_name,
          lastActive: data.latestMetric?.created_at,
          fatigueScore: data.latestMetric?.fatigue_score,
        });
      } catch (error) {
        console.error("Failed to load driver profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDriverProfile();
  }, [state]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#14004D",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
        }}
      >
        Loading driver profile...
      </div>
    );
  }

  if (!driver) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#14004D",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
        }}
      >
        Driver information not available.
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#14004D",
      }}
    >
      <PageHeader
        title="Drivers Profile"
        showBackButton={true}
        showAlertButton={true}
        alertRoute="/alert"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "50px",
          gap: "60px",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            width: "35%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              border: "12px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "90px",
            }}
          >
            👤
          </div>

          {/* Fatigue Score */}
          <div
            style={{
              width: "220px",
              backgroundColor: "#8DB7F0",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #555",
                padding: "10px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Latest Fatigue Score
            </div>

            <div
              style={{
                padding: "30px",
                textAlign: "center",
                fontSize: "28px",
                fontWeight: "700",
              }}
            >
              {formatFatigueScore(driver.fatigueScore)}
            </div>
          </div>

          {/* Last Active */}
          <div
            style={{
              width: "220px",
              backgroundColor: "#8DB7F0",
              borderRadius: "6px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #555",
                padding: "10px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              Last Active
            </div>

            <div
              style={{
                padding: "30px",
                textAlign: "center",
                fontWeight: "600",
              }}
            >
              {formatDateTime(driver.lastActive)}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {[
            {
              label: "Name",
              value: displayValue(driver.name),
            },
            {
              label: "Employee ID",
              value: displayValue(driver.driverId),
            },
            {
              label: "Age",
              value: displayValue(driver.age),
            },
            {
              label: "Contact",
              value: displayValue(driver.contact),
            },
            {
              label: "Fleet Assigned",
              value: displayValue(driver.fleetNo),
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                backgroundColor: "#8DB7F0",
                padding: "18px 24px",
                borderRadius: "18px",
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              <strong>{item.label} - </strong>
              {item.value}
            </div>
          ))}

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "60px",
            }}
          >
            <PrimaryButton
              text="VIEW HISTORY"
              width="240px"
              height="60px"
              onClick={() =>
                navigate("/driver-history", {
                  state: driver,
                })
              }
            />

            <PrimaryButton
              text="CONTACT DRIVER"
              width="240px"
              height="60px"
              onClick={() => alert("Contact Driver")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;