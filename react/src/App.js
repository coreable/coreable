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

import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";

import PrivateRoute from "./PrivateRoute";

import Navbar from "./components/Navbar2/Navbar";
import { JWT } from "./constants";

import "./App.scss";
import { isNull } from "util";

const Login = lazy(() => import("./components/LandingPage/Login/Login"));
const LandingPage = lazy(() => import("./components/LandingPage/LandingPage"));
const Register = lazy(() =>
  import("./components/LandingPage/Register/Register")
);
const Setup = lazy(() => import("./components/LandingPage/InitalSetup/Setup"));
const Review = lazy(() => import("./components/Review/Review"));
const ThankYou = lazy(() => import("./components/Review/ThankYou/ThankYou"));
const Skills = lazy(() => import("./components/Skills/Skills"));
const Goals = lazy(() => import("./components/Goals/Goals"));

class App extends Component {
  state = {
    sideDrawerOpen: false,
  };

  // checkLogin = () => {
  //   if (JWT === "auth-token") {
  //     console.log(JWT);
  //     return;
  //   } else {
  //     return <Navbar />;
  //   }
  // };

  testing = () => {
    console.log();
  };

  render() {
    return (
      <Router>
        <div className="App" style={{ height: "100%" }}>
          <Navbar />
          <Suspense fallback={<LinearProgress style={{ top: "16px" }} />}>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <Route
              exact
              path="/home"
              component={Setup}
              authed={this.state.auth}
            />
            <Route
              exact
              path="/self-review"
              component={Review}
              authed={this.state.auth}
            />
            <Route
              exact
              path="/thank-you"
              component={ThankYou}
              authed={this.state.auth}
            />
            <Route
              exact
              path="/skills"
              component={Skills}
              authed={this.state.auth}
            />
            <Route
              exact
              path="/goals"
              component={Goals}
              authed={this.state.auth}
            />
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
