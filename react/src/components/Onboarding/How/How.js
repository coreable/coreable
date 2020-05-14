import React from "react";
import { Typography } from "@material-ui/core";
import svg from "./Group421.svg";

export default function How() {
  return (
    <React.Fragment>
      <Typography
        variant="h4"
        style={{ fontWeight: "bold", textAlign: "left" }}
      >
        Behaviour based reviews
      </Typography>
      <Typography
        style={{ fontSize: "1.6rem", textAlign: "left", padding: "16pt 0" }}
      >
        Coreable uses a behaviour-based five-band system to measure these
        traits. <br /> <br />
        The five bands are: unable to, under prompting, habitually, encourages
        others and teaches others. <br /> <br />
        You will be required to provide feedback on yourself and each member of
        your team.
      </Typography>

      <img
        src={svg}
        style={{ width: "100%", height: "auto", borderRadius: "0.33rem" }}
      />
    </React.Fragment>
  );
}
