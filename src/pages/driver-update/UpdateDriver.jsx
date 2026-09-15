import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PageHeader from "../../components/layout/PageHeader";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";

import { updateDriver } from "../../services/driver-service";

function UpdateDriver() {
  const navigate = useNavigate();
  const location = useLocation();

  const driver = location.state;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!driver?.id) {
      return;
    }

    setName(driver.name || "");

    setAge(
      driver.age !== null &&
        driver.age !== undefined
        ? String(driver.age)
        : ""
    );

    setContact(driver.contact || "");

    setEmployeeId(
      driver.employee_id ||
        driver.driverId ||
        ""
    );
  }, [driver]);

  function validateForm() {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name =
        "Name is required.";
    } else if (
      !/^[A-Za-z\s]+$/.test(
        name.trim()
      )
    ) {
      newErrors.name =
        "Name can contain only letters and spaces.";
    }

    // Age validation
    if (!age.trim()) {
      newErrors.age =
        "Age is required.";
    } else if (
      !/^\d+$/.test(age.trim())
    ) {
      newErrors.age =
        "Age must contain only numbers.";
    } else if (
      Number(age) < 18 ||
      Number(age) > 70
    ) {
      newErrors.age =
        "Age must be between 18 and 70.";
    }

    // Contact validation
    if (!contact.trim()) {
      newErrors.contact =
        "Contact number is required.";
    } else if (
      !/^\d{10}$/.test(
        contact.trim()
      )
    ) {
      newErrors.contact =
        "Contact number must contain exactly 10 digits.";
    }

    // Employee ID validation
    if (!employeeId.trim()) {
      newErrors.employeeId =
        "Employee ID is required.";
    } else if (
      !/^[A-Za-z0-9]+$/.test(
        employeeId.trim()
      )
    ) {
      newErrors.employeeId =
        "Employee ID can contain only letters and numbers.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  }

  async function handleUpdateDriver() {
    if (!driver?.id) {
      setErrors({
        submit:
          "Driver information is missing. Please return to the Driver List.",
      });

      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await updateDriver(
        driver.id,
        {
          name: name.trim(),
          age: Number(age),
          contact: contact.trim(),
          employee_id:
            employeeId.trim(),
        }
      );

      /*
       * Return to the same driver's profile.
       *
       * Only the driver's ID is passed.
       * DriverProfile will fetch the updated
       * information from Supabase.
       */
      navigate(
        "/driver-profile",
        {
          state: {
            id: driver.id,
          },
          replace: true,
        }
      );
    } catch (error) {
      console.error(
        "Failed to update driver:",
        error
      );

      setErrors({
        submit:
          error.message ||
          "Failed to update driver. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    if (!driver?.id) {
      navigate("/driver-list");
      return;
    }

    navigate(
      "/driver-profile",
      {
        state: {
          id: driver.id,
        },
      }
    );
  }

  if (!driver?.id) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#14004D",
        }}
      >
        <PageHeader
          title="Update Driver"
          showBackButton={true}
          backRoute="/driver-list"
          showAlertButton={true}
          alertRoute="/alert"
        />

        <div
          style={{
            color: "white",
            textAlign: "center",
            paddingTop: "100px",
            fontSize: "24px",
          }}
        >
          <p>
            Driver information is not available.
          </p>

          <PrimaryButton
            text="BACK TO DRIVERS"
            onClick={() =>
              navigate(
                "/driver-list",
                {
                  replace: true,
                }
              )
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
        title="Update Driver"
        showBackButton={true}
        backRoute="/driver-profile"
        showAlertButton={true}
        alertRoute="/alert"
      />

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "60px 50px",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        {/* Name */}
        <div>
          <InputField
            label="NAME"
            placeholder="Enter driver name"
            value={name}
            onChange={(event) =>
              setName(
                event.target.value
              )
            }
          />

          {errors.name && (
            <p
              style={{
                color: "#ff6b6b",
                marginTop: "6px",
              }}
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <InputField
            label="AGE"
            placeholder="Enter driver age"
            value={age}
            onChange={(event) =>
              setAge(
                event.target.value
              )
            }
          />

          {errors.age && (
            <p
              style={{
                color: "#ff6b6b",
                marginTop: "6px",
              }}
            >
              {errors.age}
            </p>
          )}
        </div>

        {/* Contact */}
        <div>
          <InputField
            label="CONTACT"
            placeholder="Enter 10-digit contact number"
            value={contact}
            onChange={(event) =>
              setContact(
                event.target.value
              )
            }
          />

          {errors.contact && (
            <p
              style={{
                color: "#ff6b6b",
                marginTop: "6px",
              }}
            >
              {errors.contact}
            </p>
          )}
        </div>

        {/* Employee ID */}
        <div>
          <InputField
            label="EMPLOYEE ID"
            placeholder="Enter employee ID"
            value={employeeId}
            onChange={(event) =>
              setEmployeeId(
                event.target.value
              )
            }
          />

          {errors.employeeId && (
            <p
              style={{
                color: "#ff6b6b",
                marginTop: "6px",
              }}
            >
              {errors.employeeId}
            </p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <p
            style={{
              color: "#ff6b6b",
              textAlign: "center",
            }}
          >
            {errors.submit}
          </p>
        )}

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "30px",
            marginTop: "20px",
          }}
        >
          <PrimaryButton
            text="CANCEL"
            width="180px"
            height="55px"
            onClick={
              handleCancel
            }
          />

          <PrimaryButton
            text={
              loading
                ? "UPDATING..."
                : "UPDATE DRIVER"
            }
            width="200px"
            height="55px"
            onClick={
              handleUpdateDriver
            }
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateDriver;