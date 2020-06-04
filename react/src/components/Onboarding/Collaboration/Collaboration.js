import React, { Component } from "react";
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
    return (
      <div className="team-container">
        <div className="top"></div>
        <div className="main-welcome">
          <h1 style={{ color: "white" }}>Welcome to Collaboration</h1>
          <div className="grid">
            <div className="grid-card">
              <div className="inside-main">
                <img
                  src={img}
                  style={{ width: "100%", height: "auto" }}
                  alt="Collaborating"
                />
                <div>
                  <h1 style={{ marginBottom: "16pt" }}>Collaboration</h1>
                  <p style={{ marginBottom: "8pt" }}>
                    Collaboration is formed from five key facets, <br /> these
                    include:
                  </p>
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
            </div>
          </div>

          <div className="btn-container">
            <Link
              to={{
                pathname: "/review",
                state: {
                  team_id: this.state.team_id,
                  pending: this.state.pending,
                },
              }}
            >
              <button
                className="btn primarybtn"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Next
              </button>
            </Link>

            <Link
              to={{
                pathname: "/home",
              }}
            >
              <button className="btn transparentbtn">Back</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
