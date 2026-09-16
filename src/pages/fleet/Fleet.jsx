import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getFleets } from "../../services/fleet-service";

import PageHeader from "../../components/layout/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";
import PrimaryButton from "../../components/common/PrimaryButton";

function displayValue(value) {
  return value !== null &&
    value !== undefined &&
    value !== ""
    ? value
    : "N/A";
}

function Fleet() {
  const navigate = useNavigate();

  const [fleets, setFleets] = useState([]);

  useEffect(() => {
    async function loadFleets() {
      try {
        const data =
          await getFleets();

        const formattedFleets =
          data.map(
            (fleet) => ({
              // Internal UUID.
              // Keep this for navigation/database operations.
              id: fleet.id,

              fleetNo:
                displayValue(
                  fleet.fleet_name
                ),

              // Human-readable Fleet ID.
              fleetId:
                displayValue(
                  fleet.fleet_code
                ),

              status:
                displayValue(
                  fleet.status
                ),

              driver:
                displayValue(
                  fleet.driver?.name
                ),

              location:
                fleet.latitude !== null &&
                fleet.latitude !==
                  undefined &&
                fleet.longitude !== null &&
                fleet.longitude !==
                  undefined
                  ? `${fleet.latitude}, ${fleet.longitude}`
                  : "N/A",

              latitude:
                fleet.latitude,

              longitude:
                fleet.longitude,

              vehicleNumber:
                fleet.vehicle_number,

              driverId:
                fleet.driver_id,

              start:
                fleet.start,

              destination:
                fleet.destination,
            })
          );

        setFleets(
          formattedFleets
        );
      } catch (error) {
        console.error(
          "Failed to load fleets:",
          error
        );
      }
    }

    loadFleets();
  }, []);

  const columns = [
    {
      key: "fleetNo",
      label: "Fleet No",
    },
    {
      key: "fleetId",
      label: "Fleet ID",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "driver",
      label: "Driver",
    },
    {
      key: "location",
      label: "Location",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#14004D",
      }}
    >
      <PageHeader
        title="Active Fleets"
        showBackButton={true}
        backRoute="/dashboard"
        showAlertButton={true}
      />

      <div
        style={{
          padding: "35px 50px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <SearchBar
            placeholder="Search Fleet..."
          />

          <PrimaryButton
            text="ADD FLEET"
            onClick={() =>
              navigate(
                "/fleet-add"
              )
            }
          />
        </div>

        <div
          style={{
            marginTop: "35px",
          }}
        >
          <DataTable
            columns={columns}
            data={fleets}
            headerFontSize="26px"
            cellFontSize="21px"
            renderCell={(
              key,
              value,
              row
            ) => {
              if (
                key === "status"
              ) {
                return (
                  <StatusBadge
                    status={value}
                  />
                );
              }

              if (
                key === "location"
              ) {
                return (
                  <span
                    onClick={() =>
                      navigate(
                        "/fleet-live",
                        {
                          state:
                            row,
                        }
                      )
                    }
                    style={{
                      cursor:
                        "pointer",
                      color:
                        "white",
                      textDecoration:
                        "underline",
                      fontWeight:
                        "500",
                      fontSize:
                        "20px",
                    }}
                  >
                    View Location
                  </span>
                );
              }

              return value;
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Fleet;