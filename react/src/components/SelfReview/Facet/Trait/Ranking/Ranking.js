import React, { Component } from 'react';


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
    if (this.props.val <= 10 && this.props.val >= 10) {
      return (<h1>Hello</h1>);
    } else {
      return (<h1>Goodbye</h1>);
    }
  }
}

export default Ranking;