import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import {
  OnboardingContainer,
  Content,
  Card,
  ButtonContainer,
  Button,
} from "./onboarding-style";

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
      reviewState: this.props.location.state.reviewState,
      user_id: this.props.location.state.user_id,
      team_id: this.props.location.state.team_id,
      pending: this.props.location.state.pending,
    };
  }

  next = () => {
    if (this.state.onboardingNum === 2) {
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
          reviewState: this.state.reviewState,
          user_id: this.state.user_id,
          team_id: this.state.team_id,
          pending: this.state.pending,
        },
      });
    }
  };

  back = () => {
    if (this.state.onboardingNum === 3) {
      this.setState({
        startButton: "Next",
      });
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
      <OnboardingContainer>
        <Content>
          <Card>{this.onboardingSlide(this.state.onboardingNum)}</Card>
          <ButtonContainer>
            <Button backgroundColor={"primary"} onClick={this.next}>
              {this.state.startButton}
            </Button>
            <Button
              backgroundColor={"secondary"}
              onClick={this.back}
              disabled={this.state.isDisabled ? "disabled" : null}
            >
              Back
            </Button>
          </ButtonContainer>
        </Content>
      </OnboardingContainer>
    );
  }
}

export default Onboarding;
