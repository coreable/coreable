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

import './App.scss';

const Login = lazy(() => import('./components/LandingPage/Login/Login'));
const LandingPage = lazy(() => import('./components/LandingPage/LandingPage'));
const Register = lazy(() => import('./components/LandingPage/Register/Register'));
const Setup = lazy(() => import('./components/LandingPage/InitalSetup/Setup'));
const SelfReview = lazy(() => import('./components/SelfReview/SelfReview'));


// import Setup from './components/LandingPage/Setup';
// import SelfReview from './components/SelfReview/SelfReview';
// import Initiative from './components/SelfReview/Initiative/Initiative';
// import Trust from './components/SelfReview/Trust/Trust';
// import Flexibility from './components/SelfReview/Flexibility/Flexibility';
// import Resilience from './components/SelfReview/Resilience/Resilience';
// import ThankYou from './components/SelfReview/ThankYou';

class App extends Component {
  state = {
    sideDrawerOpen: false
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
            <Route exact path="/setup" component={Setup} />
            <Route exact path="/self-review" component={SelfReview} />
          </Suspense>

          {/* <Route exact path="/setup" component={Setup} />
          <Route exact path="/initiative" component={Initiative} />
          <Route exact path="/trust" component={Trust} />
          <Route exact path="/flexibility" component={Flexibility} />
          <Route exact path="/resilience" component={Resilience} />
          <Route exact path="/thank-you" component={ThankYou} /> */}
        </div>
      </Router>
    );
  }
}

export default App;
