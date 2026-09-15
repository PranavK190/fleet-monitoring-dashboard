import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  getFleetLiveLocation,
  deleteFleet,
} from "../../services/fleet-service";

import PageHeader from "../../components/layout/PageHeader";
import VideoPlaceholder from "../../components/common/VideoPlaceholder";
import PrimaryButton from "../../components/common/PrimaryButton";

function displayValue(value) {
  return value !== null && value !== undefined && value !== ""
    ? value
    : "N/A";
}

function FleetLiveLocation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [fleetData, setFleetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function loadFleetLocation() {
      const fleetId = state?.id || state?.fleetId;

      if (!fleetId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getFleetLiveLocation(fleetId);

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
      : "N/A";

  function handleUpdateFleet() {
    if (!fleet?.id) return;

    navigate("/fleet-update", {
      state: {
        id: fleet.id,
        fleet_name: fleet.fleet_name,
        vehicle_number: fleet.vehicle_number,
        driver_id: fleet.driver_id,
        status: fleet.status,
        latitude: fleet.latitude,
        longitude: fleet.longitude,
      },
    });
  }

  async function handleDeleteFleet() {
    if (!fleet?.id) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${displayValue(
        fleet.fleet_name
      )}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteFleet(fleet.id);

      navigate("/fleet", {
        replace: true,
      });
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
        backgroundColor: "#14004D",
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
            color: "white",
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
            color: "white",
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
          {/* Video Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "45px",
            }}
          >
            <VideoPlaceholder
              width="520px"
              height="330px"
            />

            <VideoPlaceholder
              width="520px"
              height="330px"
            />
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
                value={displayValue(fleet?.id)}
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
                label="Location"
                value={location}
              />

              <InfoField
                label="Status"
                value={displayValue(
                  fleet?.status
                )}
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
              onClick={handleUpdateFleet}
            />

            <PrimaryButton
              text={
                deleting
                  ? "DELETING..."
                  : "DELETE FLEET"
              }
              backgroundColor="#DC2626"
              onClick={handleDeleteFleet}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function InfoField({ label, value }) {
  return (
    <div
      style={{
        backgroundColor: "#D8E5F7",
        borderRadius: "8px",
        padding: "15px 20px",
        fontSize: "22px",
        color: "#111",
      }}
    >
      <strong>{label}</strong>

      {` : ${value}`}
    </div>
  );
}

export default FleetLiveLocation;