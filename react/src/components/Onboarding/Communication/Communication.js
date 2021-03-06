import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../Collaboration/Collaboration.scss";
import img from "./Communication.png";

class Communication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewState: this.props.location.state.reviewState,
      user_id: this.props.location.state.user_id,
      currentIndex: this.props.location.state.currentIndex,
      pending: this.props.location.state.pending,
    };
  }

  render() {
    return (
      <div className="team-container">
        <div className="top">
          <h1 style={{ color: "white" }}>Welcome to Communication</h1>
        </div>
        <div className="main-welcome">
          <div className="grid">
            <div className="grid-card">
              <div className="inside-main">
                <img
                  src={img}
                  style={{ width: "100%", height: "auto" }}
                  alt="Communication"
                />
                <div>
                  <h1 style={{ marginBottom: "16pt" }}>Communication</h1>
                  <p style={{ marginBottom: "8pt" }}>
                    Communication is formed from four key facets, <br /> these
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
                  <span>Clarity</span>
                  <span>Culture</span>
                  <span>Non Verbal</span>
                  <span>
                    Verbal <br /> Attentiveness
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="btn-container">
            <Link
              to={{
                pathname: "/review",
                state: {
                  index: 5,
                  reviewState: this.state.reviewState,
                  user_id: this.state.user_id,
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
                pathname: "/review",
                state: {
                  index: this.state.currentIndex,
                  reviewState: this.state.reviewState,
                  user_id: this.state.user_id,
                  team_id: this.state.team_id,
                  pending: this.state.pending,
                },
              }}
            >
              <button
                className="btn transparentbtn"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
              >
                Back
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Communication;
