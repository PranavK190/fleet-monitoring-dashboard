import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDrivers } from "../../services/driver-service";

import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/common/DataTable";
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

function DriverList() {
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);

  const [searchType, setSearchType] = useState("name");
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    async function loadDrivers() {
      try {
        const data = await getDrivers();

        const formattedDrivers = data.map((driver) => ({
          id: driver.id,
          name: displayValue(driver.name),
          driverId: displayValue(driver.employee_id),

          fleetNo:
            driver.fleet_id !== null &&
            driver.fleet_id !== undefined &&
            driver.fleet_id !== ""
              ? driver.fleet_id
              : "Not Assigned",

          fleetId: driver.fleet_id,

          lastActive: formatDateTime(
            driver.created_at
          ),

          profile: "View Profile",
        }));

        setDrivers(formattedDrivers);
      } catch (error) {
        console.error(
          "Failed to load drivers:",
          error
        );
      }
    }

    loadDrivers();
  }, []);

  const filteredDrivers = drivers.filter(
    (driver) => {
      /*
       * Search filter
       */
      const searchValue =
        searchType === "name"
          ? driver.name
          : driver.driverId;

      const matchesSearch =
        searchValue
          .toString()
          .toLowerCase()
          .includes(
            searchText
              .trim()
              .toLowerCase()
          );

      if (!matchesSearch) {
        return false;
      }

      /*
       * Active / Inactive filter
       *
       * A driver is considered ACTIVE when
       * fleet_id is populated.
       *
       * A driver is considered INACTIVE when
       * fleet_id is null or empty.
       */
      const hasFleet =
        driver.fleetId !== null &&
        driver.fleetId !== undefined &&
        driver.fleetId !== "";

      if (
        filter === "active" &&
        !hasFleet
      ) {
        return false;
      }

      if (
        filter === "inactive" &&
        hasFleet
      ) {
        return false;
      }

      return true;
    }
  );

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

      {/* Controls */}
      <div
        style={{
          padding: "25px 50px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "25px",
        }}
      >
        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flex: 1,
            maxWidth: "700px",
          }}
        >
          <select
            value={searchType}
            onChange={(event) =>
              setSearchType(
                event.target.value
              )
            }
            style={{
              height: "50px",
              padding: "0 15px",
              backgroundColor: "#76AFF1",
              border: "none",
              borderRadius: "5px",
              outline: "none",
              fontSize: "18px",
              color: "#111111",
              cursor: "pointer",
            }}
          >
            <option value="name">
              Name
            </option>

            <option value="driverId">
              Employee ID
            </option>
          </select>

          <input
            type="text"
            value={searchText}
            onChange={(event) =>
              setSearchText(
                event.target.value
              )
            }
            placeholder={
              searchType === "name"
                ? "Search by name..."
                : "Search by employee ID..."
            }
            style={{
              flex: 1,
              height: "50px",
              padding: "0 18px",
              backgroundColor: "#76AFF1",
              border: "none",
              borderRadius: "5px",
              outline: "none",
              fontSize: "18px",
              color: "#111111",
            }}
          />
        </div>

        {/* Filter + Add Driver */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "18px",
                fontWeight: "500",
              }}
            >
              Filter:
            </span>

            <select
              value={filter}
              onChange={(event) =>
                setFilter(
                  event.target.value
                )
              }
              style={{
                height: "50px",
                padding: "0 15px",
                backgroundColor: "#76AFF1",
                border: "none",
                borderRadius: "5px",
                outline: "none",
                fontSize: "18px",
                color: "#111111",
                cursor: "pointer",
              }}
            >
              <option value="all">
                All Drivers
              </option>

              <option value="active">
                Active Drivers
              </option>

              <option value="inactive">
                Inactive Drivers
              </option>
            </select>
          </div>

          <PrimaryButton
            text="ADD DRIVER"
            width="180px"
            height="50px"
            onClick={() =>
              navigate("/driver-add")
            }
          />
        </div>
      </div>

      {/* Driver Table */}
      <div
        style={{
          padding: "35px 50px",
        }}
      >
        <DataTable
          columns={columns}
          data={filteredDrivers}
          renderCell={(key, value, row) => {
            if (key === "profile") {
              return (
                <span
                  onClick={() =>
                    navigate(
                      "/driver-profile",
                      {
                        state: row,
                      }
                    )
                  }
                  style={{
                    cursor: "pointer",
                    color: "white",
                    textDecoration:
                      "underline",
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