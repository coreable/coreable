import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

import "./Collaboration.scss";
import img from "./welcome.png";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      team_id: this.props.location.state.team_id,
      pending: this.props.location.state.pending,
    };
  }

  render() {
    console.log(this.state.pending);
    return (
      <div className="team-container">
        <div className="top"></div>
        <div className="main-welcome">
          <h1 style={{ color: "white" }}>Welcome to Collaboration</h1>
          <div className="inside-main">
            <img
              src={img}
              style={{ width: "100%", height: "auto" }}
              alt="welcome"
            />
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

          <Link
            to={{
              pathname: "/review",
              state: {
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
              pathname: "/home",
            }}
          >
            <Button className="btn transparentbtn">Back</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Welcome;
