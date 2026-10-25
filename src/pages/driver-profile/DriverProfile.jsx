
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getDriverProfile,
  deleteDriver,
} from "../../services/driver-service";

import PageHeader from "../../components/layout/PageHeader";
import PrimaryButton from "../../components/common/PrimaryButton";

function displayValue(value) {
  return value !== null &&
    value !== undefined &&
    value !== ""
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

  return date.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  );
}

function formatFatigueScore(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "N/A";
  }

  return `${value}%`;
}

function DriverProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {
    async function loadDriverProfile() {
      if (!state?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data =
          await getDriverProfile(
            state.id
          );

        setDriver({
          id: data.driver.id,
          name: data.driver.name,
          driverId:
            data.driver.employee_id,
          age: data.driver.age,
          contact:
            data.driver.contact,
          fleetNo:
            data.fleet?.fleet_name,
          lastActive:
            data.latestMetric
              ?.created_at,
          fatigueScore:
            data.latestMetric
              ?.fatigue_score,
        });
      } catch (error) {
        console.error(
          "Failed to load driver profile:",
          error
        );

        setDriver(null);
      } finally {
        setLoading(false);
      }
    }

    loadDriverProfile();
  }, [state]);

  async function handleDeleteDriver() {
    if (!driver?.id) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${driver.name}? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await deleteDriver(
        driver.id
      );

      /*
       * A deleted driver must always go
       * directly back to Driver List.
       *
       * replace prevents the deleted profile
       * from remaining in browser history
       * as the immediate destination.
       */
      navigate(
        "/driver-list",
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Failed to delete driver:",
        error
      );

      alert(
        error.message ||
          "Failed to delete driver. Please try again."
      );

      setDeleting(false);
    }
  }

  function handleUpdateDriver() {
    if (!driver?.id) {
      return;
    }

    navigate(
      "/driver-update",
      {
        state: {
          id: driver.id,
          name: driver.name,
          age: driver.age,
          contact: driver.contact,
          driverId: driver.driverId,
        },
      }
    );
  }

  function handleViewHistory() {
    if (!driver?.id) {
      return;
    }

    navigate(
      "/driver-history",
      {
        state: {
          id: driver.id,
        },
      }
    );
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0B1220",
          color: "#F8FAFC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontFamily: "Inter, Arial, sans-serif",
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
          backgroundColor: "#0B1220",
          color: "#F8FAFC",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <PageHeader
          title="Drivers Profile"
          showBackButton={true}
          backRoute="/driver-list"
          showAlertButton={true}
          alertRoute="/alert"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "100px",
            fontSize: "24px",
            gap: "30px",
            paddingLeft: "20px",
            paddingRight: "20px",
            textAlign: "center",
          }}
        >
          <p>
            Driver information is not available.
          </p>

          <PrimaryButton
            text="BACK TO DRIVERS"
            onClick={() =>
              navigate(
                "/driver-list",
                {
                  replace: true,
                }
              )
            }
          />
        </div>
      </div>
    );
  }

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
        title="Drivers Profile"
        showBackButton={true}
        backRoute="/driver-list"
        showAlertButton={true}
        alertRoute="/alert"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "50px",
          gap: "60px",
          flexWrap: "wrap",
          boxSizing: "border-box",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            width: "35%",
            minWidth: "240px",
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
              border: "4px solid #38BDF8",
              backgroundColor: "#111B2E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F8FAFC",
              fontSize: "90px",
              boxShadow: "0 0 24px rgba(56, 189, 248, 0.12)",
              boxSizing: "border-box",
            }}
          >
            👤
          </div>

          {/* Fatigue Score */}
          <div
            style={{
              width: "220px",
              backgroundColor: "#111B2E",
              color: "#F8FAFC",
              border: "1px solid #334863",
              borderTop: "3px solid #FB7185",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.16)",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #334863",
                padding: "10px",
                textAlign: "center",
                fontWeight: "600",
                color: "#CBD5E1",
                fontSize: "15px",
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
                color: "#FB7185",
              }}
            >
              {formatFatigueScore(
                driver.fatigueScore
              )}
            </div>
          </div>

          {/* Last Active */}
          <div
            style={{
              width: "220px",
              backgroundColor: "#111B2E",
              color: "#F8FAFC",
              border: "1px solid #334863",
              borderTop: "3px solid #38BDF8",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.16)",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #334863",
                padding: "10px",
                textAlign: "center",
                fontWeight: "600",
                color: "#CBD5E1",
                fontSize: "15px",
              }}
            >
              Last Active
            </div>

            <div
              style={{
                padding: "30px",
                textAlign: "center",
                fontWeight: "600",
                color: "#F8FAFC",
              }}
            >
              {formatDateTime(
                driver.lastActive
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: 1,
            minWidth: "280px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {[
            {
              label: "Name",
              value:
                displayValue(
                  driver.name
                ),
            },
            {
              label: "Employee ID",
              value:
                displayValue(
                  driver.driverId
                ),
            },
            {
              label: "Age",
              value:
                displayValue(
                  driver.age
                ),
            },
            {
              label: "Contact",
              value:
                displayValue(
                  driver.contact
                ),
            },
            {
              label: "Fleet Assigned",
              value:
                displayValue(
                  driver.fleetNo
                ),
            },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "linear-gradient(145deg, #111B2E 0%, #152238 100%)",
                border: "1px solid #26364D",
                borderRadius: "12px",
                padding: "18px 24px",
                fontSize: "18px",
                fontWeight: "500",
                color: "#F8FAFC",
                boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)",
                overflowWrap: "anywhere",
              }}
            >
              <strong
                style={{
                  color: "#7DD3FC",
                  fontWeight: "600",
                }}
              >
                {item.label} -{" "}
              </strong>

              {item.value}
            </div>
          ))}

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              marginTop: "60px",
              flexWrap: "wrap",
            }}
          >
            <PrimaryButton
              text="VIEW HISTORY"
              width="240px"
              height="60px"
              onClick={
                handleViewHistory
              }
            />

            <PrimaryButton
              text="CONTACT DRIVER"
              width="240px"
              height="60px"
              onClick={() =>
                alert(
                  "Contact Driver"
                )
              }
            />

            <PrimaryButton
              text="UPDATE DRIVER"
              width="240px"
              height="60px"
              onClick={
                handleUpdateDriver
              }
            />
          </div>

          {/* Delete Button */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <PrimaryButton
              text={
                deleting
                  ? "DELETING..."
                  : "DELETE DRIVER"
              }
              width="240px"
              height="60px"
              onClick={
                handleDeleteDriver
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;
