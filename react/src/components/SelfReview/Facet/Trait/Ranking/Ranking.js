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
      val: props.val
    }
  }

  componentDidUpdate() {
    if (this.state.val !== this.props.val) {
      const props = this.props;
      this.setState({
        val: props.val
      });
    }
  }

  render() {
    if (this.props.val >= 0 && this.props.val <= 10) {
      return (<Typography variant="h5">Fails</Typography>);
    }
    if (this.props.val > 10 && this.props.val <= 30) {
      return (<Typography variant="h5">Under prompting</Typography>);
    }
    if (this.props.val > 20 && this.props.val <= 50) {
      return (<Typography variant="h5">Habitually</Typography>);
    }
    if (this.props.val > 50 && this.props.val <= 70) {
      return (<Typography variant="h5">Encourages others</Typography>);
    }
    if (this.props.val > 70 && this.props.val <= 100) {
      return (<Typography variant="h5">Teaches</Typography>);
    }
  }
}

export default Ranking;