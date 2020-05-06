import React from "react";
import { Typography } from "@material-ui/core";

export default function SkillBar(props) {
  const { field, value } = props.values;

  return (
    <div>
      <Typography>{field + value}</Typography>
      <div
        style={{ width: `${value}%`, height: "10px", background: "pink" }}
      ></div>
    </div>
  );
}
