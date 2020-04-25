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

// TODO: Disable login button while waiting for submit

import React, { Component } from "react";
import "./Login.scss";
import { Link, Redirect } from "react-router-dom";

import { Mutation } from "react-apollo";
import { JWT, USER_NAME, USERID } from "../../../constants";
import { LOGIN_MUTATION } from "../../../apollo/mutations";

import {
  Typography,
  Container,
  Button,
  StylesProvider,
  TextField,
  FormControl,
} from "@material-ui/core";
import global from "../../../global.module.scss";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      loading: false,

      touched: {
        email: false,
        password: false,
      },
    };
  }

  componentDidMount() {
    if (localStorage.getItem(JWT)) {
      this.setState({ loggedIn: true });
    }
  }

  errors() {
    return this.validate(this.state.email, this.state.password);
  }

  validate(email, password) {
    return {
      email: email.length === 0 || !email.includes("@"),
      password: password.length <= 4,
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

  isDisabled = () => Object.keys(this.errors()).some((x) => this.errors()[x]);

  _success = (data) => {
    this.setState({ loading: false });
    try {
      const { token } = data.login.data;
      const { firstName, _id } = data.login.data.user;
      this._saveUserData({ token, firstName, _id });
      this.props.history.push(`/setup`);
    } catch {
      alert("Invalid login");
    }
  };

  _error = (err) => {
    console.log(err);
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

    let { email, password } = this.state;
    return (
      <Container
        maxWidth="100vh"
        style={{
          background: "white",
          height: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          // style={{ height: "95.25vh" }}
          className="login-container"
        >
          <Container maxWidth="md">
            <Typography
              variant="h3"
              component="h1"
              style={{
                fontWeight: "bold",
                // marginTop: "48pt",
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
              sign in to continue
            </Typography>
            <FormControl
              style={{
                marginTop: "16pt",
                autocomplete: "off",
              }}
            >
              <TextField
                InputLabelProps={{ style: { fontSize: 12 } }}
                label="Email"
                fullWidth
                margin="normal"
                variant="outlined"
                name="email"
                error={this.shouldMarkError("email")}
                value={this.state.email}
                type="email"
                onChange={this.handleChange}
                onBlur={this.handleBlur("email")}
                style={{
                  marginTop: "8pt",
                  backgroundColor: this.getColour("email"),
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
                value={this.state.password}
                type="password"
                onChange={this.handleChange}
                onBlur={this.handleBlur("password")}
                style={{
                  marginTop: "8pt",
                  marginBottom: "8pt",
                  backgroundColor: this.getColour("password"),
                }}
              />
              <StylesProvider injectFirst>
                <Mutation
                  mutation={LOGIN_MUTATION}
                  variables={{ email, password }}
                  onCompleted={(data) => this._success(data)}
                  onError={(err) => this._error(err)}
                >
                  {(mutation) => (
                    <Button
                      className={`${global.btn} ${global.primarybtn}`}
                      disabled={this.isDisabled()}
                      onClick={mutation}
                      style={{ marginTop: "10px" }}
                    >
                      Sign in
                    </Button>
                  )}
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
                  <span> |||||| </span>
                  <Link
                    to="/signup"
                    style={{
                      marginTop: "8pt",
                      textDecoration: "none",
                      color: "lightgrey",
                    }}
                  >
                    <a style={{ color: "lightgrey", textDecoration: "none" }}>
                      Create account
                    </a>{" "}
                  </Link>
                </div>
              </StylesProvider>
            </FormControl>
          </Container>
        </Container>
      </Container>
    );
  }
}

export default Login;
