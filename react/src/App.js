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

import React, {
  Component,
  lazy,
  Suspense
} from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import {
  LinearProgress
} from '@material-ui/core';

import Backdrop from './components/Backdrop/Backdrop';
import SideDrawer from './components/Sidedrawer/Sidedrawer';
import { Toolbar } from './components/Toolbar/Toolbar.js';
import PrivateRoute from './PrivateRoute';

import './App.scss';

const Login = lazy(() => import('./components/LandingPage/Login/Login'));
const LandingPage = lazy(() => import('./components/LandingPage/LandingPage'));
const Register = lazy(() => import('./components/LandingPage/Register/Register'));
const Setup = lazy(() => import('./components/LandingPage/InitalSetup/Setup'));
const Review = lazy(() => import('./components/Review/Review'));
const ThankYou = lazy(() => import('./components/Review/ThankYou/ThankYou'))

class App extends Component {
  state = {
    sideDrawerOpen: false,
    auth: true
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false })
  };



  render() {
    let backDrop;

    if (this.state.sideDrawerOpen) {
      backDrop = <Backdrop click={this.backdropClickHandler} />
    }

    return (
      <Router>
        <div className="App" style={{ height: '100%' }}>
          <div className="navBar">
            <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
            <main style={{ marginTop: '48px' }}>
              <SideDrawer
                show={this.state.sideDrawerOpen}
                click={this.backdropClickHandler}
              />
              {backDrop}
            </main>
          </div>

          <Suspense fallback={<LinearProgress style={{ top: '16px' }}/>}>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Register} />
            <PrivateRoute exact path="/setup" component={Setup} authed={this.state.auth}/>
            <PrivateRoute exact path="/self-review" component={Review} authed={this.state.auth}/>
            <PrivateRoute exact path="/thank-you" component={ThankYou} authed={this.state.auth}/>
          </Suspense>
        </div>
      </Router>
    );
  }
}

export default App;
