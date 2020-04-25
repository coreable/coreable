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
import "./Register.scss";
import { Link, Redirect } from "react-router-dom";

import { Mutation } from "react-apollo";
import { JWT, USER_NAME, USERID } from "../../../constants";
import { SIGNUP_MUTATION } from "../../../apollo/mutations";

import {
  Typography,
  Container,
  Button,
  TextField,
  FormControl,
} from "@material-ui/core";
import global from "../../../global.module.scss";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      loggedIn: false,
      loading: false,

      touched: {
        email: false,
        password: false,
        firstname: false,
        lastname: false,
      },
    };
  }

  componentDidMount() {
    if (localStorage.getItem(JWT)) {
      this.setState({ loggedIn: true });
    }
  }

  errors() {
    return this.validate(
      this.state.email,
      this.state.password,
      this.state.firstname,
      this.state.lastname
    );
  }

  validate(email, password, firstname, lastname) {
    return {
      email: email.length === 0 || !email.includes("@"),
      password: password.length <= 4,
      firstname: firstname.length <= 1,
      lastname: lastname.length <= 1,
    };
  }

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

  shouldMarkError(field) {
    const hasError = this.errors()[field];
    const shouldShow = this.state.touched[field];
    return hasError ? shouldShow : false;
  }

  helperText(field) {
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
  }

  isDisabled = () => Object.keys(this.errors()).some((x) => this.errors()[x]);

  _success = (data) => {
    this.setState({ loading: false });
    try {
      const { token } = data.register.data;
      const { firstName, _id } = data.register.data.user;
      this._saveUserData({ token, firstName, _id });
      this.props.history.push(`/setup`);
    } catch (err) {
      alert("Invalid signup");
    }
  };

  _error = (err) => {
    console.error(err);
  };

  _saveUserData = ({ token, firstName, _id }) => {
    localStorage.setItem(JWT, token);
    localStorage.setItem(USER_NAME, firstName);
    localStorage.setItem(USERID, _id);
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/home"></Redirect>;
    }

    let { email, password, firstname, lastname } = this.state;
    return (
      <Container
        maxWidth="100vh"
        style={{ height: "100vh" }}
        className="sign-up-container"
      >
        <Container maxWidth="sm">
          <Typography
            variant="h3"
            component="h1"
            style={{
              fontWeight: "bold",
              marginTop: "48pt",
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
              name="firstname"
              error={this.shouldMarkError("firstname")}
              value={this.state.firstname}
              type="text"
              onChange={this.handleChange}
              onBlur={this.handleBlur("firstname")}
              style={{
                marginTop: "8pt",
                // backgroundColor: this.getColour("firstname"),
              }}
            />
            <TextField
              InputLabelProps={{ style: { fontSize: 12 } }}
              label="Last Name"
              fullWidth
              margin="normal"
              variant="outlined"
              name="lastname"
              error={this.shouldMarkError("lastname")}
              value={this.state.lastname}
              type="text"
              onChange={this.handleChange}
              onBlur={this.handleBlur("lastname")}
              style={{
                marginTop: "8pt",
                // backgroundColor: this.getColour("lastname"),
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
                // backgroundColor: this.getColour("email"),
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
              //testing code
              helperText={this.helperText("password")}
              value={this.state.password}
              type="password"
              onChange={this.handleChange}
              onBlur={this.handleBlur("password")}
              style={{
                marginTop: "8pt",
                marginBottom: "8pt",
                // backgroundColor: this.getColour("password"),
              }}
            />
            <Mutation
              mutation={SIGNUP_MUTATION}
              variables={{ email, password, firstname, lastname }}
              onCompleted={(data) => this._success(data)}
              onError={(err) => this._error(err)}
            >
              {(mutation, { _, loading, __ }) => {
                return (
                  <Button
                    className={`${global.btn} ${global.primarybtn}`}
                    disabled={this.isDisabled() && !this.state.loading}
                    onClick={mutation}
                    style={{ marginTop: "10px" }}
                  >
                    Sign up
                  </Button>
                );
              }}
            </Mutation>
            <div style={{ marginTop: "15px" }}>
              <Link
                to="/forgot"
                style={{
                  marginTop: "8pt",
                  textDecoration: "none",
                  color: "lightgrey",
                }}
              >
                <a style={{ color: "lightgrey", textDecoration: "none" }}>
                  Forgot password
                </a>
              </Link>
            </div>
          </FormControl>
        </Container>
      </Container>
    );
  }
}

export default Register;
