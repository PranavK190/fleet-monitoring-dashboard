function DashboardHeader({
  title = "AutoSentinel",
  subtitle = "Track Smarter. Drive Better.",
  rightText = "WELCOME BACK !",
}) {
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
        gap: "24px",
        padding: "22px clamp(20px, 3vw, 42px)",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          minWidth: 0,
        }}
      >
        <h1
          style={{
            color: "#F8FAFC",
            margin: 0,
            fontSize: "clamp(27px, 3vw, 36px)",
            fontWeight: "750",
            letterSpacing: "-0.7px",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h1>

        <p
          style={{
            color: "#9FB4CE",
            margin: "8px 0 0",
            fontSize: "15px",
            letterSpacing: "0.2px",
          }}
        >
          {subtitle}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#BAE6FD",
          fontSize: "14px",
          fontWeight: "700",
          letterSpacing: "1px",
        }}
      >
        <span
          style={{
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            backgroundColor: "#2DD4BF",
            boxShadow: "0 0 10px rgba(45,212,191,0.4)",
            flexShrink: 0,
          }}
        />

        <span>{rightText}</span>
      </div>
    </header>
  );
}

export default DashboardHeader;