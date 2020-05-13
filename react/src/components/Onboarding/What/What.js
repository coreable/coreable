import React from "react";
import { Typography } from "@material-ui/core";

export default function What() {
  return (
    <React.Fragment>
      <Typography variant="h3" style={{ fontWeight: "bold", color: "white" }}>
        What is Facets and Traits?
      </Typography>
      <div className="inside-main" style={{ textAlign: "left" }}>
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          Facets and traits
        </Typography>
        <Typography style={{ fontSize: "1.6rem" }}>
          Core skills are broken down into multiple facets, and facets are
          broken down into behavioural based traits. <br /> <br />
          For example collaboration consists of five facets, one include
          emotional intelligence. Emotional intelligence is further broken down
          into three behavioural traits, one including managing own emotions.
        </Typography>

        <div
          style={{
            height: "204pt",
            width: "100%",
            background: "lightgrey",
          }}
        ></div>
      </div>
    </React.Fragment>
  );
}
