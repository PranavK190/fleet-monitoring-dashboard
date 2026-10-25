
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/layout/PageHeader";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";

import { createDriver } from "../../services/driver-service";

function AddDriver() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validateForm() {
    const newErrors = {};

    // Name
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(name.trim())) {
      newErrors.name =
        "Name can contain only letters and spaces.";
    }

    // Age
    if (!age.trim()) {
      newErrors.age = "Age is required.";
    } else if (!/^\d+$/.test(age.trim())) {
      newErrors.age =
        "Age must contain only numbers.";
    } else if (
      Number(age) < 18 ||
      Number(age) > 70
    ) {
      newErrors.age =
        "Age must be between 18 and 70.";
    }

    // Contact
    if (!contact.trim()) {
      newErrors.contact =
        "Contact number is required.";
    } else if (
      !/^\d{10}$/.test(contact.trim())
    ) {
      newErrors.contact =
        "Contact number must contain exactly 10 digits.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  }

  async function handleAddDriver() {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setErrors({});

      await createDriver({
        name: name.trim(),
        age: Number(age),
        contact: contact.trim(),
      });

      navigate("/driver-list", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Failed to add driver:",
        error
      );

      setErrors({
        submit:
          error.message ||
          "Failed to add driver. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  const errorStyle = {
    color: "#FDA4AF",
    marginTop: "6px",
    marginBottom: 0,
    fontSize: "14px",
    lineHeight: "1.5",
  };

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
        title="Add Driver"
        showBackButton={true}
        showAlertButton={true}
      />

      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "clamp(30px, 5vw, 60px) clamp(20px, 5vw, 50px)",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          boxSizing: "border-box",
        }}
      >
        <div>
          <InputField
            label="NAME"
            placeholder="Enter driver name"
            value={name}
            onChange={(event) =>
              setName(event.target.value)
            }
          />

          {errors.name && (
            <p style={errorStyle}>
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <InputField
            label="AGE"
            placeholder="Enter driver age"
            value={age}
            onChange={(event) =>
              setAge(event.target.value)
            }
          />

          {errors.age && (
            <p style={errorStyle}>
              {errors.age}
            </p>
          )}
        </div>

        <div>
          <InputField
            label="CONTACT"
            placeholder="Enter 10-digit contact number"
            value={contact}
            onChange={(event) =>
              setContact(event.target.value)
            }
          />

          {errors.contact && (
            <p style={errorStyle}>
              {errors.contact}
            </p>
          )}
        </div>

        {errors.submit && (
          <p
            style={{
              color: "#FDA4AF",
              textAlign: "center",
              backgroundColor: "#2A1725",
              border: "1px solid #7F3047",
              borderRadius: "8px",
              padding: "12px",
              margin: 0,
              overflowWrap: "anywhere",
            }}
          >
            {errors.submit}
          </p>
        )}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <PrimaryButton
            text="CANCEL"
            width="180px"
            height="55px"
            onClick={() =>
              navigate("/driver-list")
            }
          />

          <PrimaryButton
            text={
              loading
                ? "ADDING..."
                : "ADD DRIVER"
            }
            width="180px"
            height="55px"
            onClick={handleAddDriver}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
}

export default AddDriver;
