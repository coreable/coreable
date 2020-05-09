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
import ReactGA from "react-ga";

import { JWT, API_URL } from "./constants";

import "./App.scss";

import Loader from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
const Login = lazy(() => import("./components/LandingPage/Login/Login"));
const LandingPage = lazy(() => import("./components/LandingPage/LandingPage"));
const Register = lazy(() => import("./components/LandingPage/Register/Register"));
const Home = lazy(() => import("./components/LandingPage/Home/Home"));
const Review = lazy(() => import("./components/Review/Review"));
const Skills = lazy(() => import("./components/skills/Skills"));
const Goals = lazy(() => import("./components/Goals/Goals"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "JWT": null,
      "data": {
        "user": null
      },
      "errors": [],
      "fetching": true
    };
    ReactGA.initialize("UA-165578445-1");
  }

  updateJWT = () => {
    const jwt_token = localStorage.getItem(JWT);
    return new Promise((r, f) => {
      this.setState({
        ...this.state,
        JWT: jwt_token
      }, () => {
        return r(this.state);
      });
    });
  }

  refreshMe = async() => {
    if (!this.state.JWT) {
      await this.updateJWT();
    }
    this.setState(
      {
        ...this.state,
        fetching: true,
      },
      () => {
        this.fetchMe();
      }
    );
  };

  fetchMe = async() => {
    const query = {
      query: `
        query {
          me {
            data {
              user {
                _id
                firstName
                lastName
                email
                industry {
                  _id
                  name
                }
                teams {
                  _id
                  name
                  subject {
                    _id
                    name
                    state
                  }
                }
                pending {
                  _id
                  name
                  subject {
                    _id
                    state
                  }
                  users {
                    _id
                    firstName
                    lastName
                  }
                }
              }
            }
            errors {
              code
              path
              message
            }
          }
        }
      `,
    };

    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "JWT": this.state.JWT,
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(API_URL, options).then((res) => res.json());
    const { data, errors } = res.data.me;

    this.setState({
      ...this.state,
      fetching: false,
      data,
      errors
    });
  }

  componentDidMount = () => {
    this.refreshMe();
    ReactGA.pageview('/');
  };

  render() {
    if (this.state.fetching) {
      return <Loader />;
    }

    return (
      <Router>
        <div className="App" style={{ height: "100%" }}>
          <Navbar
            app={this.state}
            refreshMe={this.refreshMe}
            ReactGA={ReactGA}
          />
          <Suspense fallback={<LinearProgress style={{ top: "16px" }} />}>
            <Route
              exact
              path="/"
              component={(props) => (
                <LandingPage
                  {...props}
                  app={this.state}
                  refreshMe={this.refreshMe}
                  ReactGA={ReactGA}
                />
              )}
            />
            {/* Public routes (only unauthenticated users) */}
            <Route
              exact
              path="/login"
              component={(props) => (
                <Login
                  {...props}
                  app={this.state}
                  refreshMe={this.refreshMe}
                  ReactGA={ReactGA}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              component={(props) => (
                <Register
                  {...props}
                  app={this.state}
                  refreshMe={this.refreshMe}
                  ReactGA={ReactGA}
                />
              )}
            />
            {/* Private routes (only authenticated users) */}
            <Route
              exact
              path="/home"
              component={(props) => (
                <Home
                  {...props}
                  app={this.state}
                  refreshMe={this.refreshMe}
                  ReactGA={ReactGA}
                />
              )}
            />
            <Route
              exact
              path="/review"
              component={(props) => (
                <Review
                  {...props}
                  app={this.state}
                  refreshMe={this.refreshMe}
                  ReactGA={ReactGA}
                />
              )}
            />
            <Route
              exact
              path="/skills"
              component={(props) => (
                <Skills
                  {...props}
                  app={this.state}
                  refreshMe={this.refreshMe}
                  ReactGA={ReactGA}
                />
              )}
            />
            <Route
              exact
              path="/goals"
              component={(props) => (
                <Goals
                  {...props}
                  app={this.state}
                  refreshMe={this.refreshMe}
                  ReactGA={ReactGA}
                />
              )}
            />

            <Route exact path="/loading" component={Loader} />
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
