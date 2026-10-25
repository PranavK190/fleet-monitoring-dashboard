
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/common/PrimaryButton";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0B1220",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
        padding: "40px",
        boxSizing: "border-box",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <h1
        style={{
          color: "#F8FAFC",
          fontSize: "64px",
          margin: 0,
          textAlign: "center",
        }}
      >
        Fleet Monitoring Dashboard
      </h1>

      <p
        style={{
          color: "#CBD5E1",
          fontSize: "24px",
          textAlign: "center",
          maxWidth: "700px",
          margin: 0,
          lineHeight: 1.6,
        }}
      >
        Monitor your fleet, drivers, alerts, and live vehicle status from a
        single dashboard.
      </p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
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
