import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/layout/PageHeader";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";

import {
  getAvailableDrivers,
  createFleet,
} from "../../services/fleet-service";

function AddFleet() {
  const navigate = useNavigate();

  const [fleetName, setFleetName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [driverId, setDriverId] = useState("");
  const [start, setStart] = useState("");
  const [destination, setDestination] = useState("");

  const [drivers, setDrivers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadAvailableDrivers() {
      try {
        const data = await getAvailableDrivers();

        setDrivers(data);
      } catch (error) {
        console.error(
          "Failed to load available drivers:",
          error
        );

        setErrors({
          driver: "Failed to load available drivers.",
        });
      } finally {
        setLoadingDrivers(false);
      }
    }

    loadAvailableDrivers();
  }, []);

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

  async function handleAddFleet() {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await createFleet({
        fleet_name: fleetName.trim(),
        vehicle_number: vehicleNumber.trim(),
        driver_id: driverId,
        start: start.trim(),
        destination: destination.trim(),
      });

      navigate("/fleet", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Failed to add fleet:",
        error
      );

      setErrors({
        submit:
          error.message ||
          "Failed to add fleet. Please try again.",
      });
    } finally {
      setLoading(false);
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
        title="Add Fleet"
        showBackButton={true}
        backRoute="/fleet"
        showAlertButton={true}
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
                  : "Select an unassigned driver"}
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

          <InputField
            label="Start"
            placeholder="Enter starting location"
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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <PrimaryButton
              text={
                loading
                  ? "ADDING..."
                  : "ADD FLEET"
              }
              onClick={
                handleAddFleet
              }
              disabled={loading}
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
  backgroundColor: "#76AFF1",
  borderRadius: "2px",
  overflow: "hidden",
};

const labelStyle = {
  width: "230px",
  display: "flex",
  alignItems: "center",
  paddingLeft: "16px",
  borderRight:
    "1px solid rgba(0,0,0,0.35)",
  fontSize: "22px",
  fontWeight: "500",
  color: "#111111",
  textTransform: "uppercase",
};

const selectStyle = {
  flex: 1,
  border: "none",
  outline: "none",
  backgroundColor: "#76AFF1",
  padding: "0 16px",
  fontSize: "20px",
  color: "#111111",
};

const errorStyle = {
  margin: "-15px 0 0 10px",
  color: "#FF6B6B",
  fontSize: "16px",
};

export default AddFleet;