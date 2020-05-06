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
import { Button, Typography } from "@material-ui/core";
import Trait from "./Trait/Trait";
import "../Review.scss";

class Facet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      desc: props.desc,
      traits: props.traits,
      isSubmitDisabled: props.currentIndex === props.facetLength -1
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
        isSubmitDisabled: this.getIsSubmitButtonDisabled()
      });
    }
  }

  getReviews = () => {
    return JSON.parse(localStorage.getItem("review"));
  }

  validateReview = (review) => {
    if (!review['calm']) return false;
    if (!review['change']) return false;
    if (!review['clearInstructions']) return false;
    if (!review['cooperatively']) return false;
    if (!review['crossTeam']) return false;
    if (!review['distractions']) return false;
    if (!review['easilyExplainsComplexIdeas']) return false;
    if (!review['emotionalResponse']) return false;
    if (!review['empathy']) return false;
    if (!review['eyeContact']) return false;
    if (!review['influences']) return false;
    if (!review['managesOwn']) return false;
    if (!review['newIdeas']) return false;
    if (!review['openToShare']) return false;
    if (!review['positiveBelief']) return false;
    if (!review['proactive']) return false;
    if (!review['resilienceFeedback']) return false;
    if (!review['signifiesInterest']) return false;
    if (!review['tone']) return false;
    if (!review['verbalAttentiveFeedback']) return false;
    if (!review['workDemands']) return false;
    return true;
  }

  getIsSubmitButtonDisabled = () => {
    const currentIndex = this.props.currentIndex;
    const facetLength = this.props.facetLength;
    if (currentIndex !== (facetLength - 1)) {
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
  }

  sliderUpdatedHandler = () => {
    const currentIndex = this.props.currentIndex;
    const facetLength = this.props.facetLength;
    if (currentIndex !== (facetLength - 1)) {
      return false;
    } else {
      this.setState({
        ...this.state,
        isSubmitDisabled: this.getIsSubmitButtonDisabled()
      });
    }
  };

  continue = (e) => {
    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.props.nextStep();
    window.scrollTo({
      top: 0
    });
  };

  back = (e) => {
    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.props.prevStep();
    window.scrollTo({
      top: 0
    });
  };

  render() {
    return (
      <div className="team-container">
        <div className="top">
          <div className="facet-heading-desc">
            <Typography
              variant="h2"
              style={{ color: "white", fontWeight: "bold" }}
            >{this.state.name}</Typography>
            <p style={{ fontSize: "1.4rem" }}>{this.props.desc} </p>
          </div>
        </div>
        <div className="main">
          {this.state.traits.map((trait, index) => {
            return (
              <div className="inside-main" key={index}>
                <Trait
                  {...trait}
                  name={this.state.name}
                  key={trait.name}
                  me={this.props.me}
                  traitName={this.state.traits.name}
                  pending={this.props.pending}
                  sliderUpdatedHandler={this.sliderUpdatedHandler}
                ></Trait>
              </div>
            );
          })}
          <Button
            className="btn primarybtn"
            onClick={this.continue}
            disabled={this.state.isSubmitDisabled}
          >
            Next
          </Button>
          <Button
            className="btn transparentbtn"
            onClick={this.back}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }
}

export default Facet;
