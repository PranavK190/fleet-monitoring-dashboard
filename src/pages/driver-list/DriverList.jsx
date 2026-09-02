import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDrivers } from "../../services/driver-service";

import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/common/DataTable";

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

function DriverList() {
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    async function loadDrivers() {
      try {
        const data = await getDrivers();

        const formattedDrivers = data.map((driver) => ({
  id: driver.id,
  name: driver.name,
  driverId: displayValue(driver.employee_id),
  fleetNo: displayValue(driver.fleet_id),
  lastActive: formatDateTime(driver.created_at),
  profile: "View Profile",
}));

        setDrivers(formattedDrivers);
      } catch (error) {
        console.error("Failed to load drivers:", error);
      }
    }

    loadDrivers();
  }, []);

  const columns = [
    { key: "name", label: "Name" },
    { key: "driverId", label: "Driver ID" },
    { key: "fleetNo", label: "Fleet No" },
    { key: "lastActive", label: "Last Active" },
    { key: "profile", label: "Profile" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#14004D",
      }}
    >
      <PageHeader
        title="Drivers List"
        showBackButton={true}
        showAlertButton={true}
      />

      <div
        style={{
          padding: "35px 50px",
        }}
      >
        <DataTable
          columns={columns}
          data={drivers}
          renderCell={(key, value, row) => {
            if (key === "profile") {
              return (
                <span
                  onClick={() =>
                    navigate("/driver-profile", {
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
                  View Profile
                </span>
              );
            }

            return value;
          }}
        />
      </div>
    </div>
  );
}

export default DriverList;