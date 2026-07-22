function PrimaryButton({
  text,
  onClick,
  type = "button",
  width = "280px",
  height = "70px",
  backgroundColor = "#3B82F6",
  textColor = "#FFFFFF",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        width,
        height,
        backgroundColor,
        color: textColor,
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        fontSize: "28px",
        fontWeight: "600",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.35)",
      }}
    >
      {text}
    </button>
  );
}

export default PrimaryButton;