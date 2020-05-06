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
import Ranking from "./Ranking/Ranking";
import TeamRank from "./TeamRank/TeamRank";

import { Typography, CardActions, Button } from "@material-ui/core";

class Trait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      var: props.var,
      val: props.val,
      desc: props.desc,
      user: {},
      team: props.pending,
    };
  }

  componentDidUpdate() {
    if (this.state.var !== this.props.var) {
      const props = this.props;
      this.setState({
        ...this.state,
        var: props.var,
        val: props.val,
        desc: props.desc,
        user: {},
      });
    }
  }

  setReview = (review) => {
    localStorage.setItem("review", JSON.stringify(review));
  };

  getReview = () => {
    const review = JSON.parse(localStorage.getItem("review"));

    const team_id = this.state.team._id;
    const user_id = this.state.user._id;
    const trait = this.state.var;

    if (!review[team_id]) {
      review[team_id] = {};
    }
    if (!review[team_id][user_id]) {
      review[team_id][user_id] = {};
    }
    if (!review[team_id][user_id][trait]) {
      review[team_id][user_id][trait] = {
        val: -1,
        touched: false,
      };
    }

    return review;
  };

  getButtonStyles = (user) => {
    const team_id = this.state.team._id;
    const user_id = user._id;
    const trait = this.state.var;

    // Component has just loaded
    if (!this.state.user._id) {
      return {
        background: "rgba(0, 0, 0, 0.12)",
        color: "rgba(0, 0, 0, 0.26)",
      };
    }

    const review = this.getReview();

    let styles = {};

    // Active user
    if (this.state.user._id === user._id) {
      styles.backgroundImage = `linear-gradient(90deg, rgb(66, 113, 249) ${this.state.val}%, rgb(214, 214, 214) ${this.state.val}%)`;
      styles.color = "#fff";
    }

    // Inactive user
    if (this.state.user._id !== user._id) {
      styles.background = "rgba(0, 0, 0, 0.12)";
      styles.color = "rgba(0, 0, 0, 0.26)";
      try {
        if (
          review[team_id][user_id][trait].touched &&
          review[team_id][user_id][trait].val === -1
        ) {
          styles.border = "1px solid red";
        }
      } catch (err) {
        // ignore
      }
    }

    return styles;
  };

  updateUserTouchedProperty = (user, review) => {
    const team_id = this.state.team._id;
    const user_id = user._id;
    const trait = this.state.var;
    review[team_id][user_id][trait].touched = true;
    return review;
  };

  handleSelectedUserChange = (user) => {
    this.setState(
      {
        ...this.state,
        user,
      },
      () => {
        const review = this.updateUserTouchedProperty(user, this.getReview());
        const team_id = this.state.team._id;
        const user_id = this.state.user._id;
        const trait = this.state.var;
        this.setState(
          {
            ...this.state,
            val: review[team_id][user_id][trait].val,
          },
          () => {
            this.setReview(review);
          }
        );
      }
    );
  };

  handleSliderChange = (e) => {
    const team_id = this.state.team._id;
    const user_id = this.state.user._id;
    const trait = this.state.var;

    try {
      const val = e.target.value;
      this.setState(
        {
          ...this.state,
          val,
        },
        () => {
          const review = this.getReview();
          review[team_id][user_id][trait].val = val;
          this.setReview(review);
          this.props.sliderUpdatedHandler();
        }
      );
    } catch (err) {
      // ignore
    }
  };

  getSliderBackground = () => {
    const user_id = this.state.user._id;
    if (!user_id) {
      return `linear-gradient(90deg, rgb(66, 113, 249) 0%, rgb(214, 214, 214) 0%)`;
    } else {
      return `linear-gradient(90deg, rgb(66, 113, 249) ${this.state.val}%, rgb(214, 214, 214) ${this.state.val}%)`;
    }
  };

  getScoreForDisplay = (user) => {
    const review = this.getReview();

    const team_id = this.state.team._id;
    const user_id = user._id;
    const trait = this.state.var;

    let val;
    try {
      val = review[team_id][user_id][trait].val;
    } catch (err) {
      val = 0;
    }

    return {
      val,
      user,
    };
  };

  countTeam = () => {
    const teamMemberCount = this.props.pending.pending.length;
    return teamMemberCount;
  };

  getPointColor = (val) => {
    if (val > 19 && val <= 38) {
      return "#0096f8";
    }
    if (val > 39 && val <= 58) {
      return "#00b3e5";
    }
    if (val > 59 && val <= 58) {
      return "#00c8b3";
    }
    if (val > 79) {
      return "#2dd775";
    }
  }

  render() {
    return (
      <React.Fragment>
        <Typography
          variant="h4"
          style={{ marginTop: "8pt", marginBottom: "16pt", fontWeight: "bold" }}
        >
          {this.state.desc}
        </Typography>

        <Ranking {...this.state} />

        <div className="slider-bar-container">
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            key={this.state.var}
            id={this.state.var}
            name={this.state.var}
            value={!!this.state.val ? this.state.val : 0}
            disabled={!this.state.user._id}
            className="rating"
            onChange={this.handleSliderChange}
            style={{
              backgroundImage: this.getSliderBackground(),
              marginTop: "8pt",
              marginBottom: "12pt",
              transition: "none",
              borderRadius: "8pt",
              // zIndex: "2",
            }}
          />

          <div className="slider-bar-border-container">
            <div
              className="bar"
              style={{ background: this.getPointColor(this.state.val) }}
            >
              {" "}
            </div>
            <div
              className="bar"
              style={{ background: this.getPointColor(this.state.val) }}
            >
              {" "}
            </div>
            <div
              className="bar"
              style={{ background: this.getPointColor(this.state.val) }}
            >
              {" "}
            </div>
            <div
              className="bar"
              style={{ background: this.getPointColor(this.state.val) }}
            >
              {" "}
            </div>
          </div>
        </div>

        <CardActions
          style={{ flexWrap: "wrap", justifyContent: "left", padding: "0" }}
        >
          {this.props.pending.pending.map((user, index) => {
            return (
              <Button
                className="select-user-button"
                size="small"
                variant="contained"
                color="primary"
                style={this.getButtonStyles(user)}
                disableElevation
                key={index}
                onClick={() => this.handleSelectedUserChange(user)}
              >
                {user.firstName + " " + user.lastName}
              </Button>
            );
          })}
        </CardActions>

        <div style={{ marginTop: "10px" }}>
          {this.props.pending.pending.map((user, index) => {
            return (
              <TeamRank
                key={user._id}
                name={user._d}
                {...this.getScoreForDisplay(user)}
                backgroundImage={this.getSliderBackground}
                teamMemberCount={this.countTeam()}
              />
            );
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Trait;
