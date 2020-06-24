import React from "react";

export default function SliderIndicator(props) {
  const getBackgroundColor = (value, min) => {
    if (value > min) return { background: "#4070e0" };
    return { background: "#d6d6d6" };
  };
  return (
    <div className="slider-bar-border-container">
      <div className="bar" style={getBackgroundColor(props.value, 0)} />
      <div className="bar" style={getBackgroundColor(props.value, 20)} />
      <div className="bar" style={getBackgroundColor(props.value, 40)} />
      <div className="bar" style={getBackgroundColor(props.value, 60)} />
    </div>
  );
}
