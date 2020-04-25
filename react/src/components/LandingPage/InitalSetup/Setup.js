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
import { JWT } from "../../../constants";
import { JOIN_TEAM } from "../../../apollo/mutations";
import "./Setup.scss";

import Navbar from "../../Navbar/Navbar";
import Backdrop from "../../Backdrop/Backdrop";
import SideDrawer from "../../Sidedrawer/SideDrawerV2";
import { Toolbar } from "../../Toolbar/Toolbar";

import UseOutsideClicker from "../../Hooks/OutsideClick";

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

class Setup extends Component {
  constructor() {
    super();

    // TODO: move to props
    const AUTH_TOKEN = localStorage.getItem(JWT);

    this.state = {
      sideDrawerOpen: false,
      inviteCode: "",
      isLoading: true,
      loggedIn: !!AUTH_TOKEN,
      me: {
        teams: [],
      },
      steps: ["Self Review", "Team Review", "Final Review"],
    };

    if (this.state.loggedIn) {
      const query = {
        query: `
          query {
            me {
              data {
                user {
                  _id
                  firstName
                  lastName
                  teams {
                    _id
                    name
                    subject {
                      _id
                      name
                      state
                    }
                  }
                  pending {
                    _id
                    firstName
                    lastName
                    teams {
                      _id
                      name
                      subject {
                        _id
                        name
                        state
                      }
                    }
                  }
                }
              }
              errors {
                code
                path
                message
              }
            }
          }
        `,
      };

      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          JWT: AUTH_TOKEN,
        },
        body: JSON.stringify(query),
      };

      fetch("https://coreable.appspot.com/graphql", options).then(
        async (data) => {
          let me = await data.json();
          try {
            me = me.data.me.data.user;
          } catch (err) {
            localStorage.removeItem(JWT);
            this.setState({
              ...this.state,
              loggedIn: false,
            });
            return false;
          }

          let grouped = {};
          for (let team of me.teams) {
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

          me.teams.push("jointeam");
          me.grouped = grouped;

          this.setState({
            ...this.state,
            isLoading: false,
            me,
          });
        }
      );
    }
  }

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
    let backDrop;

    if (this.state.sideDrawerOpen) {
      backDrop = <Backdrop click={this.backdropClickHandler} />;
    }

    if (!this.state.loggedIn) {
      return <Redirect to="/"></Redirect>;
    }

    const { inviteCode } = this.state;

    if (this.state.isLoading) {
      return <LinearProgress style={{ top: "12pt" }}></LinearProgress>;
    }

    return (
      <div>
        <Navbar
          firstName={this.state.me.firstName}
          lastName={this.state.me.lastName}
          show={this.state.sideDrawerOpen}
          click={this.backdropClickHandler}
        />
        {backDrop}
        <Container
          maxWidth="lg"
          style={{ height: "95.25vh", paddingTop: "90px" }}
          className="setup-container"
        >
          {/* <div className="navBar">
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
          <main style={{ marginTop: "48px" }}>
            <SideDrawer
              show={this.state.sideDrawerOpen}
              click={this.backdropClickHandler}
            />
            {backDrop}
          </main>
        </div> */}

          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={2}
          >
            {this.state.me.teams.map((team, index) => {
              if (team !== "jointeam") {
                return (
                  <Grid item xs={12} md={6} lg={4} key={index}>
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
                            {team.name}
                          </Typography>
                        </Grid>
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
                      </CardContent>
                      <CardActions>
                        <Grid container justify="center">
                          <Button
                            className="start-review"
                            variant="contained"
                            color="primary"
                            disabled={this.getReviewButtonState(team._id)}
                            disableElevation
                          >
                            <Link
                              to={{
                                pathname: "/self-review",
                                state: {
                                  team_id: team._id,
                                  pending: this.getPendingUser(team._id),
                                },
                              }}
                              style={{
                                textDecoration: "none",
                                color: this.getReviewButtonTextColor(team._id),
                              }}
                            >
                              Start Review
                            </Link>
                          </Button>
                        </Grid>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              } else if (team === "jointeam") {
                return (
                  <Grid item xs={12} md={6} lg={4} key={index}>
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
              } else {
                return <Redirect to="/"></Redirect>;
              }
            })}
          </Grid>
        </Container>
      </div>
    );
  }

  _success = async (data) => {
    try {
      const me = data.joinTeam.data.user;
      me.teams.push("jointeam");
      this.setState({
        ...this.state,
        me,
      });
    } catch (err) {
      alert(data.joinTeam.errors[0].message);
    }
    this.setState({
      ...this.state,
      isLoading: false,
    });
  };
}

export default Setup;
