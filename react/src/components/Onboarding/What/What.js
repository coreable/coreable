import React from "react";
import { Typography } from "@material-ui/core";
import svg from "./Group425.svg";

export default function What() {
  return (
    <React.Fragment>
      <Typography
        variant="h4"
        style={{ fontWeight: "bold", textAlign: "left" }}
      >
        Facets and traits
      </Typography>
      <Typography
        style={{ fontSize: "1.6rem", textAlign: "left", padding: "16pt 0" }}
      >
        The core skills are first broken down into multiple facets and facets
        then broken down into behaviour based traits. <br /> <br />
        For example collaboration consists of five facets, one of which is:
        Emotional Intelligence. <br /> <br />
        Emotional Intelligence is than broken down into three behavioural
        traits, one of which is: Shows Empathy
      </Typography>

      <img
        src={svg}
        style={{ width: "100%", height: "auto", borderRadius: "0.33rem" }}
        alt="Facets and traits"
      />
    </React.Fragment>
  );
}
