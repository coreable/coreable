import React, { Component } from "react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

import { JWT } from "../../constants";

import Navbar from "../Navbar2/Navbar";

export class Skills extends Component {
  constructor() {
    super();

    // TODO: move to props
    const AUTH_TOKEN = localStorage.getItem(JWT);

    this.state = {
      sideDrawerOpen: false,
      inviteCode: "",
      isLoading: true,
      loggedIn: !!AUTH_TOKEN,
      me: {
        teams: [],
      },
    };
  }

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/"></Redirect>;
    }

    return <div></div>;
  }
}

export default Skills;
