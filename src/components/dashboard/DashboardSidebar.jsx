import { useNavigate } from "react-router-dom";
import Avatar from "../common/Avatar";

function DashboardSidebar() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const userName =
    currentUser?.name || "User";

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

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
          gap: "16px",
          padding: "22px 18px",
        }}
      >
        <Avatar size="65px" />

        <h2
          style={{
            color: "#6FB2FF",
            margin: 0,
            fontSize: "30px",
            fontWeight: "600",
          }}
        >
          {userName}
        </h2>
      </div>

      {/* Menu */}
      <div
        style={{
          marginTop: "18px",
          borderTop:
            "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <MenuItem
          text="Active Fleets"
          active={true}
          onClick={() =>
            navigate("/fleet")
          }
        />

        <MenuItem
          text="Drivers List"
          onClick={() =>
            navigate("/driver-list")
          }
        />

        <MenuItem
          text="Alerts"
          onClick={() =>
            navigate("/alert-list")
          }
        />

        <MenuItem
          text="Profile"
          onClick={() =>
            navigate("/profile")
          }
        />

        <MenuItem
          text="Logout"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

function MenuItem({
  text,
  active = false,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: "20px 15px",
        minHeight: "70px",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        borderBottom:
          "1px solid rgba(255,255,255,0.3)",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: active ? "700" : "400",
        color: "white",
        lineHeight: "1.2",
      }}
    >
      {text}
    </div>
  );
}

export default DashboardSidebar;