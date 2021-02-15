import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  OnboardingContainer,
  Content,
  Card,
  ButtonContainer,
  Button,
} from "./onboarding-style";
import OnboardingSlides from "./OnboardingSlides";

const Onboarding = (props) => {
  let history = useHistory();

  const [slideCounter, setSlideCounter] = useState(0);
  const reviewState = props.location.state.reviewState;

  const user_id = props.location.state.user_id;
  const team_id = props.location.state.team_id;
  const pending = props.location.state.pending;
  const onboardingTitle = ["Why use Coreable?", "What are Facets and Traits?"];

  const next = () => {
    if (slideCounter === 2) {
      return history.push({
        pathname: "/review",
        state: {
          reviewState: reviewState,
          user_id: user_id,
          team_id: team_id,
          pending: pending,
        },
      });
    }
    setSlideCounter(slideCounter + 1);
  };

  return (
    <OnboardingContainer>
      <Content>
        <OnboardingSlides slideCounter={slideCounter} />
        <ButtonContainer>
          <Button backgroundColor={"primary"} onClick={next}></Button>
        </ButtonContainer>
      </Content>
    </OnboardingContainer>
  );
};

export default Onboarding;
