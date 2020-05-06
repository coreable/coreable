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

import React, { Component } from "react";
import "./Login.scss";
import { Link, Redirect } from "react-router-dom";
import { JWT, API_URL } from "../../../constants";

import {
  Typography,
  Container,
  Button,
  StylesProvider,
  TextField,
  FormControl,
} from "@material-ui/core";
import "../../../global.scss";

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

  componentDidMount = () => {
    this.props.ReactGA.pageview('/login');
  }

  errors = () => {
    return this.validate(this.state.email, this.state.password);
  }

  validate = (email, password) => {
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

  loginUser = async () => {
    const query = {
      query: `
        mutation {
          login(email: "${this.state.email}", password: "${this.state.password}") {
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
      `
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        JWT: localStorage.getItem(JWT) || '',
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(API_URL, options).then((data) => data.json());
    const { data, errors } = res.data.login;

    if (errors) {
      console.error(errors);
      alert(errors[0].message);
    }

    if (data) {
      localStorage.setItem(JWT, data.token);
      this.props.refreshMe();
    }
  }

  render() {
    if (this.props.me) {
      return <Redirect to="/home"></Redirect>;
    }

    return (
      <Container
        maxWidth={false}
        style={{
          background: "white",
          height: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          className="login-container"
        >
          <Container maxWidth="md">
            <Typography
              variant="h3"
              component="h1"
              style={{
                fontWeight: "bold",
                textAlign: "left",
                color: "#000",
              }}
            >Welcome,</Typography>
            <Typography
              variant="h3"
              component="h1"
              style={{ textAlign: "left", color: "#707070" }}
            >sign in to continue</Typography>
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
                onKeyPress={async (e) => {
                  if (e.key === "Enter") {
                    await this.loginUser();
                  }
                }}
                style={{
                  marginTop: "8pt",
                  marginBottom: "8pt"
                }}
              />
              <StylesProvider injectFirst>
                <Button
                  className="btn primarybtn"
                  disabled={this.isDisabled()}
                  onClick={async () => {
                    await this.loginUser();
                  }}
                  style={{ marginTop: "10px" }}
                >Login</Button>
                <div style={{ marginTop: "15px" }}>
                  <Link
                    to="/forgot"
                    style={{
                      marginTop: "8pt",
                      textDecoration: "none",
                      color: "lightgrey",
                    }}
                  >Forgot password</Link>
                  <span> |||||| </span>
                  <Link
                    to="/signup"
                    style={{
                      marginTop: "8pt",
                      textDecoration: "none",
                      color: "lightgrey",
                    }}
                  >Create account</Link>
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
