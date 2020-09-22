import React from "react";

import "./SkillBar.scss";

export default function SkillBar(props) {
  const { trait, value } = props.values;

  function convertToText(averageScore) {
    if (averageScore < 20) {
      return "Fails to attempt";
    }
    if (averageScore < 40) {
      return "Under promoting";
    }
    if (averageScore < 60) {
      return "Habitually";
    }
    if (averageScore < 80) {
      return "Encourages";
    }
    if (averageScore <= 100) {
      return "Teaches";
    }
  }

  return (
    <div style={{ borderBottom: "0.5pt solid #d6d6d6" }}>
      <div style={{ margin: "0 16px" }}>
        <div style={{ position: "relative", display: "flex" }}>
          <p
            style={{
              margin: "0",
              padding: "0",
              fontSize: "1.4rem",
              textAlign: "left",
              color: "black",
              paddingTop: "10px",
              paddingBottom: "8pt",
              width: "70%",
            }}
          >
            {trait}
          </p>
          <span
            className="result-text"
            // style={{
            //   color:
            //     value < 20
            //       ? "#4070e0"
            //       : value < 40
            //       ? "#0096f8"
            //       : value < 60
            //       ? "#00b3e5"
            //       : value < 80
            //       ? "#00c8b3"
            //       : "#2dd775",
            // }}
          >
            {convertToText(value)}
          </span>
        </div>
        <div style={{ position: "relative", paddingBottom: "8pt" }}>
          <div className="skillbar-container grey" />
          <div
            className="skillbar-container blue"
            style={{ width: `${value}%`, zIndex: "200" }}
          />
          <div className="interval-container">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
