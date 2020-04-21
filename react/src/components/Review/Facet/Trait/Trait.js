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

import React, { Component } from 'react'
import Ranking from './Ranking/Ranking';
import {
  Card,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';
import './Trait.scss';

class Trait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      var: props.var,
      val: props.val,
      desc: props.desc,
      user_id: '',
      team_id: props.pending._id,
    }
  }

  componentDidUpdate() {
    if (this.state.var !== this.props.var) {
      const props = this.props;
      this.setState({
        ...this.state,
        var: props.var,
        val: props.val,
        desc: props.desc,
      });
    }
  }

  changeSelectedUser = (user_id) => {
    this.updateReview(user_id);
    const review = this.getReview();
    let val;
    try {
      val = review[this.state.team_id][user_id][this.state.var];
    } catch (err) {
      val = 0;
    }
    this.setState({
      ...this.state,
      user_id: user_id,
      val
    });
  }

  getReview = () => {
    return JSON.parse(localStorage.getItem("review"));
  }

  setReview = (review) => {
    localStorage.setItem("review", JSON.stringify(review));
  }

  updateReview = (user_id) => {
    if (!user_id) {
      return false;
    }
    const review = this.getReview();
    if (!review[this.state.team_id]) {
      review[this.state.team_id] = {};
    }
    if (!review[this.state.team_id][user_id]) {
      review[this.state.team_id][user_id] = {};
    }
    review[this.state.team_id][user_id] = {
      ...review[this.state.team_id][user_id],
      [this.state.var]: this.state.val,
    }
    this.setReview(review);
  }

  handleSliderChange = (e) => {
    console.log(e.target.value)
    try {
      const val = e.target.value;
      this.setState({
        ...this.state,
        val: val
      }, () => {
        this.updateReview(this.state.user_id);
      });
    } catch (err) {
      // ignore
    }
  }

  getSliderDefaultValue = (e) => {
    const review = JSON.parse(localStorage.getItem("review"));
    try {
      return review[this.state.team_id][this.state.user_id][this.state.var];
    } catch {
      return 0;
    }
  }

  getSliderBackground = () => {
    return `linear-gradient(90deg, rgb(66, 113, 249) ${this.state.val}%, rgb(214, 214, 214) ${this.state.val}%)`
  }

  render() {
    return (
      <Card className="trait-card" variant="outlined">
        <Typography variant="h5" style={{ marginTop: '8pt', fontWeight: 'bold' }}>{this.state.var}</Typography>
        <Typography variant="subtitle2" style={{ marginTop: '8pt', marginBottom: '16pt' }}>{this.state.desc}</Typography>

        <Ranking {...this.state} />
        
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          key={this.state.var}
          id={this.state.var}
          name={this.state.var}
          value={this.state.val}
          disabled={!this.state.user_id}
          className="rating"
          onChange={this.handleSliderChange}
          style={
            { 
              backgroundImage: this.getSliderBackground(),
              marginTop: '8pt',
              marginBottom: '8pt'
            }
          }
        />

        <CardActions>
          {
            this.props.pending.pending.map((user, index) => {
              return (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  className={this.state.user_id === user._id ? 'active' : 'inactive'}
                  disableElevation
                  key={index}
                  onClick={() => this.changeSelectedUser(user._id)}>
                  {user.firstName + ' ' + user.lastName}
                </Button>
              );
            })
          }
        </CardActions>
      </Card>
    );
  }
}

export default Trait;