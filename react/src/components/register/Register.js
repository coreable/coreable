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

import React, { useState, useEffect } from "react";
import "../LandingPage/LandingPage.scss";
import { Link, Redirect } from "react-router-dom";
import {
  Container,
  FormContainer,
  Header,
  Form,
  InputContainer,
  Input,
  ErrorMessage,
  ButtonContainer,
  Button,
} from "../login/login-style";
import { JWT, IDENTITY_URL } from "../../constants";

const Register = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstnameError, setFirstnameError] = useState({});
  const [lastnameError, setLastnameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});

  useEffect(() => {
    props.ReactGA.pageview("/signup");
  }, []);

  const registerUser = async () => {
    const query = {
      query: `
        mutation {
          register(email: "${email}", firstName: "${firstname}", lastName: "${lastname}", password: "${password}") {
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

    const { data, errors } = res.data.register;

    if (errors) {
      alert(errors[0].message);
    }

    if (data) {
      (async () => {
        await Promise.resolve();
        return localStorage.setItem(JWT, data.token);
      })().then(async () => {
        await props.refreshMe(true);
        props.history.push("/home");
      });
    }
  };

  const handlers = {
    errors: () => {
      return handlers.validate(email, password, firstname, lastname);
    },
    validate: (email, password, firstName, lastName) => {
      return {
        email: email.length >= 5 || email.includes("@"),
        password: password.length >= 4,
        firstName: firstName.length >= 1 || isNaN(firstName),
        lastName: lastName.length >= 1 || isNaN(lastName),
      };
    },
    change: (e) => {
      e.target.name === "firstname" && setFirstname(e.target.value);
      e.target.name === "lastname" && setLastname(e.target.value);
      e.target.name === "email" && setEmail(e.target.value);
      e.target.name === "password" && setPassword(e.target.value);
    },
    blur: (e) => {
      if (!e.target.value) {
        if (e.target.name === "firstname") {
          setFirstnameError({
            error: true,
            message: "Invalid firstname",
          });
        }
        if (e.target.name === "lastname") {
          setLastnameError({
            error: true,
            message: "Invalid lastname",
          });
        }
        if (e.target.name === "email") {
          setEmailError({
            error: true,
            message: "Invalid email",
          });
        }
        if (e.target.name === "password") {
          setPasswordError({
            error: true,
            message: "Invalid password",
          });
        }
      } else {
        if (e.target.name === "firstname") setFirstnameError({});
        if (e.target.name === "lastname") setLastnameError({});
        if (e.target.name === "email") setEmailError({});
        if (e.target.name === "password") setPasswordError({});
      }
    },
    handleSubmit: (e) => {
      const result = handlers.errors();
      for (let key in handlers.errors()) {
        if (!result[key]) {
          setFirstnameError({
            error: true,
            message: "Invalid firstname",
          });
          setLastnameError({
            error: true,
            message: "Invalid lastname",
          });
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
      }
      registerUser();
    },
  };

  if (props.app.data.user) {
    return <Redirect to="/home"></Redirect>;
  }

  return (
    <Container>
      <FormContainer>
        <Header fontSize={"2.4"} fontWeight={600}>
          Start your journey,
        </Header>
        <Header fontSize={"1.6"} fontWeight={500}>
          Future of work is here
        </Header>
        <Form>
          <InputContainer>
            <Header fontSize={"1.6"} fontWeight={400}>
              Firstname
            </Header>
            <Input
              placeholder="Enter your firstname"
              name="firstname"
              type="text"
              onChange={handlers.change}
              onBlur={handlers.blur}
              error={firstnameError.error}
            />
            <ErrorMessage>
              {firstnameError.error && firstnameError.message}
            </ErrorMessage>
          </InputContainer>
          <InputContainer>
            <Header fontSize={"1.6"} fontWeight={400}>
              Lastname
            </Header>
            <Input
              placeholder="Enter your lastname"
              name="lastname"
              type="text"
              onChange={handlers.change}
              onBlur={handlers.blur}
              error={lastnameError.error}
            />
            <ErrorMessage>
              {lastnameError.error && lastnameError.message}
            </ErrorMessage>
          </InputContainer>
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
              onKeyPress={async (e) => {
                if (e.key === "Enter") {
                  await registerUser();
                }
              }}
            />
            <ErrorMessage>
              {passwordError.error && passwordError.message}
            </ErrorMessage>
          </InputContainer>
          <ButtonContainer>
            <Button backgroundColor={"secondary"} type="button">
              <Link to="/" style={{ color: "white" }}>
                Login
              </Link>
            </Button>
            <Button
              backgroundColor={"primary"}
              onClick={handlers.handleSubmit}
              type="button"
            >
              Sign up
            </Button>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Register;
