import React from "react";

function CircleColor({ color, onClick, highlighted }) {
  return (
    <div
      className="color-circle"
      style={{
        backgroundColor: color,
        opacity: highlighted ? 1 : 0.6,
        transform: highlighted ? "scale(1.2)" : "scale(1)"
      }}
      onClick={onClick}
    ></div>
  );
}

export default CircleColor;
