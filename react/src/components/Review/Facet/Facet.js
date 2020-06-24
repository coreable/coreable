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
import Trait from "./Trait/Trait";
import Stepper from "../../Stepper/Stepper";
import "../Review.scss";

class Facet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      desc: props.desc,
      traits: props.traits,
      isSubmitDisabled: props.currentIndex === props.facetLength - 1,
      stepsArray: props.facets,
      currentIndex: props.currentIndex,
      reviewState: props.reviewState,
      user_id: props.user_id,
      showPara: false,
      flip: "",
    };
  }

  componentDidUpdate() {
    if (this.state.name !== this.props.name) {
      const props = this.props;
      this.setState({
        ...this.state,
        name: props.name,
        desc: props.desc,
        traits: props.traits,
        isSubmitDisabled: this.getIsSubmitButtonDisabled(),
      });
    }
  }

  getReviews = () => {
    return JSON.parse(localStorage.getItem("review"));
  };

  validateReview = (review) => {
    if (!review["calm"]) return false;
    if (!review["clearInstructions"]) return false;
    if (!review["cooperatively"]) return false;
    if (!review["crossTeam"]) return false;
    if (!review["distractions"]) return false;
    if (!review["easilyExplainsComplexIdeas"]) return false;
    if (!review["empathy"]) return false;
    if (!review["usesRegulators"]) return false;
    if (!review["influences"]) return false;
    if (!review["managesOwn"]) return false;
    if (!review["newIdeas"]) return false;
    if (!review["openToShare"]) return false;
    if (!review["positiveBelief"]) return false;
    if (!review["proactive"]) return false;
    if (!review["resilienceFeedback"]) return false;
    if (!review["signifiesInterest"]) return false;
    if (!review["workDemands"]) return false;
    return true;
  };

  getIsSubmitButtonDisabled = () => {
    const currentIndex = this.props.currentIndex;
    const facetLength = this.props.facetLength;
    if (currentIndex !== facetLength - 1) {
      return false;
    }
    const me_id = this.props.me._id;
    const team_id = this.props.pending._id;
    const reviews = this.getReviews();
    if (!reviews[me_id]) {
      return true;
    }
    if (!reviews[me_id][team_id]) {
      return true;
    }
    for (const user in reviews[me_id][team_id]) {
      const isValid = this.validateReview(reviews[me_id][team_id][user]);
      if (!isValid) {
        return true;
      }
    }
    return false;
  };

  sliderUpdatedHandler = () => {
    const currentIndex = this.props.currentIndex;
    const facetLength = this.props.facetLength;
    if (currentIndex !== facetLength - 1) {
      return false;
    } else {
      this.setState({
        ...this.state,
        isSubmitDisabled: this.getIsSubmitButtonDisabled(),
      });
    }
  };

  continue = (e) => {
    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.props.nextStep();
    let currentIndex = this.state.currentIndex;
    currentIndex++;
    this.setState({ currentIndex: currentIndex });
    console.log(currentIndex);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  back = (e) => {
    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.props.prevStep();
    let currentIndex = this.state.currentIndex;
    currentIndex--;
    this.setState({ currentIndex: currentIndex });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  showPara = () => {
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
    const { currentIndex, stepsArray } = this.state;

    return (
      <div className="review-container">
        <div className="top">
          <div className="facet-heading-desc">
            <div style={{ width: "100%" }}>
              <Stepper
                currentStepNumber={currentIndex}
                steps={stepsArray}
                stepColor="#4070e0"
              />
            </div>
            <div className="text-div">
              <h1 style={{ width: "100%" }}>{this.state.name}</h1>
              <span
                onClick={this.showPara}
                style={{
                  transform: `rotate(45deg) ${this.state.flip}`,
                }}
              ></span>
              <div>
                {this.state.showPara && (
                  <p
                    style={{
                      margin: "0",
                      padding: "0",
                      fontSize: "1.3rem",
                      width: "90%",
                    }}
                  >
                    {this.props.desc}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="main-review">
          <div className="grid-review">
            {this.state.traits.map((trait, index) => {
              return (
                <div className="inside-main-review" key={index}>
                  <Trait
                    {...trait}
                    name={this.state.name}
                    key={trait.name}
                    me={this.props.me}
                    traitName={this.state.traits.name}
                    pending={this.props.pending}
                    sliderUpdatedHandler={this.sliderUpdatedHandler}
                    reviewState={this.state.reviewState}
                    user_id={this.state.user_id}
                  ></Trait>
                </div>
              );
            })}
          </div>
          <div className="btn-container">
            <button
              className="btn primarybtn"
              onClick={this.continue}
              disabled={this.state.isSubmitDisabled}
            >
              {this.props.buttonLabel}
            </button>
            <button className="btn transparentbtn" onClick={this.back}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Facet;
