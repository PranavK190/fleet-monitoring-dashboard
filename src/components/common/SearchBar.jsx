
function SearchBar({
  placeholder = "Search",
  value,
  onChange,
  width = "430px",
}) {
  return (
    <div
      style={{
        width,
        maxWidth: "100%",
        minWidth: 0,
        height: "52px",
        boxSizing: "border-box",
        backgroundColor: "#1A2940",
        border: "1px solid #3B506B",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        gap: "12px",
        transition: "border-color 0.2s ease",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          fontSize: "21px",
          color: "#38BDF8",
          flexShrink: 0,
        }}
      >
        🔍
      </span>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          flex: 1,
          minWidth: 0,
          height: "100%",
          boxSizing: "border-box",
          border: "none",
          outline: "none",
          background: "transparent",
          fontFamily: "inherit",
          fontSize: "16px",
          color: "#F8FAFC",
        }}
      />

      <style>
        {`
          input::placeholder {
            color: #94A3B8;
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
}

export default SearchBar;