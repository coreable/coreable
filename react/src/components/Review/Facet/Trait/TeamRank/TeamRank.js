import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "./TeamRank.scss";

const TeamRank = (props) => {
  const { val, user } = props;

  if (val === -1) {
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
          style={{ width: `${val * 4}px` }}
        ></label>

        <Typography
          variant="caption"
          style={{
            marginLeft: "5px",
            paddingBottom: "5px",
            marginTop: "2px",
          }}
        >
          {user.firstName}
        </Typography>
      </Grid>
    );
  }
};

export default TeamRank;
