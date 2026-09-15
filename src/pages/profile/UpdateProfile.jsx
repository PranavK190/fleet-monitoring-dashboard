import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getUserProfile,
  updateUserProfile,
} from "../../services/user-service";

import PageHeader from "../../components/layout/PageHeader";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";

function UpdateProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const currentUser = JSON.parse(
          localStorage.getItem("currentUser")
        );

        if (!currentUser?.id) {
          throw new Error("No logged-in user found.");
        }

        const data = await getUserProfile(currentUser.id);

        setUser(data);
        setFullName(data.name || "");
        setEmail(data.email || "");

        if (data.phone) {
          const phone = data.phone;

          if (phone.startsWith("+91")) {
            setCountryCode("+91");
            setPhoneNumber(phone.substring(3));
          } else if (phone.startsWith("+1")) {
            setCountryCode("+1");
            setPhoneNumber(phone.substring(2));
          } else if (phone.startsWith("+44")) {
            setCountryCode("+44");
            setPhoneNumber(phone.substring(3));
          } else if (phone.startsWith("+61")) {
            setCountryCode("+61");
            setPhoneNumber(phone.substring(3));
          } else if (phone.startsWith("+49")) {
            setCountryCode("+49");
            setPhoneNumber(phone.substring(3));
          } else if (phone.startsWith("+971")) {
            setCountryCode("+971");
            setPhoneNumber(phone.substring(4));
          } else if (phone.startsWith("+65")) {
            setCountryCode("+65");
            setPhoneNumber(phone.substring(3));
          } else {
            setPhoneNumber(phone);
          }
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
        setErrorMessage("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, []);

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

  async function handleSaveChanges() {
    setErrorMessage("");
    setSuccessMessage("");

    if (!fullName || !email || !phoneNumber) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    if (!isValidPhoneNumber()) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setSaving(true);

      const fullPhoneNumber = `${countryCode}${phoneNumber.replace(
        /\D/g,
        ""
      )}`;

      const updates = {
        name: fullName,
        email,
        phone: fullPhoneNumber,
      };

      if (newPassword.trim() !== "") {
        updates.password = newPassword;
      }

      const updatedUser = await updateUserProfile(
        user.id,
        updates
      );

      setUser(updatedUser);

      setFullName(updatedUser.name || "");
      setEmail(updatedUser.email || "");

      const updatedPhone = updatedUser.phone || "";

      if (updatedPhone.startsWith("+91")) {
        setCountryCode("+91");
        setPhoneNumber(updatedPhone.substring(3));
      } else if (updatedPhone.startsWith("+1")) {
        setCountryCode("+1");
        setPhoneNumber(updatedPhone.substring(2));
      } else if (updatedPhone.startsWith("+44")) {
        setCountryCode("+44");
        setPhoneNumber(updatedPhone.substring(3));
      } else if (updatedPhone.startsWith("+61")) {
        setCountryCode("+61");
        setPhoneNumber(updatedPhone.substring(3));
      } else if (updatedPhone.startsWith("+49")) {
        setCountryCode("+49");
        setPhoneNumber(updatedPhone.substring(3));
      } else if (updatedPhone.startsWith("+971")) {
        setCountryCode("+971");
        setPhoneNumber(updatedPhone.substring(4));
      } else if (updatedPhone.startsWith("+65")) {
        setCountryCode("+65");
        setPhoneNumber(updatedPhone.substring(3));
      }

      setNewPassword("");
      setConfirmPassword("");

      const currentUser = JSON.parse(
        localStorage.getItem("currentUser")
      );

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          ...currentUser,
          ...updatedUser,
        })
      );

      setSuccessMessage("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update profile:", error);
      setErrorMessage("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#14004D",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
        }}
      >
        Loading profile...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#14004D",
        color: "white",
      }}
    >
      <PageHeader
        title="Update Profile"
        showBackButton={true}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "700",
            marginBottom: "50px",
          }}
        >
          UPDATE PROFILE
        </h1>

        <div
          style={{
            width: "720px",
            display: "flex",
            flexDirection: "column",
            gap: "22px",
          }}
        >
          <InputField
            label="FULL NAME"
            value={fullName}
            onChange={(event) =>
              setFullName(event.target.value)
            }
          />

          <InputField
            label="EMAIL"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
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
                onChange={(event) =>
                  setCountryCode(event.target.value)
                }
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
                onChange={(event) =>
                  setPhoneNumber(event.target.value)
                }
              />
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <InputField
              label="NEW PASSWORD"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(event) =>
                setNewPassword(event.target.value)
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
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

          <div style={{ position: "relative" }}>
            <InputField
              label="CONFIRM NEW PASSWORD"
              type={
                showConfirmPassword ? "text" : "password"
              }
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "25px",
            }}
          >
            <PrimaryButton
              text={saving ? "SAVING..." : "SAVE CHANGES"}
              width="240px"
              height="60px"
              onClick={handleSaveChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;