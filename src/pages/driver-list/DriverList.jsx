
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getDrivers } from "../../services/driver-service";

import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/common/DataTable";
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

  const [searchType, setSearchType] =
    useState("name");

  const [searchText, setSearchText] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {
    async function loadDrivers() {
      try {
        const data =
          await getDrivers();

        const formattedDrivers =
          data.map((driver) => ({
            id: driver.id,

            name: displayValue(
              driver.name
            ),

            driverId: displayValue(
              driver.employee_id
            ),

            fleetNo:
              driver.fleet?.fleet_code ||
              "Not Assigned",

            fleetId:
              driver.fleet_id,

            lastActive:
              formatDateTime(
                driver.created_at
              ),

            profile:
              "View Profile",
          }));

        setDrivers(
          formattedDrivers
        );
      } catch (error) {
        console.error(
          "Failed to load drivers:",
          error
        );
      }
    }

    loadDrivers();
  }, []);

  const filteredDrivers =
    drivers.filter(
      (driver) => {
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
    {
      key: "name",
      label: "Name",
    },
    {
      key: "driverId",
      label: "Driver ID",
    },
    {
      key: "fleetNo",
      label: "Fleet ID",
    },
    {
      key: "lastActive",
      label: "Last Active",
    },
    {
      key: "profile",
      label: "Profile",
    },
  ];

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
        title="Drivers List"
        showBackButton={true}
        showAlertButton={true}
      />

      {/* Controls */}
      <div
        style={{
          padding: "22px clamp(20px, 3vw, 42px) 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "22px",
          flexWrap: "wrap",
          boxSizing: "border-box",
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
            minWidth: 0,
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
              height: "46px",
              padding: "0 14px",
              backgroundColor: "#1A2940",
              border: "1px solid #3B506B",
              borderRadius: "9px",
              outline: "none",
              fontSize: "16px",
              color: "#F8FAFC",
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
              minWidth: 0,
              height: "46px",
              boxSizing: "border-box",
              padding: "0 16px",
              backgroundColor: "#1A2940",
              border: "1px solid #3B506B",
              borderRadius: "9px",
              outline: "none",
              fontSize: "16px",
              color: "#F8FAFC",
            }}
          />
        </div>

        {/* Filter + Add Driver */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                color: "#CBD5E1",
                fontSize: "16px",
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
                height: "46px",
                padding: "0 14px",
                backgroundColor: "#1A2940",
                border: "1px solid #3B506B",
                borderRadius: "9px",
                outline: "none",
                fontSize: "16px",
                color: "#F8FAFC",
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
            width="170px"
            height="48px"
            onClick={() =>
              navigate(
                "/driver-add"
              )
            }
          />
        </div>
      </div>

      {/* Driver Table */}
      <div
        style={{
          padding: "28px clamp(20px, 3vw, 42px)",
          boxSizing: "border-box",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            minWidth: "650px",
            backgroundColor: "#111B2E",
            border: "1px solid #26364D",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          <DataTable
            columns={columns}
            data={filteredDrivers}
            headerFontSize="26px"
            cellFontSize="21px"
            renderCell={(
              key,
              value,
              row
            ) => {
              if (
                key === "profile"
              ) {
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
                      color: "#7DD3FC",
                      textDecoration: "underline",
                      textUnderlineOffset: "4px",
                      fontWeight: "500",
                      fontSize: "20px",
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
    </div>
  );
}

export default DriverList;