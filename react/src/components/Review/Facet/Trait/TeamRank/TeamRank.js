import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "./TeamRank.scss";

const TeamRank = (props) => {
  const { val, user, value } = props;

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (val === -1 || val === 0) {
    return null;
  }

  //need this if conditon to not show bar if doing self review
  if (props.teamMemberCount === 1) {
    return null;
  } else {
    return (
      <Grid className="team-rank-container">
        <label
          className="team-rating"
          style={{
            width: `${val * 4.7}px`,
            backgroundImage:
              "linear-gradient(to right, #4070e0, #0096f8, #00b3e5, #00c8b3, #2dd775)",
          }}
        ></label>

        <Typography
          variant="caption"
          style={{
            marginLeft: "5px",
            paddingBottom: "5px",
            marginTop: "2px",
          }}
        >
          {capitalize(user.firstName)}
        </Typography>
      </Grid>
    );
  }
};

export default TeamRank;
