function VideoPlaceholder({
  width = "900px",
  height = "500px",
}) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#000000",
        border: "3px solid #8DBEFF",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#8DBEFF",
        fontSize: "28px",
        fontWeight: "600",
      }}
    >
      Live Video Feed
    </div>
  );
}

export default VideoPlaceholder;