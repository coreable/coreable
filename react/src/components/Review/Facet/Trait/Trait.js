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
import Ranking from "./Ranking/Ranking";
import TeamRank from "./TeamRank/TeamRank";
import SliderIndicator from "./SliderIndicator";
import { Subject } from "rxjs";

import { Button } from "@material-ui/core";

class Trait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: props.user_id,
      name: props.name,
      var: props.var,
      val: props.val,
      desc: props.desc,
      para: props.para,
      user: {},
      team: props.pending,
      showPara: false,
      flip: "",
      border: "1px solid #707070",
      reviewState: props.reviewState,
    };
    this.reviewSubject = new Subject();
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
    this.reviewSubject.next({ review });
    localStorage.setItem("review", JSON.stringify(review));
  };

  getReview = () => {
    const review = JSON.parse(localStorage.getItem("review"));

    const team_id = this.state.team._id;
    const user_id = this.state.user._id;
    const me_id = this.props.me._id;
    const trait = this.state.var;

    if (!review[me_id]) {
      review[me_id] = {};
    }
    if (!review[me_id][team_id]) {
      review[me_id][team_id] = {};
    }
    if (!review[me_id][team_id][user_id]) {
      review[me_id][team_id][user_id] = {};
    }
    if (!review[me_id][team_id][user_id][trait]) {
      review[me_id][team_id][user_id][trait] = {
        val: -1,
        touched: false,
      };
    }

    return review;
  };

  getButtonStyles = (user) => {
    const team_id = this.state.team._id;
    const user_id = user._id;
    const me_id = this.props.me._id;
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
          review[me_id][team_id][user_id][trait].touched &&
          review[me_id][team_id][user_id][trait].val < 0
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
    const me_id = this.props.me._id;
    const trait = this.state.var;
    review[me_id][team_id][user_id][trait].touched = true;
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
        const me_id = this.props.me._id;
        const trait = this.state.var;

        this.setState(
          {
            ...this.state,
            val: review[me_id][team_id][user_id][trait].val,
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
    const me_id = this.props.me._id;
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
          review[me_id][team_id][user_id][trait].val = val;
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
    if (!user_id || this.state.val < 0) {
      return `linear-gradient(90deg, rgb(66, 113, 249) 0%, rgb(214, 214, 214) 0%)`;
    } else {
      return `linear-gradient(90deg, rgb(66, 113, 249) ${this.state.val}%, rgb(214, 214, 214) ${this.state.val}%)`;
    }
  };

  getScoreForDisplay = (user) => {
    const review = this.getReview();

    const team_id = this.state.team._id;
    const me_id = this.props.me._id;
    const user_id = user._id;
    const trait = this.state.var;

    let val;
    try {
      val = review[me_id][team_id][user_id][trait].val;
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

  clickHandler = () => {
    if (!this.state.showPara) {
      this.setState({
        showPara: !this.state.showPara,
        flip: "scaleY(-1) scaleX(-1)",
      });
    } else {
      this.setState({
        showPara: !this.state.showPara,
        flip: "",
      });
    }
  };

  render() {
    let buttons = [];

    return (
      <div
        style={{
          position: "relative",
          background: "#F7F9FC",
          borderRadius: "4pt",
        }}
      >
        <div className="text-container">
          <div className="inside-text-container">
            <h1
              style={{
                fontSize: "2rem",
                marginTop: "8pt",
                marginBottom: "10pt",
                fontWeight: "bold",
                width: "90%",
              }}
            >
              {this.state.desc}
            </h1>
            <span
              onClick={this.clickHandler}
              style={{
                display: "inline",
                borderBottom: this.state.border,
                borderRight: this.state.border,
                height: "6px",
                width: "6px",
                marginBottom: "10px",
                position: "absolute",
                right: "15px",
                transform: `rotate(45deg) ${this.state.flip}`,
              }}
            ></span>
          </div>

          <div style={{ width: "90%", paddingLeft: "5%", paddingRight: "5%" }}>
            {this.state.showPara ? (
              <p
                style={{
                  // padding: "15px",
                  // marginTop: "34pt",
                  color: "#707070",
                  transition: "all 0.5s easeOut",
                  fontSize: "1.4rem",
                }}
              >
                {this.state.para}
              </p>
            ) : null}
          </div>
        </div>

        <div className="trait-container">
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
                marginTop: "30pt",
                marginBottom: "4pt",
                transition: "none",
                borderRadius: "0.33rem",
                height: "30px",
                // zIndex: "2",
              }}
            />

            <div>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <SliderIndicator value={this.state.val} />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "left",
              padding: "0",
              marginTop: "5pt",
            }}
          >
            {this.state.reviewState === 1
              ? this.props.pending.pending
                  .filter((user) => {
                    return user._id === this.state.user_id;
                  })
                  .map((user, index) => {
                    let button = (<Button
                      className="select-user-button"
                      size="small"
                      variant="contained"
                      color="primary"
                      style={this.getButtonStyles(user)}
                      disableElevation
                      key={index}
                      id={user._id+'_'+index}
                      onClick={() => this.handleSelectedUserChange(user)}
                    >
                      {user.identity.firstName + " " + user.identity.lastName}
                    </Button>);
                    buttons.push(button);
                    return button;
                  })
              : this.props.pending.pending.map((user, index) => {
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
                      {user.identity.firstName + " " + user.identity.lastName}
                    </Button>
                  );
                })}
          </div>

          <div style={{ marginTop: "10px" }}>
            {this.props.pending.pending.map((user, index) => {
              return (
                <TeamRank
                  key={user._id}
                  name={user._id}
                  me={this.props.me}
                  user={user}
                  team={this.props.pending}
                  value={this.state.val}
                  trait={this.state.var}
                  defaultReview={this.getReview()}
                  reviewSubject={this.reviewSubject}
                  teamMemberCount={this.countTeam()}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Trait;
