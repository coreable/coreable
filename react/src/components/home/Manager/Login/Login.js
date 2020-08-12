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
import "../../../LandingPage/LandingPage.scss";
import { Link, Redirect } from "react-router-dom";
import { JWT, IDENTITY_URL } from "../../../../constants";
import { TextField, FormControl } from "@material-ui/core";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      touched: {
        email: false,
        password: false,
      },
    };
  }

  // componentDidMount = () => {
  //   this.props.ReactGA.pageview("/login");
  // };

  handlers = {
    errors: () => {
      return this.handlers.validate(this.state.email, this.state.password);
    },
    validate: (email, password) => {
      return {
        email: email.length === 0 || !email.includes("@"),
        password: password.length <= 4,
      };
    },
    change: (e) => {
      this.setState({
        [e.target.name]: e.target.value,
      });
    },
    blur: (field) => (e) => {
      this.setState({
        touched: { ...this.state.touched, [field]: true },
      });
    },
    getColor: (field) => {
      if (this.state.touched[field] && !this.errors()[field]) {
        return "#f7f9fc";
      } else {
        return "#f7f9fc";
      }
    },
    submit: (e) => {
      if (!this.isDisabled) {
        e.preventDefault();
        return false;
      }
    },
    shouldMarkError: (field) => {
      // const hasError = this.errors()[field];
      const hasError = this.handlers.errors()[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    },
  };

  isDisabled = () => Object.keys(this.errors()).some((x) => this.errors()[x]);

  loginUser = async () => {
    const query = {
      query: `
        mutation {
          managerLogin(email: "${this.state.email}", password: "${this.state.password}") {
            data  {
              user {
                _id
              }
              token
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
        JWT: this.props.app.JWT,
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(IDENTITY_URL, options).then((data) => data.json());
    const { data, errors } = res.data.managerLogin;

    if (errors) {
      alert(errors[0].message);
    }

    if (data) {
      (async () => {
        await Promise.resolve();
        return localStorage.setItem(JWT, data.token);
      })().then(async () => {
        await this.props.refreshMe(true);
        this.props.history.push({
          pathname: "/manager",
        });
      });
    }
  };

  render() {
    if (this.props.app.data.user) {
      return <Redirect to="/manager"></Redirect>;
    }

    return (
      <div className="container">
        <div className="grid">
          <div className="grid-card">
            <h1 style={{ textAlign: "left", color: "#000", margin: "0" }}>
              Welcome,
            </h1>
            <h2 style={{ textAlign: "left", color: "#707070", margin: "0" }}>
              login to start
            </h2>
            <FormControl style={{ marginTop: "16pt", autocomplete: "off" }}>
              <TextField
                InputLabelProps={{ style: { fontSize: 12 } }}
                label="Email"
                fullWidth
                margin="normal"
                variant="outlined"
                name="email"
                error={this.handlers.shouldMarkError("email")}
                value={this.state.email}
                type="email"
                onChange={this.handlers.change}
                onBlur={this.handlers.blur("email")}
                style={{
                  marginTop: "20pt",
                }}
              />
              <TextField
                InputLabelProps={{ style: { fontSize: 12 } }}
                label="Password"
                fullWidth
                margin="normal"
                variant="outlined"
                name="password"
                error={this.handlers.shouldMarkError("password")}
                value={this.state.password}
                type="password"
                onChange={this.handlers.change}
                onBlur={this.handlers.blur("password")}
                onKeyPress={async (e) => {
                  if (e.key === "Enter") {
                    await this.loginUser();
                  }
                }}
                style={{
                  marginTop: "8pt",
                  marginBottom: "8pt",
                }}
              />

              <button
                className="btn primarybtn"
                // disabled={this.isDisabled()}
                onClick={async () => {
                  await this.loginUser();
                }}
                style={{ marginTop: "10px" }}
              >
                Login
              </button>

              <Link
                to="/signup"
                style={{
                  marginTop: "8pt",
                  textDecoration: "none",
                  color: "lightgrey",
                }}
              >
                <button
                  className="btn blueTextButton"
                  style={{ marginTop: "10px" }}
                >
                  Sign up
                </button>
              </Link>

              <div style={{ marginTop: "15px" }}>
                <Link
                  to="/forgot"
                  style={{
                    marginTop: "8pt",
                    textDecoration: "none",
                    color: "lightgrey",
                  }}
                >
                  Forgot password
                </Link>
              </div>
            </FormControl>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
