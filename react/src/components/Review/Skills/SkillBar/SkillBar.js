import React from "react";
import { Typography } from "@material-ui/core";

import "./SkillBar.scss";

export default function SkillBar(props) {
  const { value, name, self, team } = props.values;

  if (team === undefined || self === undefined) {
    return (
      <div>
        <Typography
          variant="h5"
          // component="h1"
          style={{
            fontWeight: "bold",
            textAlign: "left",
            color: "black",
            paddingTop: "10px",
            paddingBottom: "8pt",
          }}
        >
          {name}
        </Typography>
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
    );
  }

  if (self > team) {
    return (
      <div>
        <Typography
          variant="h5"
          // component="h1"
          style={{
            fontWeight: "bold",
            textAlign: "left",
            color: "black",
            paddingTop: "10px",
            paddingBottom: "8pt",
          }}
        >
          {name}
        </Typography>
        <div style={{ position: "relative", paddingBottom: "8pt" }}>
          <div className="skillbar-container grey" />
          <div
            className="skillbar-container blue"
            style={{
              width: `${self}%`,
            }}
          />
          <div
            className="skillbar-container green"
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
    );
  }

  if (team > self) {
    return (
      <div>
        <Typography
          variant="h5"
          // component="h1"
          style={{
            fontWeight: "bold",
            textAlign: "left",
            color: "black",
            paddingTop: "10px",
            paddingBottom: "8pt",
          }}
        >
          {name}
        </Typography>
        <div style={{ position: "relative", paddingBottom: "8pt" }}>
          <div className="skillbar-container grey" />
          <div
            className="skillbar-container green"
            style={{
              width: `${team}%`,
            }}
          />
          <div
            className="skillbar-container blue"
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
    );
  }
}
