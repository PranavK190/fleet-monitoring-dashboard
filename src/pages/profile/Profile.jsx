
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUserProfile } from "../../services/user-service";

import PageHeader from "../../components/layout/PageHeader";
import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";

function displayValue(value) {
  return value !== null &&
    value !== undefined &&
    value !== ""
    ? value
    : "N/A";
}

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const currentUser =
          JSON.parse(
            localStorage.getItem(
              "currentUser"
            )
          );

        if (!currentUser?.id) {
          throw new Error(
            "No logged-in user found."
          );
        }

        const data =
          await getUserProfile(
            currentUser.id
          );

        setUser(data);
        setName(data.name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
      } catch (error) {
        console.error(
          "Failed to load user profile:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0B1220",
          color: "#F8FAFC",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          fontFamily: "Inter, Arial, sans-serif",
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
        backgroundColor: "#0B1220",
        color: "#F8FAFC",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <PageHeader
        title="Profile Settings"
        showBackButton={true}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "70px",
          padding: "45px",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            width: "30%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <div
            style={{
              width: "170px",
              height: "170px",
              borderRadius: "50%",
              border: "10px solid #26364D",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "85px",
              color: "#F8FAFC",
              backgroundColor: "#111B2E",
            }}
          >
            👤
          </div>

          {/*
          <PrimaryButton
            text="ADD PHOTO"
            width="150px"
            height="45px"
            onClick={() =>
              alert(
                "Profile photo functionality pending"
              )
            }
          />
          */}
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <InputField
            label="NAME"
            placeholder=""
            value={displayValue(name)}
            readOnly={true}
          />

          <InputField
            label="USER ID"
            placeholder=""
            value={displayValue(
              user?.id
            )}
            readOnly={true}
          />

          <InputField
            label="EMAIL"
            placeholder=""
            value={displayValue(email)}
            readOnly={true}
          />

          <InputField
            label="PHONE NUMBER"
            placeholder=""
            value={displayValue(phone)}
            readOnly={true}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "35px",
              marginTop: "25px",
            }}
          >
            <PrimaryButton
              text="UPDATE PROFILE"
              width="220px"
              height="60px"
              onClick={() =>
                navigate(
                  "/update-profile"
                )
              }
            />

            <PrimaryButton
              text="LOGOUT"
              width="180px"
              height="60px"
              onClick={() => {
                localStorage.removeItem(
                  "currentUser"
                );

                window.location.href =
                  "/login";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
