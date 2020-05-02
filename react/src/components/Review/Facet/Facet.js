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
      });
    }
  }

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
                  traitName={this.state.traits.name}
                  pending={this.props.pending}
                ></Trait>
              </div>
            );
          })}
          <Button
            className="btn primarybtn"
            onClick={this.continue}
          >Next</Button>
          <Button className="btn transparentbtn" onClick={this.back}>
            Back
          </Button>
        </div>
      </div>
    );
  }
}

export default Facet;
