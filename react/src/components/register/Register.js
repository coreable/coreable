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

// TODO: Disable register button while waiting for submit

import React, { Component } from "react";
import "../LandingPage/LandingPage.scss";
import { Link, Redirect } from "react-router-dom";
import { JWT, IDENTITY_URL } from "../../constants";

import { TextField, FormControl } from "@material-ui/core";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",

      touched: {
        email: false,
        password: false,
        firstName: false,
        lastName: false,
      },
    };
  }

  componentDidMount = () => {
    this.props.ReactGA.pageview("/signup");
  };

  handlers = {
    errors: () => {
      return this.handlers.validate(
        this.state.email,
        this.state.password,
        this.state.firstName,
        this.state.lastName
      );
    },
    validate: (email, password, firstName, lastName) => {
      return {
        email: email.length === 0 || !email.includes("@"),
        password: password.length <= 4,
        firstName: firstName.length <= 1 || !isNaN(firstName),
        lastName: lastName.length <= 1 || !isNaN(lastName),
      };
    },
    change: (e) => {
      this.setState({ [e.target.name]: e.target.value });
    },
    blur: (field) => (e) => {
      this.setState({
        touched: { ...this.state.touched, [field]: true },
      });
    },
    getColour: (field) => {
      if (this.state.touched[field] && !this.handlers.errors()[field]) {
        return "#e8f0fe";
      }
      return "#f7f9fc";
    },
    handleSubmit: (e) => {
      if (!this.isDisabled) {
        e.preventDefault();
        return false;
      }
    },
    shouldMarkError: (field) => {
      const hasError = this.handlers.errors()[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    },
    helperText: (field) => {
      const hasError = this.handlers.errors()[field];
      const shouldShow = this.state.touched[field];
      if (hasError && shouldShow) {
        if (field === "password" && this.state.password.length === 0) {
          return "Invalid password";
        }
        if (field === "password") {
          return `Password must be longer than 5 characters`;
        } else {
          return "Invalid email";
        }
      }
    },
  };

  isDisabled = () =>
    Object.keys(this.handlers.errors()).some((x) => this.handlers.errors()[x]);

  registerUser = async () => {
    // TODO: check for errors before submitting

    const query = {
      query: `
        mutation {
          register(email: "${this.state.email}", firstName: "${this.state.firstName}", lastName: "${this.state.lastName}", password: "${this.state.password}") {
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
        "JWT": this.props.app.JWT,
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(IDENTITY_URL, options).then((data) => data.json());

    const { data, errors } = res.data.register;

    if (errors) {
      alert(errors[0].message);
    }

    if (data) {
      (async () => {
        await Promise.resolve();
        return localStorage.setItem(JWT, data.token);
      })().then(async () => {
        await this.props.refreshMe(true);
        this.props.history.push("/home");
      });
    }
  };

  render() {
    if (this.props.app.data.user) {
      return <Redirect to="/home"></Redirect>;
    }

    return (
      <div className="container">
        <div className="grid">
          <div className="grid-card">
            <h1 style={{ textAlign: "left", color: "#000", margin: "0" }}>
              Start your journey,
            </h1>
            <h2 style={{ textAlign: "left", color: "#707070", margin: "0" }}>
              the future of work is here
            </h2>
            <FormControl style={{ marginTop: "16pt", width: "100%" }}>
              <TextField
                InputLabelProps={{ style: { fontSize: 12 } }}
                label="First Name"
                fullWidth
                margin="normal"
                variant="outlined"
                name="firstName"
                error={this.handlers.shouldMarkError("firstName")}
                value={this.state.firstName}
                type="text"
                onChange={this.handlers.change}
                onBlur={this.handlers.blur("firstName")}
                style={{
                  marginTop: "16pt",
                }}
              />
              <TextField
                InputLabelProps={{ style: { fontSize: 12 } }}
                label="Last Name"
                fullWidth
                margin="normal"
                variant="outlined"
                name="lastName"
                error={this.handlers.shouldMarkError("lastName")}
                value={this.state.lastName}
                type="text"
                onChange={this.handlers.change}
                onBlur={this.handlers.blur("lastName")}
                style={{
                  marginTop: "8pt",
                }}
              />
              <TextField
                InputLabelProps={{ style: { fontSize: 12 } }}
                label="Email"
                fullWidth
                margin="normal"
                variant="outlined"
                name="email"
                error={this.handlers.shouldMarkError("email")}
                helperText={this.handlers.helperText("email")}
                value={this.state.email}
                type="email"
                onChange={this.handlers.change}
                onBlur={this.handlers.blur("email")}
                style={{
                  marginTop: "8pt",
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
                helperText={this.handlers.helperText("password")}
                value={this.state.password}
                type="password"
                onChange={this.handlers.change}
                onBlur={this.handlers.blur("password")}
                onKeyPress={async (e) => {
                  if (e.key === "Enter") {
                    await this.registerUser();
                  }
                }}
                style={{
                  marginTop: "8pt",
                  marginBottom: "8pt",
                }}
              />
              <button
                className="btn primarybtn"
                disabled={this.isDisabled() && !this.state.loading}
                onClick={async () => {
                  await this.registerUser();
                }}
                style={{
                  marginTop: "10px",
                  border: "none",
                }}
              >
                Sign up
              </button>
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

export default Register;
