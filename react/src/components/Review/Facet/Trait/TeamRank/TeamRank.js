import React from "react";
import { Grid, Typography } from "@material-ui/core";

const TeamRank = (props) => {
  const { val } = props;

  return (
    <Grid
      style={{
        border: "none",
        display: "flex",
        alignItems: "center",
        marginLeft: "30px",
        width: "90%",
      }}
    >
      <label
        className="teamRating"
        style={{
          width: `${val * 5}px`,
          background: "rgb(66, 113, 249)",
          height: "12px",
          borderRadius: "4px",
          marginLeft: "5px",
        }}
      ></label>

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
