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

// TODO: Disable register button while waiting for submit

import React, { Component } from "react";
import "../../App.scss";
import "../login/Login.scss";
import { Link, Redirect } from "react-router-dom";
import { JWT, API_URL } from "../../constants";

import {
  Typography,
  Container,
  TextField,
  FormControl,
} from "@material-ui/core";

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

  errors = () => {
    return this.validate(
      this.state.email,
      this.state.password,
      this.state.firstName,
      this.state.lastName
    );
  };

  validate = (email, password, firstName, lastName) => {
    return {
      email: email.length === 0 || !email.includes("@"),
      password: password.length < 6,
      firstName: firstName.length <= 1,
      lastName: lastName.length <= 1,
    };
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  getColour = (field) => {
    if (this.state.touched[field] && !this.errors()[field]) {
      return "#e8f0fe";
    }
    return "#f7f9fc";
  };

  handleSubmit = (evt) => {
    if (!this.isDisabled) {
      evt.preventDefault();
      return false;
    }
  };

  shouldMarkError = (field) => {
    const hasError = this.errors()[field];
    const shouldShow = this.state.touched[field];
    return hasError ? shouldShow : false;
  };

  helperText = (field) => {
    const hasError = this.errors()[field];
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
  };

  isDisabled = () => Object.keys(this.errors()).some((x) => this.errors()[x]);

  registerUser = async () => {
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
        JWT: this.props.app.JWT,
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(API_URL, options).then((data) => data.json());

    const { data, errors } = res.data.register;

    if (errors) {
      console.error(errors);
      alert(errors[0].message);
    }

    if (data) {
      (async () => {
        await Promise.resolve();
        return localStorage.setItem(JWT, data.token);
      })().then(async () => {
        await this.props.refreshMe(true);
      });
    }
  };

  render() {
    if (this.props.app.data.user) {
      return <Redirect to="/home"></Redirect>;
    }

    return (
      <Container maxWidth={false} style={{ height: "100vh" }}>
        <div className="container">
          {/* <Container maxWidth="md"> */}
          <Typography
            variant="h3"
            component="h1"
            style={{
              fontWeight: "bold",
              textAlign: "left",
              color: "#000",
            }}
          >
            Welcome,
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            style={{ textAlign: "left", color: "#707070" }}
          >
            sign up to continue
          </Typography>
          <FormControl style={{ marginTop: "16pt" }}>
            <TextField
              InputLabelProps={{ style: { fontSize: 12 } }}
              label="First Name"
              fullWidth
              margin="normal"
              variant="outlined"
              name="firstName"
              error={this.shouldMarkError("firstName")}
              value={this.state.firstName}
              type="text"
              onChange={this.handleChange}
              onBlur={this.handleBlur("firstName")}
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
              error={this.shouldMarkError("lastName")}
              value={this.state.lastName}
              type="text"
              onChange={this.handleChange}
              onBlur={this.handleBlur("lastName")}
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
              error={this.shouldMarkError("email")}
              helperText={this.helperText("email")}
              value={this.state.email}
              type="email"
              onChange={this.handleChange}
              onBlur={this.handleBlur("email")}
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
              error={this.shouldMarkError("password")}
              helperText={this.helperText("password")}
              value={this.state.password}
              type="password"
              onChange={this.handleChange}
              onBlur={this.handleBlur("password")}
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
          {/* </Container> */}
        </div>
      </Container>
    );
  }
}

export default Register;
