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
import { Link, Redirect } from "react-router-dom";
import {
  Typography,
  Container,
  Button,
  StylesProvider,
} from "@material-ui/core";
import global from "../../Global.module.scss";
import "./LandingPage.scss";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.me) {
      return <Redirect to="/home"></Redirect>;
    }

    if (this.props.loading) {
      return (
        <div>
          <h1>Loading...</h1>
          <br />
          <h1>Loading...</h1>
          <br />
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <Container
        maxWidth="xl"
        style={{ backgroundColor: "#0b152f", height: "95.25vh" }}
        className={global.container}
      >
        <Container maxWidth="sm">
          <StylesProvider injectFirst>
            <Typography
              variant="h3"
              component="h2"
              style={{ fontWeight: "bold", marginTop: "48pt" }}
            >
              Welcome to Coreable
            </Typography>
            <Typography
              variant="h5"
              style={{ marginTop: "32pt", color: "white" }}
            >
              Create an account or sign in to manage <br /> your Coreable
              account and review others.
            </Typography>
            <Container maxWidth="xl" style={{ marginTop: "48pt" }}>
              <Link to="/login">
                <Button className={`${global.btn} ${global.transparentbtn}`}>
                  Login
                </Button>
              </Link>
            </Container>
            <Container maxWidth="xl" style={{ marginTop: "8pt" }}>
              <Link to="/signup">
                <Button className={`${global.btn} ${global.primarybtn}`}>
                  Create an account
                </Button>
              </Link>
            </Container>
          </StylesProvider>
        </Container>
      </Container>
    );
  }
}

export default LandingPage;
