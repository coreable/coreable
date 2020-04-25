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
import "./Facet.scss";

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
      behavior: "smooth",
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
      behavior: "smooth",
    });
  };

  // handleSubmit = (e) => e.preventDefault();

  render() {
    return (
      <Container className="review-container" maxWidth="lg">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid item style={{ marginTop: "16pt" }}>
            <Typography variant="h4">{this.state.name}</Typography>
            <Typography variant="subtitle1" style={{ paddingBottom: "24pt" }}>
              {this.props.desc}
            </Typography>
          </Grid>

          {this.state.traits.map((trait, index) => {
            return (
              <Grid item key={index}>
                <Trait
                  {...trait}
                  name={this.state.name}
                  traitName={this.state.traits.name}
                  pending={this.props.pending}
                ></Trait>
              </Grid>
            );
          })}

          <Grid item container direction="column">
            <Grid item>
              <Button className="btn-next" onClick={this.continue}>
                Next
              </Button>
            </Grid>
            <Grid item>
              <Button className="btn-before" onClick={this.back}>
                Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Facet;
