import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PageHeader from "../../components/layout/PageHeader";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";

import {
  getAvailableDrivers,
  updateFleet,
} from "../../services/fleet-service";

function UpdateFleet() {
  const location = useLocation();
  const navigate = useNavigate();

  const fleet = location.state;

  const [fleetName, setFleetName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverId, setDriverId] = useState("");
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");

  const [drivers, setDrivers] = useState([]);

  const [loadingDrivers, setLoadingDrivers] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  /*
   * Load fleet information into the form.
   */
  useEffect(() => {
    if (!fleet?.id) {
      navigate("/fleet", {
        replace: true,
      });

      return;
    }

    setFleetName(
      fleet.fleet_name ||
        fleet.fleetNo ||
        ""
    );

    setVehicleNumber(
      fleet.vehicle_number ||
        fleet.vehicleNumber ||
        ""
    );

    setDriverId(
      fleet.driver_id ||
        fleet.driverId ||
        ""
    );

    setStart(
      fleet.start || ""
    );

    setDestination(
      fleet.destination || ""
    );
  }, [fleet, navigate]);

  /*
   * Load:
   * 1. All unassigned drivers
   * 2. Current fleet's assigned driver
   *
   * Drivers assigned to other fleets
   * will not appear.
   */
  useEffect(() => {
    async function loadDrivers() {
      if (!fleet?.id) {
        return;
      }

      try {
        setLoadingDrivers(true);

        const data =
          await getAvailableDrivers(
            fleet.driver_id ||
              fleet.driverId ||
              null
          );

        setDrivers(data);
      } catch (error) {
        console.error(
          "Failed to load drivers:",
          error
        );

        setErrors({
          driver:
            "Failed to load drivers.",
        });
      } finally {
        setLoadingDrivers(false);
      }
    }

    loadDrivers();
  }, [fleet]);

  function validateForm() {
    const newErrors = {};

    if (!fleetName.trim()) {
      newErrors.fleetName =
        "Fleet name is required.";
    }

    if (!vehicleNumber.trim()) {
      newErrors.vehicleNumber =
        "Vehicle number is required.";
    }

    if (!driverId) {
      newErrors.driver =
        "Please select a driver.";
    }

    if (!start.trim()) {
      newErrors.start =
        "Start location is required.";
    }

    if (!destination.trim()) {
      newErrors.destination =
        "Destination is required.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  }

  async function handleUpdateFleet() {
    if (!fleet?.id) {
      setErrors({
        submit:
          "Fleet information is missing. Please return to the Fleet page and try again.",
      });

      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      setErrors({});

      await updateFleet(
        fleet.id,
        {
          fleet_name:
            fleetName.trim(),

          vehicle_number:
            vehicleNumber.trim(),

          driver_id:
            driverId,

          start:
            start.trim(),

          destination:
            destination.trim(),
        }
      );

      navigate(
        "/fleet-live",
        {
          state: {
            id: fleet.id,
          },
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Failed to update fleet:",
        error
      );

      setErrors({
        submit:
          error.message ||
          "Failed to update fleet. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (fleet?.id) {
      navigate(
        "/fleet-live",
        {
          state: {
            id: fleet.id,
          },
        }
      );
    } else {
      navigate("/fleet");
    }
  }

  if (!fleet?.id) {
    return null;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0B1220",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <PageHeader
        title="Update Fleet"
        showBackButton={true}
        backRoute="/fleet-live"
        backState={{
          id: fleet.id,
        }}
        showAlertButton={true}
        alertRoute="/alert"
      />

      <div
        style={{
          padding: "50px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            display: "flex",
            flexDirection: "column",
            gap: "25px",
          }}
        >
          {/* Fleet ID */}
          <div
            style={fieldContainerStyle}
          >
            <div style={labelStyle}>
              FLEET ID
            </div>

            <div
              style={readOnlyValueStyle}
            >
              {fleet.fleet_code ||
                fleet.fleetId ||
                "N/A"}
            </div>
          </div>

          {/* Fleet Name */}
          <InputField
            label="Fleet Name"
            placeholder="Enter fleet name"
            value={fleetName}
            onChange={(event) =>
              setFleetName(
                event.target.value
              )
            }
          />

          {errors.fleetName && (
            <p style={errorStyle}>
              {errors.fleetName}
            </p>
          )}

          {/* Vehicle Number */}
          <InputField
            label="Vehicle Number"
            placeholder="Enter vehicle number"
            value={vehicleNumber}
            onChange={(event) =>
              setVehicleNumber(
                event.target.value
              )
            }
          />

          {errors.vehicleNumber && (
            <p style={errorStyle}>
              {errors.vehicleNumber}
            </p>
          )}

          {/* Driver */}
          <div
            style={fieldContainerStyle}
          >
            <div style={labelStyle}>
              DRIVER
            </div>

            <select
              value={driverId}
              onChange={(event) =>
                setDriverId(
                  event.target.value
                )
              }
              disabled={loadingDrivers}
              style={selectStyle}
            >
              <option value="">
                {loadingDrivers
                  ? "Loading drivers..."
                  : "Select a driver"}
              </option>

              {drivers.map(
                (driver) => (
                  <option
                    key={driver.id}
                    value={driver.id}
                  >
                    {driver.name} (
                    {driver.employee_id ||
                      "No Employee ID"}
                    )
                  </option>
                )
              )}
            </select>
          </div>

          {errors.driver && (
            <p style={errorStyle}>
              {errors.driver}
            </p>
          )}

          {/* Start */}
          <InputField
            label="Start"
            placeholder="Enter start location"
            value={start}
            onChange={(event) =>
              setStart(
                event.target.value
              )
            }
          />

          {errors.start && (
            <p style={errorStyle}>
              {errors.start}
            </p>
          )}

          {/* Destination */}
          <InputField
            label="Destination"
            placeholder="Enter destination"
            value={destination}
            onChange={(event) =>
              setDestination(
                event.target.value
              )
            }
          />

          {errors.destination && (
            <p style={errorStyle}>
              {errors.destination}
            </p>
          )}

          {errors.submit && (
            <p style={errorStyle}>
              {errors.submit}
            </p>
          )}

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "25px",
              marginTop: "15px",
            }}
          >
            <PrimaryButton
              text={
                saving
                  ? "UPDATING..."
                  : "UPDATE FLEET"
              }
              onClick={
                handleUpdateFleet
              }
              disabled={saving}
            />

            <PrimaryButton
              text="CANCEL"
              backgroundColor="#334863"
              onClick={handleCancel}
              disabled={saving}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const fieldContainerStyle = {
  display: "flex",
  width: "100%",
  height: "56px",
  backgroundColor: "#111B2E",
  border: "1px solid #334863",
  borderRadius: "2px",
  overflow: "hidden",
  boxSizing: "border-box",
};

const labelStyle = {
  width: "230px",
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  paddingLeft: "16px",
  borderRight:
    "1px solid #334863",
  fontSize: "22px",
  fontWeight: "500",
  color: "#CBD5E1",
  textTransform: "uppercase",
  boxSizing: "border-box",
};

const selectStyle = {
  flex: 1,
  minWidth: 0,
  border: "none",
  outline: "none",
  backgroundColor: "#1A2940",
  padding: "0 16px",
  fontSize: "20px",
  color: "#F8FAFC",
  cursor: "pointer",
  boxSizing: "border-box",
};

const readOnlyValueStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  padding: "0 16px",
  fontSize: "20px",
  color: "#F8FAFC",
  backgroundColor: "#1A2940",
  boxSizing: "border-box",
};

const errorStyle = {
  margin: "-15px 0 0 10px",
  color: "#FDA4AF",
  fontSize: "16px",
};

export default UpdateFleet;