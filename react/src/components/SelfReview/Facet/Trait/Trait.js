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
  Slider,
  withStyles,
  CardActions,
  Button
} from '@material-ui/core';
import { USER_NAME } from '../../../../constants';
import './Trait.scss';

const CoreableSlider = withStyles({
  root: {
    padding: 0,
    backgroundColor: '#d6d6d6',
    height: 24,
    width: '90%'
  },
  thumb: {
    height: 24,
    width: 8,
    backgroundColor: 'rgb(66, 113, 249)',
    borderRadius: 4,
    marginTop: 0,
    cursor: 'pointer',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
    '&:focus': {
      outline: 'none',
    }
  },
  active: {},
  valueLabel: {},
  track: {
    backgroundColor: 'rgb(66, 113, 249)',
    height: 24,
    borderRadius: 4,
  },
  rail: {
    backgroundColor: '#dadada',
    height: 24,
    borderRadius: 4,
  },
})(Slider);

class Trait extends Component {
  constructor(props) {
    super(props);
    this.state = {
      var: props.var,
      val: props.val,
      desc: props.desc
    }
  }

  componentDidUpdate() {
    if (this.state.var !== this.props.var) {
      const props = this.props;
      this.setState({
        var: props.var,
        val: props.val,
        desc: props.desc
      });
    }
  }

  render() {
    return (
      <Card className="trait-card" variant="outlined">
        <Typography variant="h5" style={{ marginTop: '8pt', fontWeight: 'bold' }}>{this.state.var}</Typography>
        <Typography variant="subtitle2" style={{ marginTop: '8pt', marginBottom: '16pt' }}>{this.state.desc}</Typography>
        
        <Ranking {...this.props} />

        <CoreableSlider
          defaultValue={0}
          min={0}
          max={100}
          step={5}
          key={this.state.var}
          id={this.state.var}
          name={this.state.var}
          onChange={this.props.handleChange.bind(this)}
          style={{ marginTop: '8pt', marginBottom: '8pt' }}
        />

        <CardActions>
          <Button size="small" variant="contained" color="primary" disableElevation style={{ backgroundColor: 'rgb(66, 113, 249)', fontWeight: 'bold' }}>
            {localStorage.getItem(USER_NAME)}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default Trait;