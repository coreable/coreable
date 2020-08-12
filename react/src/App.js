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

import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import ReactGA from "react-ga";

import { JWT, API_URL } from "./constants";
import { MANAGER_API } from "./queries";

import "./App.scss";

import Loader from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import { isImportTypeNode } from "typescript";
const Login = lazy(() => import("./components/login/Login"));
const LandingPage = lazy(() => import("./components/LandingPage/LandingPage"));
const Register = lazy(() => import("./components/register/Register"));
const Home = lazy(() => import("./components/home/Home"));
const Review = lazy(() => import("./components/Review/Review"));
const Skills = lazy(() => import("./components/skills/Skills"));
const Goals = lazy(() => import("./components/Goals/Goals"));
const Onboarding = lazy(() => import("./components/Onboarding/Onboarding"));
const Collaboration = lazy(() =>
  import("./components/Onboarding/Collaboration/Collaboration")
);
const Communication = lazy(() =>
  import("./components/Onboarding/Communication/Communication")
);
const Manager = lazy(() => import("./components/home/Manager/Manager"));
const ManagerLogin = lazy(() =>
  import("./components/home/Manager/Login/Login")
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      JWT: null,
      data: {
        user: null,
      },
      errors: [],
      fetching: true,
    };
    ReactGA.initialize("UA-165578445-1");
  }

  updateJWT = () => {
    const jwt_token = localStorage.getItem(JWT);
    return new Promise((r, f) => {
      this.setState(
        {
          ...this.state,
          JWT: jwt_token,
        },
        () => {
          return r(this.state);
        }
      );
    });
  };

  removeJWT = () => {
    return new Promise((r, f) => {
      this.setState(
        {
          ...this.state,
          JWT: null,
        },
        () => {
          return r(this.state);
        }
      );
    });
  };

  refreshMe = async (removeJWT = false) => {
    // removeJWT Used for Login/Register
    if (removeJWT === true) {
      await this.removeJWT();
    }
    if (!this.state.JWT) {
      await this.updateJWT();
    }
    return new Promise((r, f) => {
      this.setState(
        {
          ...this.state,
          fetching: true,
        },
        async () => {
          const state = await this.fetchMe();
          return r(state);
        }
      );
    });
  };

  refreshMeManager = async (removeJWT = false) => {
    // removeJWT Used for Login/Register
    if (removeJWT === true) {
      await this.removeJWT();
    }
    if (!this.state.JWT) {
      await this.updateJWT();
    }
    return new Promise((r, f) => {
      this.setState(
        {
          ...this.state,
          fetching: true,
        },
        async () => {
          const state = await this.fetchMeManager();
          return r(state);
        }
      );
    });
  };

  fetchMe = async () => {
    const query = {
      query: `
      query {
        me {
          data {
            user {
              _id
              identity {
                firstName
                lastName
                email
              }
              industry {
                _id
                name
              }
              team {
                _id
                name
                tutorial {
                  _id
                  name
                  subject {
                    _id
                    name
                    state
                    organisation {
                      _id
                      name
                    }
                  }
                }
              }
              pending {
                _id
                name
                tutorial {
                  subject {
                    _id
                    name
                    state
                    organisation {
                      _id
                      name
                    }
                  }
                }
                user {
                  _id
                  identity {
                    firstName
                    lastName
                    email
                  }
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
        JWT: this.state.JWT,
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(API_URL, options).then((res) => res.json());

    let { data, errors } = res.data.me;

    if (!data) {
      data = {
        user: null,
      };
    }

    if (!errors) {
      errors = [];
    }

    return this.setState(
      {
        ...this.state,
        data,
        errors,
        fetching: false,
      },
      () => {
        return {
          data,
          errors,
        };
      }
    );
  };

  fetchMeManager = async () => {
    const query = {
      query: MANAGER_API.query,
    };

    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        JWT: this.state.JWT,
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(API_URL, options).then((res) => res.json());

    let { data, errors } = res.data.manager;

    if (!data) {
      data = {
        user: null,
      };
    }

    if (!errors) {
      errors = [];
    }

    return this.setState(
      {
        ...this.state,
        data,
        errors,
        fetching: false,
      },
      () => {
        return {
          data,
          errors,
        };
      }
    );
  };

  componentDidMount = () => {
    this.refreshMe();
    ReactGA.pageview("/");
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
            <Route
              exact
              path="/intro"
              component={(props) => (
                <Onboarding
                  {...props}
                  app={this.state}
                  refreshMe={this.refreshMe}
                  ReactGA={ReactGA}
                />
              )}
            />
            <Route
              exact
              path="/collaboration"
              component={(props) => (
                <Collaboration
                  {...props}
                  app={this.state}
                  refreshMe={this.refreshMe}
                  ReactGA={ReactGA}
                />
              )}
            />
            <Route
              exact
              path="/communication"
              component={(props) => (
                <Communication
                  {...props}
                  app={this.state}
                  refreshMe={this.refreshMe}
                  ReactGA={ReactGA}
                />
              )}
            />
            <Route
              exact
              path="/manager-login"
              component={(props) => (
                <ManagerLogin
                  {...props}
                  app={this.state}
                  refreshMe={this.refreshMeManager}
                  ReactGA={ReactGA}
                />
              )}
            />
            <Route
              exact
              path="/manager"
              component={(props) => (
                <Manager
                  {...props}
                  app={this.state}
                  refreshMe={this.refreshMeManager}
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
