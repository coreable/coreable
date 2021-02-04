import React from "react";
import Stepper from "./Stepper";
import { Link } from "react-router-dom";
import { Button, ReviewCardContainer } from "./reviewCard-style";
import { SubTitle } from "./home-style";

const ReviewCard = (props) => {
  const team = props.team;
  const nameLength = team.tutorial.subject.name.length;
  const fontSize = (nameLength) => {
    if (nameLength > 15) {
      return { fontSize: "2.0rem" };
    } else {
      return { fontSize: "3.2rem" };
    }
  };

  return (
    <ReviewCardContainer>
      <h1 style={fontSize(nameLength)}>
        {props.capitalize(team.tutorial.subject.name)}
      </h1>
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
