
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "../common/Avatar";

function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  let currentUser = null;

  try {
    currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );
  } catch {
    currentUser = null;
  }

  const userName = currentUser?.name || "User";

  function handleLogout() {
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  const currentPath = location.pathname;

  return (
    <div
      style={{
        minHeight: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        padding: "22px 14px",
        color: "#F8FAFC",
      }}
    >
      {/* User Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 8px 24px",
          borderBottom: "1px solid #334863",
          minWidth: 0,
        }}
      >
        <Avatar size="52px" />

        <div style={{ minWidth: 0 }}>
          <p
            style={{
              color: "#8FA5C1",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "1.2px",
              margin: "0 0 5px",
            }}
          >
            SIGNED IN AS
          </p>

          <h2
            title={userName}
            style={{
              color: "#F8FAFC",
              margin: 0,
              fontSize: "18px",
              fontWeight: "650",
              overflowWrap: "anywhere",
            }}
          >
            {userName}
          </h2>
        </div>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Dashboard navigation"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          marginTop: "24px",
        }}
      >
        <MenuItem
          text="Active Fleets"
          active={currentPath === "/fleet"}
          onClick={() => navigate("/fleet")}
        />

        <MenuItem
          text="Drivers List"
          active={currentPath === "/driver-list"}
          onClick={() => navigate("/driver-list")}
        />

        <MenuItem
          text="Alerts"
          active={
            currentPath === "/alert-list" ||
            currentPath === "/alert"
          }
          onClick={() => navigate("/alert-list")}
        />

        <MenuItem
          text="Profile"
          active={currentPath === "/profile"}
          onClick={() => navigate("/profile")}
        />
      </nav>

      {/* Logout */}
      <div
        style={{
          marginTop: "auto",
          paddingTop: "24px",
        }}
      >
        <MenuItem
          text="Logout"
          onClick={handleLogout}
          logout={true}
        />
      </div>
    </div>
  );
}

function MenuItem({
  text,
  active = false,
  onClick,
  logout = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      style={{
        width: "100%",
        minHeight: "48px",
        boxSizing: "border-box",
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        border: active
          ? "1px solid #285A85"
          : "1px solid transparent",
        borderRadius: "9px",
        borderLeft: active
          ? "4px solid #38BDF8"
          : "4px solid transparent",
        backgroundColor: active
          ? "#1A3551"
          : "transparent",
        color: logout
          ? "#FDA4AF"
          : active
            ? "#BAE6FD"
            : "#CBD5E1",
        cursor: "pointer",
        textAlign: "left",
        fontSize: "15px",
        fontWeight: active ? "650" : "500",
        transition:
          "background-color 0.2s ease, border-color 0.2s ease",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: "7px",
          height: "7px",
          borderRadius: "50%",
          flexShrink: 0,
          backgroundColor: active
            ? "#38BDF8"
            : logout
              ? "#FB7185"
              : "#64748B",
        }}
      />

      <span>{text}</span>
    </button>
  );
}

export default DashboardSidebar;