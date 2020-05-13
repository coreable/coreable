import React, { Component } from "react";
import "./Stepper.scss";

export default class Stepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: [],
    };
  }

  componentDidMount() {
    const { steps, currentStepNumber } = this.props;

    const stepsState = steps.map((step, index) => {
      const stepObj = {};
      stepObj.description = step.name;
      stepObj.selected = index === 0 ? true : false;
      stepObj.completed = false;
      return stepObj;
    });

    const currentSteps = this.updateStep(currentStepNumber, stepsState);

    this.setState({
      steps: currentSteps,
    });
  }

  componentDidUpdate(prevProps) {
    const { steps } = this.state;
    const currentSteps = this.updateStep(this.props.currentStepNumber, steps);

    if (prevProps.currentStepNumber !== this.props.currentStepNumber)
      this.setState({
        steps: currentSteps,
      });
  }

  updateStep(stepNumber, steps) {
    const newSteps = [...steps];
    let stepCounter = 0;

    while (stepCounter < newSteps.length) {
      // Current step
      if (stepCounter === stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          selected: true,
          current: true,
          completed: false,
        };
        stepCounter++;
      }
      // Past step
      else if (stepCounter < stepNumber) {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          selected: true,
          current: false,
          completed: true,
        };
        stepCounter++;
      }
      // Future step
      else {
        newSteps[stepCounter] = {
          ...newSteps[stepCounter],
          selected: false,
          current: false,
          completed: false,
        };
        stepCounter++;
      }
    }

    return newSteps;
  }

  render() {
    const { steps } = this.state;
    const stepper = steps.map((step, index) => {
      return (
        <div className="step-wrapper" key={index}>
          <div
            className={`step-circle ${
              step.selected ? "step-circle-selected" : "step-circle-disabled"
            } ${step.current ? "step-circle-current" : ""}`}
          ></div>
          <div className="step-bar-container">
            <div
              className={`step-bar ${
                step.selected ? "step-bar-selected" : "step-bar-disabled"
              } ${step.current ? "step-number-current" : ""}`}
            ></div>
          </div>
        </div>
      );
    });

    return <div className="stepper-wrapper">{stepper}</div>;
  }
}
