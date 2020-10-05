import React from "react";

import "./SkillBar.scss";

export default function SkillBar(props) {
  const { type, isFacet } = props;
  const { name, average, reflection, difference } = props.values;

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

  function underEstimation(self, team) {
    if (team - self >= 20) {
      return "High";
    }
    if (team - self >= 10 || team - self < 20) {
      return "Medium";
    } else {
      return "Low";
    }
  }

  function overEstimation(self, team) {
    if (self - team >= 20) {
      return "High";
    }
    if (self - team >= 10 || self - team < 20) {
      return "Medium";
    } else {
      return "Low";
    }
  }

  if (type === "strengths" || type === "areasToImprove") {
    return (
      <div style={{ borderBottom: "0.5pt solid #d6d6d6" }}>
        <div style={{ margin: "0 16px" }}>
          <div style={{ position: "relative" }}>
            <p
              style={{
                margin: "0",
                padding: "0",
                fontSize: "1.4rem",
                textAlign: "left",
                color: "black",
                paddingTop: "10px",
                paddingBottom: "6pt",
                width: "70%",
              }}
            >
              {isFacet === "facet" ? name["facet"] : name["trait"]}
            </p>
            <p
              style={{
                margin: "0",
                padding: "0",
                fontSize: "1.2rem",
                textAlign: "left",
                color: "grey",
                paddingBottom: "8pt",
              }}
            >
              {isFacet == "trait" && name["facet"]}
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
              {convertToText(average)}
            </span>
          </div>
          <div style={{ position: "relative", paddingBottom: "8pt" }}>
            <div className="skillbar-container grey" />
            <div
              className="skillbar-container blue"
              style={{ width: `${average}%`, zIndex: "200" }}
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

  if (type === "overEstimation") {
    return (
      <div style={{ borderBottom: "0.5pt solid #d6d6d6" }}>
        <div style={{ margin: "0 16px" }}>
          <div style={{ position: "relative" }}>
            <p
              style={{
                margin: "0",
                padding: "0",
                fontSize: "1.4rem",
                textAlign: "left",
                color: "black",
                paddingTop: "10px",
                paddingBottom: "6pt",
                width: "70%",
              }}
            >
              {isFacet === "facet" ? name["facet"] : name["trait"]}
            </p>
            <p
              style={{
                margin: "0",
                padding: "0",
                fontSize: "1.2rem",
                textAlign: "left",
                color: "grey",
                paddingBottom: "8pt",
              }}
            >
              {isFacet == "trait" && name["facet"]}
            </p>
            <span className="result-text">
              {overEstimation(reflection, average)}
            </span>
          </div>
          <div style={{ position: "relative", paddingBottom: "8pt" }}>
            <div className="skillbar-container grey" />
            <div
              className="skillbar-container green"
              style={{
                width: `${reflection}%`,
              }}
            />
            <div
              className="skillbar-container blue"
              style={{
                width: `${average}%`,
                zIndex: "300",
                position: "absolute",
                top: "0",
              }}
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

  if (type === "underEstimation") {
    return (
      <div style={{ borderBottom: "0.5pt solid #d6d6d6" }}>
        <div style={{ margin: "0 16px" }}>
          <div style={{ position: "relative" }}>
            <p
              style={{
                margin: "0",
                padding: "0",
                fontSize: "1.4rem",
                textAlign: "left",
                color: "black",
                paddingTop: "10px",
                paddingBottom: "6pt",
                width: "70%",
              }}
            >
              {isFacet === "facet" ? name["facet"] : name["trait"]}
            </p>
            <p
              style={{
                margin: "0",
                padding: "0",
                fontSize: "1.2rem",
                textAlign: "left",
                color: "grey",
                paddingBottom: "8pt",
              }}
            >
              {isFacet == "trait" && name["facet"]}
            </p>
            <span className="result-text">
              {underEstimation(reflection, average)}
            </span>
          </div>
          <div style={{ position: "relative", paddingBottom: "8pt" }}>
            <div className="skillbar-container grey" />
            <div
              className="skillbar-container blue"
              style={{
                width: `${average}%`,
              }}
            />
            <div
              className="skillbar-container green"
              style={{
                width: `${reflection}%`,
                zIndex: "100",
                position: "absolute",
                top: "0",
              }}
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
}
