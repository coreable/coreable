import React, { Component } from "react";
import {
  Redirect
} from "react-router-dom";

export class Skills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideDrawerOpen: false,
      inviteCode: "",
      isLoading: true,
      loggedIn: !!props.me,
      me: {
        teams: [],
      },
    };
  }

  render() {
    if (!this.state.loggedIn) {
      return <Redirect to="/"></Redirect>;
    }
    return (
      <div>

      </div>
    );
  }
}

export default Skills;
