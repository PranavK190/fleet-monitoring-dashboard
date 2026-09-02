function DashboardHeader({
  title = "Fleet Monitoring System",
  subtitle = "Track Smarter. Drive Better.",
  rightText = "WELCOME BACK !",
}){
  return (
    <div
      style={{
        height: "160px",
        borderBottom: "2px solid rgba(255,255,255,0.35)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px",
      }}
    >
      {/* Left Side */}
      <div>
        <h1
          style={{
            color: "white",
            margin: 0,
            fontSize: "42px",
            fontWeight: "700",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            color: "#9FC8FF",
            marginTop: "10px",
            fontSize: "22px",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Right Side */}
      <h1
        style={{
          color: "white",
          fontSize: "52px",
          fontWeight: "500",
          margin: 0,
        }}
      >
        {rightText}
      </h1>
    </div>
  );
}

export default DashboardHeader;