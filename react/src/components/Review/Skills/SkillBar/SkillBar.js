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
            paddingBottom: "5px",
          }}
        >
          {name}
        </Typography>
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: `${value}%`,
              height: "24px",
              borderRadius: "4px",
              background: "rgb(64, 112, 224)",
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

  if (self > team) {
    return <div> its blindspot </div>;
  }

  if (team > self) {
    return <div> its brightspot </div>;
  }
}