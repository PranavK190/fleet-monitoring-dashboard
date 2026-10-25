
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

  const iconButtonStyle = {
    background: "transparent",
    border: "1px solid transparent",
    color: "#BAE6FD",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    minWidth: "42px",
    minHeight: "42px",
    flexShrink: 0,
  };

  return (
    <header
      style={{
        minHeight: "120px",
        boxSizing: "border-box",
        background:
          "linear-gradient(110deg, #111B2E 0%, #152640 100%)",
        borderBottom: "1px solid #334863",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        padding: "20px clamp(20px, 3vw, 42px)",
      }}
    >
      {/* Left */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          minWidth: 0,
        }}
      >
        {showBackButton && (
          <button
            type="button"
            aria-label="Go back"
            onClick={handleBack}
            style={{
              ...iconButtonStyle,
              fontSize: "36px",
            }}
          >
            ←
          </button>
        )}

        {showHomeButton && (
          <button
            type="button"
            aria-label="Go to dashboard"
            onClick={() => navigate(homeRoute)}
            style={{
              ...iconButtonStyle,
              fontSize: "27px",
            }}
          >
            🏠
          </button>
        )}

        <h1
          style={{
            color: "#F8FAFC",
            margin: 0,
            fontSize: "clamp(22px, 2.2vw, 29px)",
            fontWeight: "650",
            letterSpacing: "-0.3px",
            lineHeight: 1.3,
            overflowWrap: "anywhere",
          }}
        >
          {title}
        </h1>
      </div>

      {showAlertButton && (
        <button
          type="button"
          aria-label="Open alerts"
          onClick={() => navigate(alertRoute)}
          style={{
            ...iconButtonStyle,
            color: "#FB7185",
            fontSize: "32px",
          }}
        >
          ⚠
        </button>
      )}
    </header>
  );
}

export default PageHeader;