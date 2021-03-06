/*
===========================================================================
Copyright (C) 2020 Coreable
This file is part of Coreable's source code.
Coreables source code is free software; you can redistribute it
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

import Stepper from "./Stepper";

import { TextField } from "@material-ui/core";

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
  }

  componentDidMount = async () => {
    this.props.ReactGA.pageview("/home");
    if (!this.props.app.data.user) {
      return false;
    }
    const { me } = this.state;
    const joinTeam = {
      _id: "joinTeam",
      name: "Join a Team",
      pending: [],
      subject: {
        name: "Join a Team",
        state: 0,
      },
    };
    if (!me.team.length || me.team[me.team.length - 1]._id !== "joinTeam") {
      me.team.push(joinTeam);
    }

    // Make sure the joinTeam is always the last card
    me.team.sort((a, b) => {
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

    for (const pending of me.pending) {
      if (pending.user.length > 0) {
        for (let i = 0; i < me.team.length; i++) {
          if (me.team[i]._id === pending._id) {
            me.team[i].pending = pending.user;
          }
        }
      }
    }

    const teamMap = {};
    for (const team of me.team) {
      teamMap[team._id] = team;
    }

    me.teamMap = teamMap;

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

  // backdropClickHandler = () => {
  //   this.setState({ sideDrawerOpen: false });
  // };

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
    try {
      return this.state.me.teamMap[team_id].pending.length === 0;
    } catch {
      return true;
    }
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
      _id: this.state.me.teamMap[team_id]._id,
      name: this.state.me.teamMap[team_id].name,
      tutorial: this.state.me.teamMap[team_id].tutorial,
      pending: !isDisabled ? this.state.me.teamMap[team_id].pending : null,
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

  ReviewCardHandler = (e) => {
    // function firstReview() {
    if (!localStorage.getItem("hasCompletedTutorial")) {
      localStorage.setItem("hasCompletedTutorial", true);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (localStorage.getItem("hasCompletedTutorial")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // }
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
      <div className="review-container">
        <PageHeading />
        <div className="main">
          <div className="grid-home">
            {this.state.me.team.map((team, index) => {
              if (!team._id) {
                return null;
              }
              if (team._id !== "joinTeam") {
                return (
                  <ReviewCard
                    team={team}
                    key={index}
                    onClick={this.ReviewCardHandler}
                    capitalize={this.capitalize}
                    disabled={this.getReviewButtonState(team._id)}
                    teamSubjectState={
                      this.state.me.teamMap[team._id].tutorial.subject.state
                    }
                    reviewState={
                      this.state.me.teamMap[team._id].tutorial.subject.state
                    }
                    user_id={this.state.me["_id"]}
                    pending={this.getPendingUser(team._id)}
                  />
                );
              }
              return (
                <JoinCard
                  key={index}
                  value={this.state.inviteCode}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur("inviteCode")}
                  onKeyPress={async (e) => {
                    if (e.key === "Enter") {
                      await this.joinTeam();
                    }
                  }}
                  disabled={this.isDisabled()}
                  onClick={async () => {
                    await this.joinTeam();
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const PageHeading = () => {
  return (
    <div className="top-background">
      <h1>Your teams</h1>
      <p style={{ fontSize: "1.4rem", color: "white" }}>
        View, review and join teams.
      </p>
    </div>
  );
};

const ReviewCard = (props) => {
  const team = props.team;
  const nameLength = team.tutorial.subject.name.length;
  const fontSize = (nameLength) => {
    if (nameLength > 15) {
      return { fontSize: "2.0rem" };
    } else {
      return { fontSize: "3.2rem" };
    }
  };

  return (
    <div className="grid-card-home">
      <div className="team-card">
        <h1 style={fontSize(nameLength)}>
          {props.capitalize(team.tutorial.subject.name)}
        </h1>
        <p>{props.capitalize(team.name)}</p>
        <Stepper reviewState={team.tutorial.subject.state} />

        <Link
          to={{
            pathname:
              props.teamSubjectState === 1 ? "/intro" : "/collaboration",
            state: {
              reviewState: props.reviewState,
              user_id: props.user_id,
              team_id: team._id,
              pending: props.pending,
            },
          }}
        >
          <button
            className="btn primarybtn"
            onClick={props.onClick}
            disabled={props.disabled}
            disableElevation
          >
            Start Review
          </button>
        </Link>
      </div>
    </div>
  );
};

const JoinCard = (props) => {
  return (
    <div className="grid-card-home">
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
          value={props.value}
          type="text"
          onChange={props.onChange}
          onBlur={props.onBlur}
          onKeyPress={props.onKeyPress}
          style={{ background: "#F7F9FC" }}
        />
        <button
          className="btn primarybtn"
          disabled={props.disabled}
          onClick={props.onClick}
        >
          Join Team
        </button>
      </div>
    </div>
  );
};

export default Home;
