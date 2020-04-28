/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Corables source code is free software; you can redistribute it
and/or modify it under the terms of the End-user license agreement.
Coreable's source code is distributed in the hope that it will be
useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
You should have received a copy of the license along with the 
Coreable source code.
===========================================================================
*/

import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";

import { Mutation } from "react-apollo";
import { JOIN_TEAM } from "../../../apollo/mutations";
import "../../ReviewTab/Review.scss";

import globalCSS from "../../../Global.module.scss";

import Navbar from "../../Navbar2/Navbar";

import {
  Typography,
  // Container,
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      inviteCode: "",
      isLoading: true,
      me: props.me,
      steps: ["Self Review", "Team Review", "Final Review"],
    };
  }

  componentDidMount = async () => {
    if (!this.props.me) {
      return false;
    }

    const { me } = this.state;

    let grouped = {};
    for (const team of me.teams) {
      grouped[team._id] = team;
      grouped[team._id].pending = [];
    }

    for (const pending of me.pending) {
      for (const team of pending.teams) {
        if (grouped[team._id]) {
          grouped[team._id].pending.push(pending);
        }
      }
    }

    const joinTeam = {
      _id: "jointeam",
      name: "Join a Team",
      _id: "joinTeam",
      name: "Join a Team",
      pending: [],
      subject: {
        name: "Join a Team",
        state: 0,
      },
    };

    if (!me.teams.length) {
      me.teams.push(joinTeam);
    }
    if (me.teams[me.teams.length - 1]._id !== "joinTeam") {
      me.teams.push(joinTeam);
    }
    me.grouped = grouped;

    // Make sure the joinTeam is always the last card
    me.teams.sort((team) => {
      if (team._id !== "joinTeam") {
        return -1;
      }
      return 1;
    });

    this.setState({
      ...this.state,
      isLoading: false,
      me,
    });
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  getIsValidInviteCode = (inviteCode) => {
    return {
      inviteCode: inviteCode.length <= 0,
    };
  };

  handleChange = (evt) => {
    this.setState({ inviteCode: evt.target.value });
  };

  handleSubmit = (evt) => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return false;
    }
  };

  canBeSubmitted() {
    return !this.isDisabled();
  }

  handleBlur = (field) => {};

  errors = () => {
    return this.getIsValidInviteCode(this.state.inviteCode);
  };

  isDisabled = () => Object.keys(this.errors()).some((x) => this.errors()[x]);

  getReviewButtonState(team_id) {
    if (this.state.isLoading) {
      return false;
    }

    if (this.state.me.grouped[team_id].subject.state === 1) {
      return !this.state.me.pending.some(
        (user) => user._id === this.state.me._id
      );
    }
    return this.state.me.grouped[team_id].pending.lenth === 0;
  }

  getReviewButtonTextColor(team_id) {
    if (this.state.isLoading) {
      return false;
    }
    const isDisabled = this.getReviewButtonState(team_id);
    if (isDisabled) {
      return "rgba(0, 0, 0, 0.26)";
    }
    return "#ffffff";
  }

  getPendingUser(team_id) {
    const isDisabled = this.getReviewButtonState(team_id);
    let data = {};
    if (this.state.me.grouped[team_id].subject.state === 1) {
      data = {
        _id: this.state.me.grouped[team_id]._id,
        name: this.state.me.grouped[team_id].name,
        subject: this.state.me.grouped[team_id].subject,
        pending: [
          !isDisabled
            ? this.state.me.pending.find(
                (user) => user._id === this.state.me._id
              )
            : null,
        ],
      };
    }
    if (this.state.me.grouped[team_id].subject.state !== 1) {
      data = {
        _id: this.state.me.grouped[team_id]._id,
        name: this.state.me.grouped[team_id].name,
        subject: this.state.me.grouped[team_id].subject,
        pending: !isDisabled
          ? this.state.me.pending.filter(
              (user) => user._id !== this.state.me._id
            )
          : null,
      };
    }
    return data;
  }

  render() {
    if (!this.props.me) {
      return <Redirect to="/"></Redirect>;
    }

    const { inviteCode } = this.state;

    if (this.state.isLoading) {
      return (
        <React.Fragment>
          <Navbar
            firstName={this.state.me.firstName}
            lastName={this.state.me.lastName}
          />
          <LinearProgress style={{ top: "37pt" }}></LinearProgress>
        </React.Fragment>
      );
    }

    return (
      <div>
        <Navbar
          firstName={this.state.me.firstName}
          lastName={this.state.me.lastName}
        />
        <div className="review-container">
          <div className="top-background">
            <span
              style={{
                marginBottom: "0",
                fontSize: "20pt",
                fontWeight: "bolder",
              }}
            >
              Your teams{" "}
            </span>
            <p style={{ fontSize: "1.4rem" }}>
              {" "}
              View your teams, review your team, and join teams.
            </p>
          </div>

          <div className="main">
            {this.state.me.teams.map((team, index) => {
              if (team._id !== "joinTeam") {
                return (
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="stretch"
                    spacing={1}
                    className="inside-main"
                    key={index}
                  >
                    <div className="team-card">
                      <h3>UTS Health 80245</h3>
                      <p>{team.name}</p>

                      <Stepper
                        activeStep={team.subject.state - 1}
                        alternativeLabel
                      >
                        {this.state.steps.map((label, index) => {
                          const isDisabled = this.getReviewButtonState(
                            team._id
                          );
                          let props = {};
                          if (isDisabled && index === 0) {
                            props.optional = (
                              <Typography
                                variant="caption"
                                style={{
                                  display: "flex",
                                  justify: "center",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                Completed
                              </Typography>
                            );
                          }
                          return (
                            <Step key={label}>
                              <StepLabel {...props}>{label}</StepLabel>
                            </Step>
                          );
                        })}
                      </Stepper>
                      <Link
                        to={{
                          pathname: "/self-review",
                          state: {
                            team_id: team._id,
                            pending: this.getPendingUser(team._id),
                          },
                        }}
                        // style={{
                        //   textDecoration: "none",
                        //   color: this.getReviewButtonTextColor(team._id),
                        // }}
                      >
                        <Button
                          className={`${globalCSS.btn} btn primarybtn`}
                          disabled={this.getReviewButtonState(team._id)}
                          disableElevation
                        >
                          Start Review
                        </Button>
                      </Link>
                    </div>
                  </Grid>
                );
              }
              return (
                <Grid
                  // item xs={12} md={6} lg={4} key={index}
                  container
                  direction="row"
                  justify="center"
                  alignItems="stretch"
                  spacing={1}
                  className="inside-main"
                  key={index}
                >
                  <Card variant="outlined">
                    <CardContent>
                      <Grid
                        item
                        container
                        direction="row"
                        justify="center"
                        alignItems="stretch"
                      >
                        <Typography variant="h4" component="h2">
                          Join a team
                        </Typography>
                      </Grid>
                      <Grid item>
                        <TextField
                          label="Team Code"
                          placeholder="eg: GHDK0402"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          variant="outlined"
                          name="inviteCode"
                          value={this.state.inviteCode}
                          type="text"
                          required
                          onChange={this.handleChange}
                          onBlur={this.handleBlur("inviteCode")}
                          style={{ marginTop: "8pt" }}
                        />
                      </Grid>
                      <CardActions>
                        <Mutation
                          mutation={JOIN_TEAM}
                          variables={{ inviteCode }}
                          onCompleted={(data) => this._success(data)}
                        >
                          {(mutation) => (
                            <Grid container justify="center">
                              <Button
                                variant="contained"
                                color="primary"
                                disableElevation
                                disabled={this.isDisabled()}
                                onClick={async () => {
                                  this.setState({ isLoading: true });
                                  return await mutation();
                                }}
                              >
                                Join Team
                              </Button>
                            </Grid>
                          )}
                        </Mutation>
                      </CardActions>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
            {/* </Grid>
        </Container> */}
          </div>
        </div>
      </div>
    );
  }

  _success = async (data) => {
    try {
      const me = data.joinTeam.data.user;
      this.setState({
        ...this.state,
        me,
      });
      this.componentDidMount();
    } catch (err) {
      alert(data.joinTeam.errors[0].message);
    }
    this.setState({
      ...this.state,
      isLoading: false,
    });
  };
}

export default Home;
