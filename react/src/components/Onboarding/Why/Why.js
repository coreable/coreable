import React from "react";
import { Typography } from "@material-ui/core";

export default function Why() {
  return (
    <React.Fragment>
      <Typography variant="h4" style={{ fontWeight: "bold" }}>
        Measure, reflect, develop
      </Typography>
      <Typography style={{ fontSize: "1.6rem" }}>
        Coreable provides you the ability to measure, reflect and develop your
        core skills through a growth mindset. <br /> <br /> Gaining team wide
        feedback to identify your strengths, areas to improve, brightspot and
        blindspots.
      </Typography>

      <div
        style={{
          height: "204pt",
          width: "100%",
          background: "lightgrey",
        }}
      ></div>
    </React.Fragment>
  );
}
