function DashboardHeader({
  title = "AutoSentinel",
  subtitle = "Track Smarter. Drive Better.",
  rightText = "WELCOME BACK !",
}) {
  return (
    <div
      style={{
        height: "150px",
        borderBottom:
          "2px solid rgba(255,255,255,0.35)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 35px",
        boxSizing: "border-box",
      }}
    >
      {/* Left Side */}
      <div>
        <h1
          style={{
            color: "white",
            margin: 0,
            fontSize: "38px",
            fontWeight: "700",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            color: "#9FC8FF",
            marginTop: "8px",
            marginBottom: 0,
            fontSize: "20px",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Right Side */}
      <h1
        style={{
          color: "white",
          fontSize: "44px",
          fontWeight: "500",
          margin: 0,
          whiteSpace: "nowrap",
        }}
      >
        {rightText}
      </h1>
    </div>
  );
}

export default DashboardHeader;