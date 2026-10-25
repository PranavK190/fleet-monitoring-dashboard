
function InputField({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
}) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "56px",
        backgroundColor: "#111B2E",
        border: "1px solid #334863",
        borderRadius: "2px",
        overflow: "hidden",
        boxSizing: "border-box",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {/* Label Section */}
      <div
        style={{
          width: "230px",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          paddingLeft: "16px",
          borderRight: "1px solid #334863",
          fontSize: "22px",
          fontWeight: "500",
          color: "#CBD5E1",
          textTransform: "uppercase",
          boxSizing: "border-box",
        }}
      >
        {label}
      </div>

      {/* Input Section */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          flex: 1,
          minWidth: 0,
          border: "none",
          outline: "none",
          backgroundColor: "#1A2940",
          padding: "0 16px",
          fontSize: "20px",
          color: "#F8FAFC",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export default InputField;
