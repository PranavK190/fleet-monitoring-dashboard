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
  const [status, setStatus] = useState("Active");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [drivers, setDrivers] = useState([]);
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!fleet?.id) {
      setLoadingDrivers(false);
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

    setStatus(
      fleet.status ||
        "Active"
    );

    setLatitude(
      fleet.latitude !== null &&
        fleet.latitude !== undefined
        ? String(fleet.latitude)
        : ""
    );

    setLongitude(
      fleet.longitude !== null &&
        fleet.longitude !== undefined
        ? String(fleet.longitude)
        : ""
    );
  }, [fleet]);

  useEffect(() => {
    async function loadAvailableDrivers() {
      try {
        const availableDrivers =
          await getAvailableDrivers();

        setDrivers(availableDrivers);
      } catch (error) {
        console.error(
          "Failed to load available drivers:",
          error
        );

        setErrors({
          driver:
            "Failed to load available drivers.",
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

    if (!status) {
      newErrors.status =
        "Status is required.";
    }

    if (latitude.trim()) {
      const latitudeValue =
        Number(latitude);

      if (
        Number.isNaN(latitudeValue) ||
        latitudeValue < -90 ||
        latitudeValue > 90
      ) {
        newErrors.latitude =
          "Latitude must be between -90 and 90.";
      }
    }

    if (longitude.trim()) {
      const longitudeValue =
        Number(longitude);

      if (
        Number.isNaN(longitudeValue) ||
        longitudeValue < -180 ||
        longitudeValue > 180
      ) {
        newErrors.longitude =
          "Longitude must be between -180 and 180.";
      }
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

      await updateFleet(fleet.id, {
        fleet_name:
          fleetName.trim(),

        vehicle_number:
          vehicleNumber.trim(),

        driver_id:
          driverId,

        status:
          status,

        latitude:
          latitude.trim()
            ? Number(latitude)
            : null,

        longitude:
          longitude.trim()
            ? Number(longitude)
            : null,
      });

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
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#14004D",
        }}
      >
        <PageHeader
          title="Update Fleet"
          showBackButton={true}
          backRoute="/fleet"
          showAlertButton={true}
          alertRoute="/alert"
        />

        <div
          style={{
            color: "white",
            fontSize: "24px",
            textAlign: "center",
            paddingTop: "100px",
          }}
        >
          <p>
            Fleet information is not available.
          </p>

          <PrimaryButton
            text="BACK TO FLEETS"
            onClick={() =>
              navigate("/fleet", {
                replace: true,
              })
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#14004D",
      }}
    >
      <PageHeader
        title="Update Fleet"
        showBackButton={true}
        backRoute="/fleet-live"
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
                  : "Select a driver"}
              </option>

              {driverId &&
                !drivers.some(
                  (driver) =>
                    driver.id === driverId
                ) && (
                  <option
                    value={driverId}
                  >
                    Current Assigned Driver
                  </option>
                )}

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

          <div
            style={fieldContainerStyle}
          >
            <div style={labelStyle}>
              STATUS
            </div>

            <select
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value
                )
              }
              style={selectStyle}
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>

          {errors.status && (
            <p style={errorStyle}>
              {errors.status}
            </p>
          )}

          <InputField
            label="Latitude"
            placeholder="Optional"
            value={latitude}
            onChange={(event) =>
              setLatitude(
                event.target.value
              )
            }
          />

          {errors.latitude && (
            <p style={errorStyle}>
              {errors.latitude}
            </p>
          )}

          <InputField
            label="Longitude"
            placeholder="Optional"
            value={longitude}
            onChange={(event) =>
              setLongitude(
                event.target.value
              )
            }
          />

          {errors.longitude && (
            <p style={errorStyle}>
              {errors.longitude}
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
            />

            <PrimaryButton
              text="CANCEL"
              backgroundColor="#555555"
              onClick={handleCancel}
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

export default UpdateFleet;