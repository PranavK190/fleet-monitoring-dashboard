function Avatar({
  image = null,
  size = "160px",
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        backgroundColor: "#111B2E",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "8px solid #334863",
      }}
    >
      {image ? (
        <img
          src={image}
          alt="Profile"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <svg
          width="80%"
          height="80%"
          viewBox="0 0 24 24"
          fill="#38BDF8"
        >
          <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z"/>
        </svg>
      )}
    </div>
  );
}

export default Avatar;