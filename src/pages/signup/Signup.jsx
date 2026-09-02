import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signupUser } from "../../services/auth-service";

import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import PageHeader from "../../components/layout/PageHeader";

function Signup() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function isValidPhoneNumber() {
    const digits = phoneNumber.replace(/\D/g, "");

    if (countryCode === "+91") {
      return /^[6-9]\d{9}$/.test(digits);
    }

    if (countryCode === "+1") {
      return /^\d{10}$/.test(digits);
    }

    if (countryCode === "+44") {
      return /^\d{10,11}$/.test(digits);
    }

    if (countryCode === "+61") {
      return /^\d{9}$/.test(digits);
    }

    if (countryCode === "+49") {
      return /^\d{10,11}$/.test(digits);
    }

    if (countryCode === "+971") {
      return /^\d{9}$/.test(digits);
    }

    if (countryCode === "+65") {
      return /^\d{8}$/.test(digits);
    }

    return false;
  }

  async function handleSignup() {
    setErrorMessage("");
    setSuccessMessage("");

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!isValidPhoneNumber()) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const fullPhoneNumber = `${countryCode}${phoneNumber.replace(
        /\D/g,
        ""
      )}`;

      const result = await signupUser(
        fullName,
        email,
        password,
        fullPhoneNumber
      );

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      setSuccessMessage(
        "Account created successfully. Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Signup failed:", error);
      setErrorMessage(
        "Something went wrong while creating the account."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#14004D",
        color: "white",
      }}
    >
      <PageHeader title="" showBackButton={true} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "700",
            marginBottom: "50px",
          }}
        >
          SIGN UP
        </h1>

        <div
          style={{
            width: "720px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          <InputField
            label="FULL NAME"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <InputField
            label="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "15px",
            }}
          >
            <div style={{ width: "130px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                COUNTRY
              </label>

              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                style={{
                  width: "100%",
                  background: "transparent",
                  color: "white",
                  border: "none",
                  borderBottom: "1px solid white",
                  padding: "10px 0",
                  fontSize: "18px",
                  outline: "none",
                }}
              >
                <option value="+91" style={{ color: "black" }}>
                  India (+91)
                </option>

                <option value="+1" style={{ color: "black" }}>
                  USA / Canada (+1)
                </option>

                <option value="+44" style={{ color: "black" }}>
                  UK (+44)
                </option>

                <option value="+61" style={{ color: "black" }}>
                  Australia (+61)
                </option>

                <option value="+49" style={{ color: "black" }}>
                  Germany (+49)
                </option>

                <option value="+971" style={{ color: "black" }}>
                  UAE (+971)
                </option>

                <option value="+65" style={{ color: "black" }}>
                  Singapore (+65)
                </option>
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <InputField
                label="PHONE NUMBER"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <InputField
              label="PASSWORD"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "0",
                bottom: "8px",
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
                padding: "0",
              }}
            >
              👁️
            </button>
          </div>

          <div style={{ position: "relative" }}>
            <InputField
              label="CONFIRM PASSWORD"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              style={{
                position: "absolute",
                right: "0",
                bottom: "8px",
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
                padding: "0",
              }}
            >
              👁️
            </button>
          </div>

          {errorMessage && (
            <p
              style={{
                color: "#FF4D4D",
                margin: 0,
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p
              style={{
                color: "#39E600",
                margin: 0,
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              {successMessage}
            </p>
          )}
        </div>

        <div
          style={{
            width: "720px",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "55px",
          }}
        >
          <PrimaryButton
            text={loading ? "CREATING..." : "CREATE ACCOUNT"}
            width="260px"
            onClick={handleSignup}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;