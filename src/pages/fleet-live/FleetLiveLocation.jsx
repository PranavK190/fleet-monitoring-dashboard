import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getFleetLiveLocation,
  deleteFleet,
} from "../../services/fleet-service";

import PageHeader from "../../components/layout/PageHeader";
import PrimaryButton from "../../components/common/PrimaryButton";

function displayValue(value) {
  return value !== null &&
    value !== undefined &&
    value !== ""
    ? value
    : "N/A";
}

function FleetLiveLocation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [fleetData, setFleetData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [deleting, setDeleting] =
    useState(false);

  /*
   * Load fleet information.
   */
  useEffect(() => {
    async function loadFleetLocation() {
      const fleetId =
        state?.id ||
        state?.fleetId;

      if (!fleetId) {
        setLoading(false);
        return;
      }

      try {
        const data =
          await getFleetLiveLocation(
            fleetId
          );

        setFleetData(data);
      } catch (error) {
        console.error(
          "Failed to load fleet live location:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadFleetLocation();
  }, [state]);

  const fleet = fleetData?.fleet;
  const driver = fleetData?.driver;

  const location =
    fleet?.latitude !== null &&
    fleet?.latitude !== undefined &&
    fleet?.longitude !== null &&
    fleet?.longitude !== undefined
      ? `${fleet.latitude}, ${fleet.longitude}`
      : "GPS Not Found";

  function handleUpdateFleet() {
    if (!fleet?.id) {
      return;
    }

    navigate(
      "/fleet-update",
      {
        state: {
          id: fleet.id,
          fleet_name:
            fleet.fleet_name,
          vehicle_number:
            fleet.vehicle_number,
          driver_id:
            fleet.driver_id,
          status:
            fleet.status,
          latitude:
            fleet.latitude,
          longitude:
            fleet.longitude,
          start:
            fleet.start,
          destination:
            fleet.destination,
          fleet_code:
            fleet.fleet_code,
        },
      }
    );
  }

  async function handleDeleteFleet() {
    if (!fleet?.id) {
      return;
    }

    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${displayValue(
          fleet.fleet_name
        )}? This action cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await deleteFleet(
        fleet.id
      );

      navigate(
        "/fleet",
        {
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Failed to delete fleet:",
        error
      );

      alert(
        error.message ||
          "Failed to delete fleet. Please try again."
      );

      setDeleting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0B1220",
      }}
    >
      <PageHeader
        title="Fleet Live Location"
        showBackButton={true}
        backRoute="/fleet"
        showAlertButton={true}
        alertRoute="/alert"
      />

      {loading ? (
        <div
          style={{
            color: "#F8FAFC",
            fontSize: "24px",
            textAlign: "center",
            paddingTop: "100px",
          }}
        >
          Loading fleet information...
        </div>
      ) : !fleetData ? (
        <div
          style={{
            color: "#F8FAFC",
            fontSize: "24px",
            textAlign: "center",
            paddingTop: "100px",
          }}
        >
          Fleet information not available.
        </div>
      ) : (
        <div
          style={{
            padding: "35px 55px 60px",
          }}
        >
          {/* Live Video */}
          <div
            style={{
              width: "100%",
              maxWidth: "1050px",
              height: "400px",
              margin: "0 auto 45px",
              backgroundColor: "#111B2E",
              border: "1px solid #26364D",
              borderRadius: "6px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Video Title */}
            <div
              style={{
                height: "55px",
                backgroundColor: "#38BDF8",
                color: "#0B1220",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: "600",
              }}
            >
              LIVE VIDEO
            </div>

            {/* Video Area */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#111B2E",
              }}
            >
              <span
                style={{
                  color: "#CBD5E1",
                  fontSize: "22px",
                }}
              >
                Live stream not started
              </span>
            </div>
          </div>

          {/* Information */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Left */}
            <div
              style={{
                width: "38%",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <InfoField
                label="Fleet ID"
                value={displayValue(
                  fleet?.fleet_code ||
                    fleet?.id
                )}
              />

              <InfoField
                label="Fleet Name"
                value={displayValue(
                  fleet?.fleet_name
                )}
              />

              <InfoField
                label="Vehicle Number"
                value={displayValue(
                  fleet?.vehicle_number
                )}
              />

              <InfoField
                label="Driver ID"
                value={displayValue(
                  driver?.employee_id
                )}
              />

              <InfoField
                label="Driver Name"
                value={displayValue(
                  driver?.name
                )}
              />
            </div>

            {/* Right */}
            <div
              style={{
                width: "38%",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <InfoField
                label="Start"
                value={displayValue(
                  fleet?.start
                )}
              />

              <InfoField
                label="Destination"
                value={displayValue(
                  fleet?.destination
                )}
              />

              <InfoField
                label="Location"
                value={location}
              />

              <InfoField
                label="Status"
                value="Active"
              />
            </div>
          </div>

          {/* Fleet Actions */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
              marginTop: "45px",
            }}
          >
            <PrimaryButton
              text="UPDATE FLEET"
              onClick={
                handleUpdateFleet
              }
            />

            <PrimaryButton
              text={
                deleting
                  ? "DELETING..."
                  : "DELETE FLEET"
              }
              backgroundColor="#FB7185"
              onClick={
                handleDeleteFleet
              }
              disabled={deleting}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function InfoField({
  label,
  value,
}) {
  return (
    <div
      style={{
        backgroundColor: "#1A2940",
        border: "1px solid #334863",
        borderRadius: "8px",
        padding: "15px 20px",
        fontSize: "22px",
        color: "#F8FAFC",
      }}
    >
      <strong
        style={{
          color: "#7DD3FC",
        }}
      >
        {label}
      </strong>

      {` : ${value}`}
    </div>
  );
}

export default FleetLiveLocation;