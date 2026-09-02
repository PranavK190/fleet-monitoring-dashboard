function MetricCard({
  title,
  value,
  width = "300px",
  height = "140px",
  valueColor = "#000000",
}) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#8DBEFF",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          height: "38px",
          borderBottom: "1px solid rgba(0,0,0,0.35)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          height: "calc(100% - 38px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "28px",
          fontWeight: "700",
          color: valueColor,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default MetricCard;