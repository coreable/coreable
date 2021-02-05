import React from "react";
import Stepper from "./Stepper";
import { Link } from "react-router-dom";
import { Button, ReviewCardContainer } from "./reviewCard-style";
import { SubTitle, Title } from "./home-style";

const ReviewCard = (props) => {
  const team = props.team;
  const nameLength = team.tutorial.subject.name.length;
  const fontSize = (nameLength) => {
    if (nameLength > 15) {
      return "2.0";
    } else {
      return "3.2rem";
    }
  };

  return (
    <ReviewCardContainer>
      <Title fontSize={fontSize(nameLength)}>
        {props.capitalize(team.tutorial.subject.name)}
      </Title>
      <SubTitle fontSize={"1.4"}>{props.capitalize(team.name)}</SubTitle>
      <Stepper reviewState={team.tutorial.subject.state} />

      <Link
        to={{
          pathname: props.teamSubjectState === 1 ? "/intro" : "/collaboration",
          state: {
            reviewState: props.reviewState,
            user_id: props.user_id,
            team_id: team._id,
            pending: props.pending,
          },
        }}
      >
        <Button
          className="btn primarybtn"
          onClick={props.onClick}
          disabled={props.disabled}
          disableElevation
        >
          Start Review
        </Button>
      </Link>
    </ReviewCardContainer>
  );
};

export default ReviewCard;
