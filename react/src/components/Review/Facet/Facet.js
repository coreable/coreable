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
import { Grid, Container, Button, Typography } from "@material-ui/core";
import Trait from "./Trait/Trait";
// import "./Facet.scss";
import "../Review.scss";

import global from "../../../Global.module.scss";

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
      top: 0,
      // behavior: "smooth",
    });
  };

  back = (e) => {
    if (e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.props.prevStep();
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  };

  // handleSubmit = (e) => e.preventDefault();

  render() {
    return (
      <div className="team-container">
        <div className="top">
          <div className="facet-heading-desc">
            <h1 style={{ margin: "0" }}>{this.state.name} </h1>
            <p style={{ fontSize: "1.4rem" }}>{this.props.desc} </p>
          </div>
        </div>
        <div className="main">
          {this.state.traits.map((trait, index) => {
            return (
              <div className="inside-main">
                <Trait
                  {...trait}
                  name={this.state.name}
                  traitName={this.state.traits.name}
                  pending={this.props.pending}
                ></Trait>
              </div>
            );
          })}
          <Button className="btn primarybtn" onClick={this.continue}>
            Next
          </Button>
          <Button className="btn transparentbtn" onClick={this.back}>
            Back
          </Button>
        </div>
      </div>
    );
  }
}

export default Facet;
