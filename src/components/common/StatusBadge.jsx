function StatusBadge({ status }) {
  let color = "#94A3B8";

  switch (status.toLowerCase()) {
    case "active":
      color = "#2DD4BF";
      break;

    case "not responding":
      color = "#FB7185";
      break;

    case "inactive":
      color = "#FBBF24";
      break;

    case "critical":
      color = "#FDA4AF";
      break;

    default:
      color = "#CBD5E1";
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