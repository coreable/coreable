import React from "react";
import { Typography } from "@material-ui/core";

import "./SkillBar.scss";

export default function SkillBar(props) {
  const { value, name, self, team } = props.values;

  // console.log(`self score is: ${self}`);
  console.log(`team score is: ${team}`);

  function convertToText(num) {
    if (num < 20) {
      return "Fails to attempt";
    }
    if (num < 40) {
      return "Under promoting";
    }
    if (num < 60) {
      return "Habitually";
    }
    if (num < 80) {
      return "Encourages";
    }
    if (num <= 100) {
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

  if (team === undefined || self === undefined) {
    return (
      <div style={{ borderBottom: "0.5pt solid #d6d6d6" }}>
        <div style={{ margin: "0 16px" }}>
          <div style={{ position: "relative", display: "flex" }}>
            <Typography
              variant="h5"
              // component="h1"
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: "10px",
                paddingBottom: "8pt",
              }}
            >
              {name}
            </Typography>
            <span className="result-text">{convertToText(value)}</span>
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

  if (self > team) {
    return (
      <div style={{ borderBottom: "0.5pt solid #d6d6d6" }}>
        <div style={{ margin: "0 16px" }}>
          <div style={{ position: "relative", display: "flex" }}>
            <Typography
              variant="h5"
              // component="h1"
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: "10px",
                paddingBottom: "8pt",
              }}
            >
              {name}
            </Typography>
            <span className="result-text">{overEstimation(self, team)}</span>
          </div>
          <div style={{ position: "relative", paddingBottom: "8pt" }}>
            <div className="skillbar-container grey" />
            <div
              className="skillbar-container green"
              style={{
                width: `${self}%`,
              }}
            />
            <div
              className="skillbar-container blue"
              style={{
                width: `${team}%`,
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

  if (team > self) {
    return (
      <div style={{ borderBottom: "0.5pt solid #d6d6d6" }}>
        <div style={{ margin: "0 16px" }}>
          <div style={{ position: "relative", display: "flex" }}>
            <Typography
              variant="h5"
              // component="h1"
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: "10px",
                paddingBottom: "8pt",
              }}
            >
              {name}
            </Typography>
            <span className="result-text">{underEstimation(self, team)}</span>
          </div>
          <div style={{ position: "relative", paddingBottom: "8pt" }}>
            <div className="skillbar-container grey" />
            <div
              className="skillbar-container blue"
              style={{
                width: `${team}%`,
              }}
            />
            <div
              className="skillbar-container green"
              style={{
                width: `${self}%`,
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
