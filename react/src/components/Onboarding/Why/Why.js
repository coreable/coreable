import React from "react";
import { Typography } from "@material-ui/core";
import svg from "./Group424.svg";

export default function Why() {
  return (
    <React.Fragment>
      <Typography
        variant="h4"
        style={{ fontWeight: "bold", textAlign: "left" }}
      >
        Measure, reflect, develop
      </Typography>
      <Typography
        style={{ fontSize: "1.6rem", textAlign: "left", padding: "16pt 0" }}
      >
        Coreable enables you to measure, reflect and develop your core skills.{" "}
        <br />
        <br />
        By collating peers feedback we will identify your strengths, areas of
        improvement, brightspots and blindspots.
      </Typography>

      <img
        src={svg}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "0.33rem",
        }}
        alt="Why chose coreable"
      />
    </React.Fragment>
  );
}
