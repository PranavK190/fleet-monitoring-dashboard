function PrimaryButton({
  text,
  onClick,
  type = "button",
  width = "280px",
  height = "70px",
  backgroundColor = "#3B82F6",
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
        boxSizing: "border-box",
        padding: "0 14px",
        backgroundColor,
        color: textColor,
        border: "none",
        borderRadius: "20px",
        cursor: disabled
          ? "not-allowed"
          : "pointer",
        fontSize: "22px",
        fontWeight: "600",
        lineHeight: "1.1",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        boxShadow:
          "0px 4px 6px rgba(0,0,0,0.35)",
        opacity: disabled ? 0.7 : 1,
      }}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;