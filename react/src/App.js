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

import Navbar from "./components/Navbar2/Navbar";
import { JWT, USER_NAME, LAST_NAME } from "./constants";

import "./App.scss";
import Loader from "./components/Loading/Loading";

const Login = lazy(() => import("./components/LandingPage/Login/Login"));
const LandingPage = lazy(() => import("./components/LandingPage/LandingPage"));
const Register = lazy(() =>
  import("./components/LandingPage/Register/Register")
);
const Home = lazy(() => import("./components/LandingPage/Home/Home"));
const Review = lazy(() => import("./components/Review/Review"));
const ThankYou = lazy(() => import("./components/Review/ThankYou/ThankYou"));
const Skills = lazy(() => import("./components/Skills/Skills"));
const Goals = lazy(() => import("./components/Goals/Goals"));
const Reviews = lazy(() => import("./components/ReviewTab/Review"));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
      loading: true,
      me: null,
      showLoadingSign: false,
    };
  }

  userDidLoginOrRegister = () => {
    this.setState(
      {
        ...this.state,
        loading: true,
      },
      () => {
        this.componentDidMount();
      }
    );
  };

  componentDidMount = async () => {
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
                  firstName
                  lastName
                  teams {
                    _id
                    name
                    subject {
                      _id
                      name
                      state
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
        JWT: localStorage.getItem(JWT) || "",
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(
      "https://coreable.appspot.com/graphql",
      options
    ).then((res) => res.json());
    const { data, errors } = res.data.me;
    if (errors) {
      console.error(errors);
    }
    this.setState({
      ...this.state,
      loading: false,
      me: data ? data.user : null,
    });
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    // if (this.state.loading) {
    //   this.state.showLoadingSign = !this.state.showLoadingSign;
    // } else {
    //   this.state.showLoadingSign = !this.state.showLoadingSign;
    // }

    return (
      <Router>
        <div className="App" style={{ height: "100%" }}>
          <Navbar
            firstName={localStorage.getItem(USER_NAME)}
            lastName={localStorage.getItem(LAST_NAME)}
          />
          {/* {this.state.showLoadingSign === true ? <Loader /> : null} */}
          <Suspense fallback={<LinearProgress style={{ top: "16px" }} />}>
            <Route
              exact
              path="/"
              component={(props) => (
                <LandingPage
                  {...props}
                  me={this.state.me}
                  loading={this.state.loading}
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
                  me={this.state.me}
                  loading={this.state.loading}
                  userDidLoginOrRegister={this.userDidLoginOrRegister}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              component={(props) => (
                <Register
                  {...props}
                  me={this.state.me}
                  loading={this.state.loading}
                  userDidLoginOrRegister={this.userDidLoginOrRegister}
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
                  me={this.state.me}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              exact
              path="/self-review"
              component={(props) => (
                <Review
                  {...props}
                  me={this.state.me}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              exact
              path="/thank-you"
              component={(props) => (
                <ThankYou
                  {...props}
                  me={this.state.me}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              exact
              path="/skills"
              component={(props) => (
                <Skills
                  {...props}
                  me={this.state.me}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              exact
              path="/goals"
              component={(props) => (
                <Goals
                  {...props}
                  me={this.state.me}
                  loading={this.state.loading}
                />
              )}
            />
            <Route
              exact
              path="/reviews"
              component={(props) => (
                <Reviews
                  {...props}
                  me={this.state.me}
                  loading={this.state.loading}
                />
              )}
            />
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
