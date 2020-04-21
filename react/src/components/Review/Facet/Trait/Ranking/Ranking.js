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

import React, { Component } from 'react';
import {
  Typography
} from '@material-ui/core';

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousVal: 0
    };
  }

  render() {
    let isBroken = isNaN(this.props.val) && !isFinite(this.props.val);

    if (!isBroken && this.state.previousVal !== this.props.val) {
      this.setState({
        previousVal: this.props.val
      });
    }

    const wasFail = this.state.previousVal <= 10;
    const shouldBeFail = isBroken && wasFail;

    let wasUnder = this.state.previousVal > 10 && this.state.previousVal <= 30;
    let shouldBeUnder = isBroken && wasUnder;

    let wasHabit = this.state.previousVal > 30 && this.state.previousVal <= 50;
    let shouldBeHabit = isBroken && wasHabit;

    let wasEncourage = this.state.previousVal > 50 && this.state.previousVal <= 70;
    let shouldBeEncourage = isBroken && wasEncourage;

    let wasTeaches = this.state.previousVal > 70;
    let shouldBeTeaches = isBroken && wasTeaches;

    if (this.props.val <= 10 || shouldBeFail) {
      return (<Typography variant="h5">Fails</Typography>);
    }
    if ((this.props.val > 10 && this.props.val <= 30) || shouldBeUnder) {
      return (<Typography variant="h5">Under prompting</Typography>);
    }
    if ((this.props.val > 30 && this.props.val <= 50 ) || shouldBeHabit) {
      return (<Typography variant="h5">Habitually</Typography>);
    }
    if ((this.props.val > 50 && this.props.val <= 70) || shouldBeEncourage) {
      return (<Typography variant="h5">Encourages others</Typography>);
    }
    if (this.props.val > 70 || shouldBeTeaches) {
      return (<Typography variant="h5">Teaches</Typography>);
    }
    return (<Typography variant="h5">...</Typography>);
  }
}

export default Ranking;