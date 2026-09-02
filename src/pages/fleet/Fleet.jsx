import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getFleets } from "../../services/fleet-service";

import PageHeader from "../../components/layout/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/StatusBadge";

function displayValue(value) {
  return value !== null && value !== undefined && value !== ""
    ? value
    : "N/A";
}

function Fleet() {
  const navigate = useNavigate();

  const [fleets, setFleets] = useState([]);

  useEffect(() => {
    async function loadFleets() {
      try {
        const data = await getFleets();

        const formattedFleets = data.map((fleet) => ({
  fleetNo: displayValue(fleet.fleet_name),
  fleetId: displayValue(fleet.id),
  status: displayValue(fleet.status),
  driver: displayValue(fleet.driver?.name),

          latitude: fleet.latitude,
          longitude: fleet.longitude,
          vehicleNumber: fleet.vehicle_number,
          driverId: fleet.driver_id,
        }));

        setFleets(formattedFleets);
      } catch (error) {
        console.error("Failed to load fleets:", error);
      }
    }

    loadFleets();
  }, []);

  const columns = [
    { key: "fleetNo", label: "Fleet No" },
    { key: "fleetId", label: "Fleet ID" },
    { key: "status", label: "Status" },
    { key: "driver", label: "Driver" },
    { key: "location", label: "Location" },
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
        showAlertButton={true}
      />

      <div
        style={{
          padding: "35px 50px",
        }}
      >
        <SearchBar placeholder="Search Fleet..." />

        <div
          style={{
            marginTop: "35px",
          }}
        >
          <DataTable
            columns={columns}
            data={fleets}
            renderCell={(key, value, row) => {
              if (key === "status") {
                return <StatusBadge status={value} />;
              }

              if (key === "location") {
                return (
                  <span
                    onClick={() =>
                      navigate("/fleet-live", {
                        state: row,
                      })
                    }
                    style={{
                      cursor: "pointer",
                      color: "white",
                      textDecoration: "underline",
                      fontWeight: "500",
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