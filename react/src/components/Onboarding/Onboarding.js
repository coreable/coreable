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
  };

  next = () => {
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
  };

  back = () => {
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
  };

  render() {
    let { onboardingNum } = this.state;
    function onboardingSlide() {
      switch (onboardingNum) {
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
    }

    return (
      <div className="team-container">
        <div className="top"></div>
        <div className="main">
          <div className="step-progress-bar"></div>
          {onboardingSlide()}

          <Button className="btn primarybtn" onClick={this.next}>
            Next
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
