function MetricCard({
  title,
  value,
  width = "100%",
  height = "160px",
  valueColor = "#F8FAFC",
  accentColor = "#38BDF8",
}) {
  return (
    <article
      style={{
        width,
        height,
        minWidth: 0,
        boxSizing: "border-box",
        background:
          "linear-gradient(145deg, #1A2940 0%, #142238 100%)",
        border: "1px solid #334863",
        borderTop: `3px solid ${accentColor}`,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.18)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          minHeight: "48px",
          boxSizing: "border-box",
          padding: "10px 12px",
          borderBottom: "1px solid #334863",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#CBD5E1",
          fontSize: "16px",
          fontWeight: "550",
          textAlign: "center",
        }}
      >
        {title}
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "12px",
          color: valueColor,
          fontSize: "clamp(21px, 2vw, 27px)",
          fontWeight: "750",
          lineHeight: "1.3",
          textAlign: "center",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </div>
    </article>
  );
}

export default MetricCard;