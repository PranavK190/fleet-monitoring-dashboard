import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAlerts } from "../../services/alert-service";

import PageHeader from "../../components/layout/PageHeader";
import SearchBar from "../../components/common/SearchBar";
import DataTable from "../../components/common/DataTable";

function displayValue(value) {
  return value !== null &&
    value !== undefined &&
    value !== ""
    ? value
    : "N/A";
}

function AlertList() {
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    async function loadAlerts() {
      try {
        const data = await getAlerts();

        const formattedAlerts = data.map(
          (alert) => ({
            id: alert.id,

            driverName: displayValue(
              alert.driverName
            ),

            fleetNo: displayValue(
              alert.fleetNo
            ),

            status: displayValue(
              alert.status
            ),

            area: displayValue(
              alert.area
            ),

            driverId: alert.driverId,
            fleetId: alert.fleetId,
            eventType: alert.eventType,
            severity: alert.severity,
            resolved: alert.resolved,
            createdAt: alert.createdAt,
          })
        );

        setAlerts(formattedAlerts);
      } catch (error) {
        console.error(
          "Failed to load alerts:",
          error
        );
      }
    }

    loadAlerts();
  }, []);

  const columns = [
    {
      key: "driverName",
      label: "Driver Name",
    },
    {
      key: "fleetNo",
      label: "Fleet No",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "area",
      label: "Area",
    },
    {
      key: "action",
      label: "Action",
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
        title="Alert List"
        showBackButton={true}
        backRoute="/dashboard"
      />

      <div
        style={{
          padding: "35px 50px",
        }}
      >
        <div
          style={{
            width: "420px",
            marginBottom: "35px",
          }}
        >
          <SearchBar placeholder="Search" />
        </div>

        <DataTable
          columns={columns}
          data={alerts}
          headerFontSize="26px"
          cellFontSize="21px"
          renderCell={(key, value, row) => {
            if (key === "action") {
              return (
                <span
                  onClick={() =>
                    navigate("/alert", {
                      state: row,
                    })
                  }
                  style={{
                    cursor: "pointer",
                    color: "white",
                    textDecoration:
                      "underline",
                    fontWeight: "500",
                    fontSize: "21px",
                  }}
                >
                  View Action
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

export default AlertList;