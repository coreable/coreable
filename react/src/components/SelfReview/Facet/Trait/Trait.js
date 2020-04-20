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
    minHeight: 24,
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

const marks = [
  {
    value: 10,
    label: 'Fails'
  },
  {
    value: 30,
    label: 'Under prompting'
  },
  {
    value: 50,
    label: 'Habitually'
  },
  {
    value: 70,
    label: 'Encourages others'
  },
  {
    value: 90,
    label: 'Teaches'
  },
];

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

  slider = () => (
    `linear-gradient(90deg, rgb(66, 113, 249) ${this.props.val}%, rgb(214, 214, 214) ${this.props.val}%)`
  );

  render() {
    return (
      <Card className="trait-card" variant="outlined">
        <Typography variant="h5" style={{ marginTop: '8pt', fontWeight: 'bold' }}>{this.state.var}</Typography>
        <Typography variant="subtitle2" style={{ marginTop: '8pt', marginBottom: '16pt' }}>{this.state.desc}</Typography>
        
        <Ranking {...this.state} />

        <CoreableSlider
          marks={marks}
          min={0}
          max={100}
          step={5}
          id={this.state.var}
          name={this.state.var}
          defaultValue={0}
          onChange={this.props.handleChange.bind(this)}
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