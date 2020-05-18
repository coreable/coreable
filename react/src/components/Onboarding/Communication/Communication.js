import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { Redirect, Link } from "react-router-dom";

import "./Communication.scss";
import img from "./Communication.png";

class Communication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: this.props.location.state.currentIndex,
      pending: this.props.location.state.pending,
      // nextStep: this.props.location.state.nextStep,
      // prevStep: this.props.location.state.prevStep,
    };
    console.log(this.state.currentIndex);
  }

  render() {
    return (
      <div className="team-container">
        <div className="top"></div>
        <div className="main-welcome">
          <Typography
            variant="h3"
            style={{ fontWeight: "bold", color: "white" }}
          >
            Welcome to Communication
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
                Communication
              </Typography>
              <Typography
                style={{
                  fontSize: "1.6rem",
                  color: "black",
                  marginBottom: "8pt",
                }}
              >
                Communication is formed from four key facets, <br /> these
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
              <span>Clarity</span>
              <span>Culture</span>
              <span>Non Verbal</span>
              <span>
                Verbal <br /> Attentiveness
              </span>
            </div>
          </div>

          <Link
            to={{
              pathname: "/review",
              state: {
                index: 5,
                team_id: this.state.team_id,
                pending: this.state.pending,
              },
            }}
          >
            <Button
              className="btn primarybtn"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Next
            </Button>
          </Link>

          <Link
            to={{
              pathname: "/review",
              state: {
                index: this.state.currentIndex,
                team_id: this.state.team_id,
                pending: this.state.pending,
              },
            }}
          >
            <Button
              className="btn transparentbtn"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Back
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Communication;
