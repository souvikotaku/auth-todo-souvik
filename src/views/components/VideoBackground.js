import React from "react";

const VideoBackground = ({ videoSource }) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;
