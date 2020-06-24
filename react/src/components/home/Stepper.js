import React, { Component } from "react";
import "./stepper.scss";

export default class Stepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfNotCompleted: 3 - this.props.reviewState,
    };
  }

  render() {
    let completed = [];
    let notCompleted = [];
    let status = { width: "0%" };
    let p_styling = [{ color: "#d6d6d6" }, { color: "#d6d6d6" }];

    for (let i = 0; i < this.props.reviewState; i++) {
      p_styling[i].color = "#4070e0";
    }

    if (this.props.reviewState === 2) {
      status.width = "50%";
    }
    if (this.props.reviewState === 3) {
      status.width = "100%";
    }

    for (let i = 0; i < this.props.reviewState; i++) {
      completed.push(<stepper-steps class="active">{i + 1}</stepper-steps>);
    }

    for (let i = 0; i < this.state.numOfNotCompleted; i++) {
      notCompleted.push(
        <stepper-steps class="">
          {this.state.numOfNotCompleted > 1
            ? this.state.numOfNotCompleted + i
            : 3 + i}
        </stepper-steps>
      );
    }

    return (
      <stepper-container>
        <p style={p_styling[0]}>Self review</p>
        <p style={p_styling[1]}>Mid review</p>
        {completed}
        {notCompleted}
        <span className="status" style={status}></span>
        <span></span>
      </stepper-container>
    );
  }
}
