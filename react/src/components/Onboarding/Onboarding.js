import React, { Component } from "react";
import { Button, Typography } from "@material-ui/core";

import "./Onboarding.scss";
import Why from "./Why/Why";
import What from "./What/What";
import How from "./How/How";

class Onboarding extends Component {
  state = {
    onboardingNum: 1,
    isDisabled: true,
    onboardingTitle: ["Why Coreable?", "What are Facets and Traits?"],
    startButton: "Next",
  };

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
      return;
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
        break;
      case 2:
        return <What />;
        break;
      case 3:
        return <How />;
        break;
      default:
        break;
    }
  };

  render() {
    const bullets = [...document.querySelectorAll(".bullet")];

    return (
      <div className="team-container">
        <div className="top"></div>
        <div className="main">
          {this.onboardingTitle()}
          <div className="inside-main">
            <div className="step-progress-bar">
              <div className="steps">
                <div className="bullet done"></div>
                <div className="bullet"></div>
                <div className="bullet"></div>
              </div>
            </div>
            {this.onboardingSlide(this.state.onboardingNum)}
          </div>

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
    );
  }
}

export default Onboarding;
