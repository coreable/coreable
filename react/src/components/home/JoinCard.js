import React from "react";
import Stepper from "./Stepper";
import { Link } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { Button, ReviewCardContainer } from "./reviewCard-style";
import { SubTitle } from "./home-style";

const JoinCard = (props) => {
  return (
    <ReviewCardContainer>
      <h1>Join team</h1>
      <SubTitle fontSize={"1.4"}>Enter your team code below</SubTitle>
      <TextField
        label="Team Code"
        placeholder="eg: Team 1"
        fullWidth
        margin="normal"
        InputLabelProps={{ style: { fontSize: 12 } }}
        variant="outlined"
        name="inviteCode"
        value={props.value}
        type="text"
        onChange={props.onChange}
        onBlur={props.onBlur}
        onKeyPress={props.onKeyPress}
        style={{ background: "#F7F9FC" }}
      />
      <Button disabled={props.disabled} onClick={props.onClick}>
        Join Team
      </Button>
    </ReviewCardContainer>
  );
};

export default JoinCard;
