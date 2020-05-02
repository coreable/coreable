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

import "../../ReviewTab/Review.scss";

import globalCSS from "../../../global.scss";

import {
  Typography,
  Button,
  TextField,
  Grid,
  Stepper,
  Step,
  StepLabel
} from "@material-ui/core";

import { JWT, API_URL } from "../../../constants";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      inviteCode: "",
      me: props.me,
      steps: ["Self Review", "Team Review", "Final Review"],
      loading: true,
    };
  }

  componentDidMount = async () => {
    if (!this.props.me) {
      return false;
    }

    let grouped = {};
    const { me } = this.state;

    for (const team of me.pending) {
      grouped[team._id] = team;
    }

    const joinTeam = {
      _id: "joinTeam",
      name: "Join a Team",
      pending: [],
      subject: {
        name: "Join a Team",
        state: 0,
      }
    };

    if (!me.teams.length) {
      me.teams.push(joinTeam);
    }
    if (me.teams[me.teams.length - 1]._id !== "joinTeam") {
      me.teams.push(joinTeam);
    }

    me.grouped = grouped;

    // Make sure the joinTeam is always the last card
    me.teams.sort((a, b) => {
      if (a._id === "joinTeam") {
        return 1;
      }
      if (b._id === "joinTeam") {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    this.setState({
      ...this.state,
      loading: false,
      me
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

  canBeSubmitted = () => {
    return !this.isDisabled();
  }

  handleBlur = (field) => { };

  errors = () => {
    return this.getIsValidInviteCode(this.state.inviteCode);
  };

  isDisabled = () => Object.keys(this.errors()).some((x) => this.errors()[x]);

  getReviewButtonState = (team_id) => {
    if (this.state.loading) {
      return false;
    }
    return this.state.me.grouped[team_id].users.length === 0;
  }

  getReviewButtonTextColor = (team_id) => {
    if (this.state.loading) {
      return false;
    }
    const isDisabled = this.getReviewButtonState(team_id);
    if (isDisabled) {
      return "rgba(0, 0, 0, 0.26)";
    }
    return "#ffffff";
  }

  getPendingUser = (team_id) => {
    const isDisabled = this.getReviewButtonState(team_id);
    let data = {
      _id: this.state.me.grouped[team_id]._id,
      name: this.state.me.grouped[team_id].name,
      subject: this.state.me.grouped[team_id].subject,
      pending: !isDisabled ? this.state.me.grouped[team_id].users : null,
    };
    return data;
  }

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  joinTeam = async () => {
    const query = {
      query: `
        mutation {
          joinTeam(inviteCode: "${this.state.inviteCode}") {
            data {
              user {
                _id
              }
            }
            errors {
              code
              path
              message
            }
          }
        }
      `
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        JWT: localStorage.getItem(JWT),
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(API_URL, options).then((data) => data.json());
    const { data, errors } = res.data.joinTeam;

    if (errors) {
      console.error(errors);
      alert(errors[0].message);
    }

    if (data) {
      this.props.refreshMe();
    }
  }

  render() {
    if (!this.props.me) {
      return <Redirect to="/"></Redirect>;
    }

    if (this.state.loading) {
      return (<div></div>);
    }

    return (
      <div>
        <div className="review-container">
          <div className="top-background">
            <Typography
              variant="h2"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Your teams
            </Typography>
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
                      <Typography variant="h3" style={{ fontWeight: "bold" }}>
                        {this.capitalize(team.subject.name)}
                      </Typography>

                      <p>{this.capitalize(team.name)}</p>

                      <span className="stepper-line"> </span>
                      <Stepper
                        activeStep={team.subject.state - 1}
                        alternativeLabel
                        style={{
                          padding: "18px 0 22px 0",
                          position: "relative",
                        }}
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
                          pathname: "/review",
                          state: {
                            team_id: team._id,
                            pending: this.getPendingUser(team._id),
                          },
                        }}
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
                  container
                  direction="row"
                  justify="center"
                  alignItems="stretch"
                  spacing={1}
                  className="inside-main"
                  key={index}
                >
                  <div className="team-card">
                    <Typography variant="h3" style={{ fontWeight: "bold" }}>
                      Join team
                    </Typography>

                    <p>Enter your team code below</p>

                    <TextField
                      label="Team Code"
                      placeholder="eg: Team 1"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ style: { fontSize: 12 } }}
                      variant="outlined"
                      name="inviteCode"
                      value={this.state.inviteCode}
                      type="text"
                      onChange={this.handleChange}
                      onBlur={this.handleBlur("inviteCode")}
                      onKeyPress={async (e) => {
                        if (e.key === "Enter") {
                          await this.joinTeam();
                        }
                      }}
                      style={{ marginTop: "8pt", paddingBottom: "15px" }}
                    />
                    <Button
                      className="btn primarybtn"
                      disabled={this.isDisabled()}
                      onClick={async () => {
                        await this.joinTeam();
                      }}>Join Team</Button>
                  </div>
                </Grid>
              );
            })}
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
      alert("Unable to locate a team with that code");
    }
    this.setState({
      ...this.state,
      isLoading: false
    });
  };
}

export default Home;
