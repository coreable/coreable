import React from "react";
import { Typography } from "@material-ui/core";

import "./SkillBar.scss";

export default function SkillBar(props) {
  const { field, value } = props.values;

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
        {field}
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
