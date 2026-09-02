import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/common/PrimaryButton";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#14004D",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
        padding: "40px",
      }}
    >
      <h1
        style={{
          color: "#FFFFFF",
          fontSize: "64px",
          margin: 0,
          textAlign: "center",
        }}
      >
        Fleet Monitoring Dashboard
      </h1>

      <p
        style={{
          color: "#D8D8D8",
          fontSize: "24px",
          textAlign: "center",
          maxWidth: "700px",
          margin: 0,
        }}
      >
        Monitor your fleet, drivers, alerts, and live vehicle status from a
        single dashboard.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <PrimaryButton
          text="Login"
          width="180px"
          onClick={() => navigate("/login")}
        />

        <PrimaryButton
          text="Sign Up"
          width="180px"
          onClick={() => navigate("/signup")}
        />
      </div>
    </div>
  );
}

export default Landing;