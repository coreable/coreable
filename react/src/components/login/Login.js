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

import React, { useEffect, useState } from "react";
import "../LandingPage/LandingPage.scss";
import { Link, Redirect } from "react-router-dom";
import { JWT, IDENTITY_URL } from "../../constants";
import {
  Container,
  FormContainer,
  Header,
  Form,
  InputContainer,
  Input,
  ButtonContainer,
  Button,
  ErrorMessage,
} from "./login-style";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  useEffect(() => {
    props.ReactGA.pageview("/login");
  }, []);

  const loginUser = async () => {
    const query = {
      query: `
        mutation {
          userLogin(email: "${email}", password: "${password}") {
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
        JWT: props.app.JWT,
      },
      body: JSON.stringify(query),
    };

    const res = await fetch(IDENTITY_URL, options).then((data) => data.json());
    const { data, errors } = res.data.userLogin;

    if (errors) alert(errors[0].message);

    if (data) {
      (async () => {
        await Promise.resolve();
        return localStorage.setItem(JWT, data.token);
      })().then(async () => {
        await props.refreshMe(true);
      });
    }
  };

  const handlers = {
    change: (e) => {
      e.target.name === "email" && setEmail(e.target.value);
      e.target.name === "password" && setPassword(e.target.value);
    },
    blur: (e) => {
      if (!e.target.value) {
        if (e.target.name === "email") {
          setEmailError({
            error: true,
            message: "Invalid email",
          });
        } else {
          setPasswordError({
            error: true,
            message: "Invalid password",
          });
        }
      } else {
        if (e.target.name === "email") setEmailError({});
        if (e.target.name === "password") setPasswordError({});
      }
    },
    submit: () => {
      if (!email || !password) {
        setEmailError({
          error: true,
          message: "Invalid email",
        });
        setPasswordError({
          error: true,
          message: "Invalid password",
        });
        return;
      }
      loginUser();
    },
  };

  if (props.app.data.user) {
    return <Redirect to="/home" />;
  }

  return (
    <Container>
      <FormContainer>
        <Header fontSize={"2.4"} fontWeight={600}>
          Welcome,
        </Header>
        <Header fontSize={"1.6"} fontWeight={500}>
          Login to start
        </Header>
        <Form>
          <InputContainer>
            <Header fontSize={"1.6"} fontWeight={400}>
              Email
            </Header>
            <Input
              placeholder="Enter your email"
              name="email"
              type="text"
              onChange={handlers.change}
              onBlur={handlers.blur}
              error={emailError.error}
            />
            <ErrorMessage>
              {emailError.error && emailError.message}
            </ErrorMessage>
          </InputContainer>
          <InputContainer>
            <Header fontSize={"1.6"} fontWeight={400}>
              Password
            </Header>
            <Input
              placeholder="Enter your password"
              name="password"
              type="password"
              onChange={handlers.change}
              onBlur={handlers.blur}
              error={passwordError.error}
            />
            <ErrorMessage>
              {passwordError.error && passwordError.message}
            </ErrorMessage>
          </InputContainer>
          <ButtonContainer>
            <Button backgroundColor={"secondary"} type="button">
              <Link to="/signup" style={{ color: "white" }}>
                Sign up
              </Link>
            </Button>
            <Button
              backgroundColor={"primary"}
              onClick={handlers.submit}
              type="button"
            >
              Login
            </Button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Login;
