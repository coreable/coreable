import React from "react";
import { Typography } from "@material-ui/core";

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
        Core skills are broken down into multiple facets, and facets are broken
        down into behavioural based traits. <br /> <br />
        For example collaboration consists of five facets, one include emotional
        intelligence. Emotional intelligence is further broken down into three
        behavioural traits, one including managing own emotions.
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
