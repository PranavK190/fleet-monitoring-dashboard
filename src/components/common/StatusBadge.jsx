function StatusBadge({ status }) {
  let color = "#000000";

  switch (status.toLowerCase()) {
    case "active":
      color = "#00D000";
      break;

    case "not responding":
      color = "#FF3131";
      break;

    case "inactive":
      color = "#FFD447";
      break;

    case "critical":
      color = "#FF3131";
      break;

    default:
      color = "#FFFFFF";
  }

  return (
    <span
      style={{
        color,
        fontWeight: "700",
        fontSize: "28px",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;