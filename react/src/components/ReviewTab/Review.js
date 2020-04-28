import React, { Component } from "react";
import "./Review.scss";
import global from "../../global.module.scss";
import {
  Typography,
  Container,
  Button,
  TextField,
  Card,
  CardContent,
  Grid,
  CardActions,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
} from "@material-ui/core";

export class Review extends Component {
  render() {
    return (
      <div
        style={{
          margin: "auto",
          // paddingTop: "200px",
        }}
      >
        <div className="review-container">
          <div className="top-background">
            <h1 style={{ margin: "0" }}>Your teams </h1>
            <p style={{ fontSize: "1.4rem" }}>
              {" "}
              View your teams, review your team, and join teams.
            </p>
          </div>

          <div className="main">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="stretch"
              spacing={1}
              className="inside-main"
            >
              <div className="team-card">
                <h3>UTS Health 80245</h3>
                <p>Team Yellow</p>
              </div>

              <Button
                className={`${global.btn} ${global.primarybtn}`}
                disableElevation
              >
                Start Review
              </Button>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="stretch"
              spacing={1}
              className="inside-main"
            >
              <div className="team-card">
                <h3>Join a team</h3>
                <p>Use your team code below</p>
              </div>

              <Button
                className={`${global.btn} ${global.primarybtn} fixed`}
                disableElevation
              >
                Join team
              </Button>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default Review;
