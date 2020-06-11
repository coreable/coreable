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
import "./Home.scss";

import {
  Typography,
  TextField,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";

import { API_URL } from "../../constants";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      inviteCode: "",
      me: props.app.data.user,
      steps: ["Self Review", "Team Review", "Final Review"],
      loading: true,
      completedTutorial: false,
    };
    console.log(this.state.me["_id"]);
  }

  componentDidMount = async () => {
    this.props.ReactGA.pageview("/home");

    if (!this.props.app.data.user) {
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

  canBeSubmitted = () => {
    return !this.isDisabled();
  };

  handleBlur = (field) => {};

  errors = () => {
    return this.getIsValidInviteCode(this.state.inviteCode);
  };

  isDisabled = () => Object.keys(this.errors()).some((x) => this.errors()[x]);

  getReviewButtonState = (team_id) => {
    if (this.state.loading) {
      return false;
    }
    return this.state.me.grouped[team_id].users.length === 0;
  };

  getReviewButtonTextColor = (team_id) => {
    if (this.state.loading) {
      return false;
    }
    const isDisabled = this.getReviewButtonState(team_id);
    if (isDisabled) {
      return "rgba(0, 0, 0, 0.26)";
    }
    return "#ffffff";
  };

  getPendingUser = (team_id) => {
    const isDisabled = this.getReviewButtonState(team_id);
    let data = {
      _id: this.state.me.grouped[team_id]._id,
      name: this.state.me.grouped[team_id].name,
      subject: this.state.me.grouped[team_id].subject,
      pending: !isDisabled ? this.state.me.grouped[team_id].users : null,
    };
    return data;
  };

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
      `,
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        JWT: this.props.app.JWT,
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
  };

  firstReview = () => {
    if (!localStorage.getItem("hasCompletedTutorial")) {
      localStorage.setItem("hasCompletedTutorial", true);
    } else if (localStorage.getItem("hasCompletedTutorial")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  render() {
    if (!this.props.app.data.user) {
      return <Redirect to="/"></Redirect>;
    }

    /**
     * This is component specific loading and not the me {} query
     * This is the loading while the team cards are being sorted
     */
    if (this.state.loading) {
      return <div></div>;
    }

    return (
      <div>
        <div className="review-container">
          <div className="top-background"></div>
          <div className="main">
            <div className="inside-main">
              <h1>Your teams</h1>
              <p style={{ fontSize: "1.4rem", color: "white" }}>
                View, review and join teams.
              </p>
            </div>
            <div className="grid-home">
              {this.state.me.teams.map((team, index) => {
                if (team._id !== "joinTeam") {
                  return (
                    <div className="grid-card-home" key={index}>
                      <div className="team-card">
                        <h1>{this.capitalize(team.subject.name)}</h1>
                        <p>{this.capitalize(team.name)}</p>

                        <span className="stepper-line"> </span>
                        <Stepper
                          activeStep={team.subject.state - 1}
                          alternativeLabel
                          style={{
                            padding: "25px 0 22px 0",
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
                            // pathname: localStorage.getItem("hasCompletedTutorial")
                            //   ? "/review"
                            //   : "/collaboration",
                            pathname:
                              this.state.me.teams[index].subject.state === 1
                                ? "/intro"
                                : "/collaboration",
                            state: {
                              reviewState: this.state.me.teams[index].subject
                                .state,
                              user_id: this.state.me["_id"],
                              team_id: team._id,
                              pending: this.getPendingUser(team._id),
                            },
                          }}
                        >
                          <button
                            className="btn primarybtn"
                            onClick={this.firstReview}
                            disabled={this.getReviewButtonState(team._id)}
                            disableElevation
                          >
                            Start Review
                          </button>
                        </Link>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="grid-card-home" key={index}>
                    <div className="team-card">
                      <h1>Join team</h1>
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
                        style={{ marginTop: "20pt", paddingBottom: "33px" }}
                      />
                      <button
                        className="btn primarybtn"
                        disabled={this.isDisabled()}
                        onClick={async () => {
                          await this.joinTeam();
                        }}
                      >
                        Join Team
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
