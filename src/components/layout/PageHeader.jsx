import { useNavigate } from "react-router-dom";

function PageHeader({
  title = "",
  showBackButton = false,
  showHomeButton = false,
  showAlertButton = false,
  backRoute = -1,
  backState = undefined,
  homeRoute = "/dashboard",
  alertRoute = "/alert-list",
}) {
  const navigate = useNavigate();

  function handleBack() {
    if (backState !== undefined) {
      navigate(backRoute, {
        state: backState,
      });
    } else {
      navigate(backRoute);
    }
  }

  return (
    <div
      style={{
        height: "120px",
        backgroundColor: "#1B0D83",
        borderBottom: "2px solid rgba(255,255,255,0.25)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 35px",
      }}
    >
      {/* Left */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        {showBackButton && (
          <button
            onClick={handleBack}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "42px",
              cursor: "pointer",
            }}
          >
            ←
          </button>
        )}

        {showHomeButton && (
          <button
            onClick={() => navigate(homeRoute)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "40px",
              cursor: "pointer",
            }}
          >
            🏠
          </button>
        )}

        <h1
          style={{
            color: "white",
            margin: 0,
            fontSize: "28px",
          }}
        >
          {title}
        </h1>
      </div>

      {showAlertButton && (
        <button
          onClick={() => navigate(alertRoute)}
          style={{
            background: "none",
            border: "none",
            color: "red",
            fontSize: "42px",
            cursor: "pointer",
          }}
        >
          ⚠
        </button>
      )}
    </div>
  );
}

export default PageHeader;