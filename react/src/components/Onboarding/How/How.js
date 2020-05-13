import React from "react";
import { Typography } from "@material-ui/core";

export default function How() {
  return (
    <React.Fragment>
      <Typography variant="h3" style={{ fontWeight: "bold", color: "white" }}>
        What is Facets and Traits?
      </Typography>
      <div className="inside-main" style={{ textAlign: "left" }}>
        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          Behaviour based reviews
        </Typography>
        <Typography style={{ fontSize: "1.6rem" }}>
          Coreable uses a behaviour based five band system to assist in
          measuring these facets and traits: <br /> <br />
          Unable to, Under prompting, Habitually, Encourages Others and Teaches.{" "}
          <br /> <br />
          Coreable allows you to provide the data for yourself and team reviews.
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
