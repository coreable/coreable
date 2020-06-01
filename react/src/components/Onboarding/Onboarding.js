import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";

import "./Onboarding.scss";
import Why from "./Why/Why";
import What from "./What/What";
import How from "./How/How";

class Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onboardingNum: 1,
      isDisabled: true,
      onboardingTitle: ["Why Coreable?", "What are Facets and Traits?"],
      startButton: "Next",
      team_id: this.props.location.state.team_id,
      pending: this.props.location.state.pending,
    };
  }

  next = () => {
    //stepper
    const bullets = [...document.querySelectorAll(".bullet")];

    if (this.state.onboardingNum === 1) {
      bullets[1].classList.add("teel");
    }

    if (this.state.onboardingNum === 2) {
      bullets[2].classList.add("green");
      this.setState({
        startButton: "Start",
      });
    }

    if (this.state.onboardingNum < 3) {
      this.setState({
        onboardingNum: this.state.onboardingNum + 1,
      });
      if (this.state.onboardingNum >= 1) {
        this.setState({
          isDisabled: false,
        });
      }
    } else {
      this.props.history.push({
        pathname: "/review",
        state: {
          team_id: this.state.team_id,
          pending: this.state.pending,
        },
      });
    }

    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
  };

  back = () => {
    //stepper
    const bullets = [...document.querySelectorAll(".bullet")];

    if (this.state.onboardingNum === 3) {
      bullets[2].classList = "bullet";
      this.setState({
        startButton: "Next",
      });
    }

    if (this.state.onboardingNum === 2) {
      bullets[1].classList = "bullet";
    }

    if (this.state.onboardingNum > 1) {
      this.setState({
        onboardingNum: this.state.onboardingNum - 1,
      });
      if (this.state.onboardingNum <= 2) {
        this.setState({
          isDisabled: true,
        });
      }
    } else {
      return;
    }
    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
  };

  onboardingTitle = () => {
    if (this.state.onboardingNum === 1) {
      return (
        <Typography variant="h3" style={{ fontWeight: "bold", color: "white" }}>
          {this.state.onboardingTitle[0]}
        </Typography>
      );
    } else if (this.state.onboardingNum >= 2) {
      return (
        <Typography variant="h3" style={{ fontWeight: "bold", color: "white" }}>
          {this.state.onboardingTitle[1]}
        </Typography>
      );
    }
  };

  onboardingSlide = (slideNum) => {
    switch (slideNum) {
      case 1:
        return <Why />;
      case 2:
        return <What />;
      case 3:
        return <How />;
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="team-container">
        <div className="top"></div>
        <div className="main">
          {this.onboardingTitle()}
          <div className="grid">
            <div className="grid-card">
              <div className="step-progress-bar">
                <div className="steps">
                  <div className="bullet done"></div>
                  <div className="bullet"></div>
                  <div className="bullet"></div>
                </div>
              </div>
              {this.onboardingSlide(this.state.onboardingNum)}
            </div>
          </div>
          <div className="btn-grid">
            <div className="btn-grid-card">
              <Button className="btn primarybtn" onClick={this.next}>
                {this.state.startButton}
              </Button>
              <Button
                className="btn transparentbtn"
                onClick={this.back}
                disabled={this.state.isDisabled ? "disabled" : null}
              >
                Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Onboarding;
