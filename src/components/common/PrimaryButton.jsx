
function PrimaryButton({
  text,
  onClick,
  type = "button",
  width = "280px",
  height = "70px",
  backgroundColor = "#2563EB",
  textColor = "#FFFFFF",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width,
        height,
        minWidth: 0,
        maxWidth: "100%",
        boxSizing: "border-box",
        padding: "0 20px",
        backgroundColor: disabled
          ? "#334155"
          : backgroundColor,
        color: disabled
          ? "#CBD5E1"
          : textColor,
        border: "1px solid rgba(125,211,252,0.25)",
        borderRadius: "10px",
        cursor: disabled
          ? "not-allowed"
          : "pointer",
        fontFamily: "inherit",
        fontSize: "17px",
        fontWeight: "650",
        lineHeight: "1.2",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        boxShadow: disabled
          ? "none"
          : "0 4px 12px rgba(0,0,0,0.22)",
        opacity: disabled ? 0.75 : 1,
        transition:
          "background-color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;