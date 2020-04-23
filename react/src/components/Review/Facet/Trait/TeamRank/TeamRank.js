import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "./TeamRank.scss";

const TeamRank = (props) => {
  const { val, teamMemberCount } = props;

  if (val <= 0 || teamMemberCount === 1) {
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
          {props.name}
        </Typography>
      </Grid>
    );
  }
};

export default TeamRank;
