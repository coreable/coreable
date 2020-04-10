import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Link  } from 'react-router-dom';
import './LoginExample.css';

function validate(email, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0 || !email.includes("@"),
    password: password.length <= 4
  };
}

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",

      touched: {
        email: false,
        password: false
      }
    };
  }

  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };

  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleSubmit = evt => {
    if (!this.canBeSubmitted()) {
      evt.preventDefault();
      return;
    }
    const { email, password } = this.state;
    alert(`Signed up with email: ${email} password: ${password}`);
  };

  canBeSubmitted() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = validate(this.state.email, this.state.password);
    const isDisabled = Object.keys(errors).some(x => errors[x]);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
        <div className="login-page">
            <div className="base-container">
                <div>
                    <h1> Welcome, <br/> <span className="span"> sign in to continue </span></h1>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="username" > Email </label>
                    <input
                    className={shouldMarkError("email") ? "error" : ""}
                    type="text"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                    onBlur={this.handleBlur("email")}
                    />
                    <label htmlFor="username"> Password </label>
                    <input
                    className={shouldMarkError("password") ? "error" : ""}
                    type="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                    onBlur={this.handleBlur("password")}
                    />
                    {/* <button disabled={isDisabled}>Sign up</button> */}
                    <Link to="/setup"> <button type="button" className="btn-login" disabled={isDisabled} > Login </button> </Link>
                    <Link to="/register"> <button type="button" className="btn-sign-up"> Sign up </button> </Link>
                    <a className="forgotPassword" href=""> Forgot password </a>
                </form>
            </div>
        </div>
    );
  }
}

export default SignUpForm;