import { useNavigate } from "react-router-dom";
import Avatar from "../common/Avatar";

function DashboardSidebar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      {/* User Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          padding: "25px 20px",
        }}
      >
        <Avatar size="70px" />

        <h2
          style={{
            color: "#6FB2FF",
            margin: 0,
            fontSize: "34px",
          }}
        >
          Abcdefg
        </h2>
      </div>

      {/* Menu */}
      <div
        style={{
          marginTop: "20px",
          borderTop: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <MenuItem
  text="Active Fleets"
  active={true}
  onClick={() => navigate("/fleet")}
/>

        <MenuItem
          text="Drivers List"
          onClick={() => navigate("/driver-list")}
        />

        <MenuItem
          text="Profile"
          onClick={() => navigate("/profile")}
        />

        <MenuItem
          text="Logout"
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}

function MenuItem({ text, active = false, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "24px 20px",
        cursor: "pointer",
        borderBottom: "1px solid rgba(255,255,255,0.3)",
        textAlign: "center",
        fontSize: "28px",
        fontWeight: active ? "700" : "400",
        color: "white",
      }}
    >
      {text}
    </div>
  );
}

export default DashboardSidebar;