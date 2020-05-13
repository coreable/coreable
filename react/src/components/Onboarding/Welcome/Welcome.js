import React from "react";
import { Button, Typography } from "@material-ui/core";

import "./Welcome.scss";
import img from "./welcome.png";

export default function Welcome() {
  return (
    <div className="team-container">
      <div className="top"></div>
      <div className="main">
        <Typography variant="h3" style={{ fontWeight: "bold", color: "white" }}>
          Welcome to Collaboration
        </Typography>
        <div className="inside-main">
          <img src={img} style={{ width: "100%", height: "auto" }} />
          <div>
            <Typography
              variant="h4"
              style={{
                fontWeight: "bold",
                color: "black",
                marginBottom: "16pt",
              }}
            >
              Collaboration
            </Typography>
            <Typography
              style={{
                fontSize: "1.6rem",
                color: "black",
                marginBottom: "8pt",
              }}
            >
              Collaboration is formed from five key facets, <br /> these
              include:
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <span>
              Emotional <br /> Intelligence
            </span>
            <span>Resilience</span>
            <span>Flexibility</span>
            <span>Trust</span>
            <span>Initiative</span>
          </div>
        </div>

        <Button className="btn primarybtn">
          {/* onClick={this.next} */}
          Next
        </Button>
        <Button
          className="btn transparentbtn"
          //   onClick={this.back}
          //   disabled={this.state.isDisabled ? "disabled" : null}
        >
          Back
        </Button>
      </div>
    </div>
  );
}
