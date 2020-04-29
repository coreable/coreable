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
import { Typography } from "@material-ui/core";

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousVal: 0,
    };
  }

  render() {
    let isBroken = isNaN(this.props.val) && !isFinite(this.props.val);

    if (!isBroken && this.state.previousVal !== this.props.val) {
      this.setState({
        previousVal: this.props.val,
      });
    }

    const wasFail = this.state.previousVal <= 10;
    const shouldBeFail = isBroken && wasFail;

    let wasUnder = this.state.previousVal > 10 && this.state.previousVal <= 30;
    let shouldBeUnder = isBroken && wasUnder;

    let wasHabit = this.state.previousVal > 30 && this.state.previousVal <= 50;
    let shouldBeHabit = isBroken && wasHabit;

    let wasEncourage =
      this.state.previousVal > 50 && this.state.previousVal <= 70;
    let shouldBeEncourage = isBroken && wasEncourage;

    let wasTeaches = this.state.previousVal > 70;
    let shouldBeTeaches = isBroken && wasTeaches;

    if (this.props.val <= 10 || shouldBeFail) {
      return (
        <div>
          <Typography
            variant="h4"
            style={{ color: "#4070e0", fontWeight: "bold" }}
          >
            Unable to
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "rgb(200, 200, 200)", fontWeight: "bold" }}
          >
            Neglects to attempt
          </Typography>
        </div>
      );
    }
    if ((this.props.val > 10 && this.props.val <= 30) || shouldBeUnder) {
      return (
        <div>
          <Typography
            variant="h4"
            style={{ color: "#0096f8", fontWeight: "bold" }}
          >
            {" "}
            Under prompting
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "rgb(200, 200, 200)", fontWeight: "bold" }}
          >
            Only under supervision or prompting
          </Typography>
        </div>
      );
    }
    if ((this.props.val > 30 && this.props.val <= 50) || shouldBeHabit) {
      return (
        <div>
          <Typography
            variant="h4"
            style={{ color: "#00b3e5", fontWeight: "bold" }}
          >
            Habitually
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "rgb(200, 200, 200)", fontWeight: "bold" }}
          >
            By way of habit: customarily
          </Typography>
        </div>
      );
    }
    if ((this.props.val > 50 && this.props.val <= 70) || shouldBeEncourage) {
      return (
        <div>
          <Typography
            variant="h4"
            style={{ color: "#00c8b3", fontWeight: "bold" }}
          >
            Encourages others
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "rgb(200, 200, 200)", fontWeight: "bold" }}
          >
            Gives support and confidence
          </Typography>
        </div>
      );
    }
    if (this.props.val > 70 || shouldBeTeaches) {
      return (
        <div>
          <Typography
            variant="h4"
            style={{ color: "#2dd775", fontWeight: "bold" }}
          >
            Teaches
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "rgb(200, 200, 200)", fontWeight: "bold" }}
          >
            Shares experience and guides
          </Typography>
        </div>
      );
    }
    return (
      <Typography
        variant="h4"
        style={{ color: "rgb(64, 112, 224)", fontWeight: "bold" }}
      >
        ...
      </Typography>
    );
  }
}

export default Ranking;
