function VideoPlaceholder({
  width = "900px",
  height = "500px",
}) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#111B2E",
        border: "3px solid #38BDF8",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#7DD3FC",
        fontSize: "28px",
        fontWeight: "600",
      }}
    >
      Live Video Feed
    </div>
  );
}

export default VideoPlaceholder;