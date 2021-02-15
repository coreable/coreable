import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  OnboardingContainer,
  Content,
  Card,
  ButtonContainer,
  Button,
} from "./onboarding-style";

const Onboarding = (props) => {
  let history = useHistory();

  const [slideCounter, setSlideCounter] = useState(0);
  const [reviewState, setReviewState] = useState(
    props.location.state.reviewState
  );
  const [user_id, setUser_id] = useState(props.location.state.user_id);
  const [team_id, setTeam_id] = useState(props.location.state.team_id);
  const [pending, setPending] = useState(props.location.state.pending);
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
    setSlideCounter(slideCounter++);
  };

  return (
    <OnboardingContainer>
      <Content>
        <Card></Card>
        <ButtonContainer>
          <Button backgroundColor={"primary"} onClick={next}></Button>
        </ButtonContainer>
      </Content>
    </OnboardingContainer>
  );
};

export default Onboarding;
