import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "./TeamRank.scss";

const TeamRank = (props) => {
  const { val } = props;

  return (
    <Grid className="team-rank-container">
      <label className="team-rating" style={{ width: `${val * 5}px` }}></label>

      {val <= 0 ? null : (
        <Typography
          variant="caption"
          style={{ marginLeft: "5px", paddingBottom: "5px" }}
        >
          {props.name}
        </Typography>
      )}
    </Grid>
  );
};

export default TeamRank;
