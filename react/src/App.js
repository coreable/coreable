import React, { Component } from 'react';


import './App.css';
import {
  BrowserRouter as Router,
  Route
  // Link  
} from 'react-router-dom';
import Toolbar from './components/Toolbar/Toolbar.js';
import Backdrop from './components/Backdrop/Backdrop';
import SideDrawer from './components/Sidedrawer/Sidedrawer';
// import Login from './components/LandingPage/Login/Login';
import LandingPage from './components/LandingPage/LandingPage';
import Register from './components/LandingPage/Register/Register';
import Setup from './components/LandingPage/Setup';
import LoginTest from './components/LandingPage/Login/LoginExample';
import RegisterExample from './components/LandingPage/Register/RegisterExample';

import SelfReview from './components/SelfReview/SelfReview';
import Initiative from './components/SelfReview/Initiative/Initiative';
import Trust from './components/SelfReview/Trust/Trust';
import Flexibility from './components/SelfReview/Flexibility/Flexibility';
import Resilience from './components/SelfReview/Resilience/Resilience';

import ThankYou from './components/SelfReview/ThankYou';


class App extends Component {

  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
   this.setState((prevState) => {
     return {sideDrawerOpen: !prevState.sideDrawerOpen};
   });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false})
  };


  render(){
      // let sideDrawer;
      let backDrop;

      if(this.state.sideDrawerOpen) {
        // sideDrawer = <SideDrawer />;
        backDrop = <Backdrop click={this.backdropClickHandler}/>
      }
    return (

      <Router>
        <div className="App" style={{height:'100%'}}>
        <div className="navBar">
            <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/>
            <main style={{marginTop:'48px'}}>
              <SideDrawer 
              show={this.state.sideDrawerOpen} 
              click={this.backdropClickHandler}
              />
              {backDrop}
            </main>
        </div>

        <Route exact path="/" component={LandingPage} />
        {/* <Route exact path="/" render = {props => (
          <LandingPage />
        )}>     
        </Route> */}

        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/setup" component={Setup} />
        <Route exact path="/loginexample" component={LoginTest} />
        <Route exact path="/registerexample" component={RegisterExample} />

        <Route exact path="/self-review" component={SelfReview} />
        <Route exact path="/initiative" component={Initiative} />
        <Route exact path="/trust" component={Trust} />
        <Route exact path="/flexibility" component={Flexibility} />
        <Route exact path="/resilience" component={Resilience} />
        <Route exact path="/thank-you" component={ThankYou}/>
        </div>
      </Router>

    );
  }
}

export default App;
