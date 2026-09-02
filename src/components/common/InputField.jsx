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
        backgroundColor: "#76AFF1",
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      {/* Label Section */}
      <div
        style={{
          width: "230px",
          display: "flex",
          alignItems: "center",
          paddingLeft: "16px",
          borderRight: "1px solid rgba(0,0,0,0.35)",
          fontSize: "22px",
          fontWeight: "500",
          color: "#111111",
          textTransform: "uppercase",
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
          border: "none",
          outline: "none",
          backgroundColor: "#76AFF1",
          padding: "0 16px",
          fontSize: "20px",
          color: "#111111",
        }}
      />
    </div>
  );
}

export default InputField;