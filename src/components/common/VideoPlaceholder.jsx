
import { useEffect, useState } from "react";

function VideoPlaceholder({
  width = "900px",
  height = "500px",
  text = "Live Video Feed",
}) {
  const streamUrl =
    import.meta.env.VITE_DRIVER_STREAM_URL ||
    "http://127.0.0.1:8000/video_feed";

  const [streamError, setStreamError] = useState(false);

  useEffect(() => {
    setStreamError(false);
  }, [streamUrl]);

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
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {!streamError ? (
        <img
          src={streamUrl}
          alt="Live driver monitoring video feed"
          onError={() => setStreamError(true)}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            backgroundColor: "#111B2E",
          }}
        />
      ) : (
        <div
          style={{
            padding: "20px",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          <div>{text}</div>

          <div
            style={{
              marginTop: "10px",
              color: "#CBD5E1",
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            Live stream unavailable. Check that the camera backend is running.
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlaceholder;
