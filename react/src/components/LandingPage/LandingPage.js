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
import { Link, Redirect } from "react-router-dom";

import "../LandingPage/LandingPage.scss";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.ReactGA.pageview("/");
  };

  render() {
    if (this.props.app.data.user) {
      return <Redirect to="/home"></Redirect>;
    }

    return (
      <div
        style={{ backgroundColor: "#0b152f", height: "100vh" }}
        className="container"
      >
        <div className="grid">
          <div className="grid-card">
            <h1 style={{ marginTop: "48pt" }}> Welcome to Coreable </h1>
            <div
              style={{
                fontSize: "1.6rem",
                marginTop: "32pt",
                color: "lightgrey",
              }}
            >
              Create an account or sign in to manage <br /> your Coreable
              account and review others.
            </div>
            <div style={{ marginTop: "48pt" }}>
              <Link to="/login">
                <button className="btn transparentbtn">Login</button>
              </Link>
            </div>
            <div style={{ marginTop: "8pt" }}>
              <Link to="/signup">
                <button className="btn primarybtn">Create an account</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
