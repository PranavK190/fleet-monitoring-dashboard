import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { getFleetLiveLocation } from "../../services/fleet-service";

import PageHeader from "../../components/layout/PageHeader";
import VideoPlaceholder from "../../components/common/VideoPlaceholder";

function displayValue(value) {
  return value !== null && value !== undefined && value !== ""
    ? value
    : "N/A";
}

function FleetLiveLocation() {
  const { state } = useLocation();

  const [fleetData, setFleetData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      ) : (
        <div
          style={{
            padding: "35px 55px",
          }}
        >
          {/* Video Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "55px",
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
                label="Driver ID"
                value={displayValue(driver?.employee_id)}
              />

              <InfoField
                label="Driver Name"
                value={displayValue(driver?.name)}
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
                value={displayValue(fleet?.status)}
              />
            </div>
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