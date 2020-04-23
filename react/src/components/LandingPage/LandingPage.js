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

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Container,
  Button,
  StylesProvider
} from '@material-ui/core';
import './LandingPage.scss';

class LandingPage extends Component {
  render() {
    return (
      <Container maxWidth="xl" style={{ backgroundColor: '#0b152f', height: '95.25vh' }} className="landing-container">
        <StylesProvider injectFirst>
          <Typography variant="h3" component="h2" style={{ fontWeight: 'bold', marginTop: '48pt' }}>
            Welcome to Coreable
        </Typography>
          <Typography variant="h6" style={{ marginTop: '32pt', color: '#707070' }} >
            Create an account or sign in to manage <br /> your Coreable account and review others.
        </Typography>
          <Container maxWidth="xl" style={{ marginTop: '48pt' }}>
            <Link to="/login">
              <Button className="btn-login">
                Log In
              </Button>
            </Link>
          </Container>
          <Container maxWidth="xl" style={{ marginTop: '8pt' }}>
            <Link to="/signup">
              <Button className="btn-sign-up">
                Sign Up
            </Button>
            </Link>
          </Container>
        </StylesProvider>
      </Container>
    );
  }
}

export default LandingPage;
