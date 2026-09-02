import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../services/auth-service";

import InputField from "../../components/common/InputField";
import PrimaryButton from "../../components/common/PrimaryButton";
import PageHeader from "../../components/layout/PageHeader";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const user = await loginUser(email, password);

      if (!user) {
        setErrorMessage("Invalid email or password.");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage(
        "Something went wrong while trying to log in."
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
      <PageHeader
        title=""
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
            marginBottom: "70px",
            fontWeight: "700",
          }}
        >
          LOGIN
        </h1>

        <div
          style={{
            width: "720px",
            display: "flex",
            flexDirection: "column",
            gap: "35px",
          }}
        >
          <InputField
            label="EMAIL"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div style={{ position: "relative" }}>
            <InputField
              label="PASSWORD"
              type={showPassword ? "text" : "password"}
              placeholder=""
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
        </div>

        <div
          style={{
            width: "720px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <button
            onClick={() => navigate("/signup")}
            style={{
              background: "none",
              border: "none",
              color: "white",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: "17px",
            }}
          >
            New user? Sign up
          </button>

          <PrimaryButton
            text={loading ? "LOGGING IN..." : "LOGIN"}
            width="220px"
            onClick={handleLogin}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;