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
        height: "52px",
        backgroundColor: "#8DBEFF",
        borderRadius: "25px",
        display: "flex",
        alignItems: "center",
        padding: "0 18px",
        gap: "12px",
      }}
    >
      <span
        style={{
          fontSize: "28px",
          color: "#2E2E2E",
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
          border: "none",
          outline: "none",
          background: "transparent",
          fontSize: "22px",
          color: "#ffffff",
        }}
      />
    </div>
  );
}

export default SearchBar;