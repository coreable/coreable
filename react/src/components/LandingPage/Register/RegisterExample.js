import React from "react";
// import ReactDOM from "react-dom";
// import {
//     BrowserRouter as Router,
//     Route,
//     Link  } from 'react-router-dom';
import '../Login/LoginExample.css';

//apollo / graphQl
import { Mutation } from 'react-apollo'
import { AUTH_TOKEN } from '../../../constants'

import { SIGNUP_MUTATION } from  '../../../Queries'

function validate(email, password, firstname, lastname) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0 || !email.includes("@"),
    password: password.length <= 4,
    firstname: firstname.length <= 1,
    lastname: lastname.length <= 1
  };
}

class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",

      touched: {
        email: false,
        password: false,
        firstname: false,
        lastname: false
      }
    };
  }

  handleEmailChange = evt => {
    this.setState({ email: evt.target.value });
  };

  handlePasswordChange = evt => {
    this.setState({ password: evt.target.value });
  };
  
  handleFirstnameChange = evt => {
    this.setState({ firstname: evt.target.value });
  };

  handleLastnameChange = evt => {
    this.setState({ lastname: evt.target.value });
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
    const errors = validate(this.state.email, this.state.password, this.state.firstname, this.state.lastname);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const errors = validate(this.state.email, this.state.password, this.state.firstname, this.state.lastname);
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const { email, password, firstname, lastname} = this.state

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
                        value={email}
                        onChange={this.handleEmailChange}
                        onBlur={this.handleBlur("email")}
                        />
                    <label htmlFor="username"> Password </label>
                        <input
                        className={shouldMarkError("password") ? "error" : ""}
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={this.handlePasswordChange}
                        onBlur={this.handleBlur("password")}
                        />
                     <label htmlFor="username"> First name </label>
                        <input
                        className={shouldMarkError("firstname") ? "error" : ""}
                        type="text"
                        placeholder="Enter first name"
                        value={firstname}
                        onChange={this.handleFirstnameChange}
                        onBlur={this.handleBlur("firstname")}
                        />
                     <label htmlFor="username"> Last name </label>
                        <input
                        className={shouldMarkError("lastname") ? "error" : ""}
                        type="text"
                        placeholder="Enter last name"
                        value={lastname}
                        onChange={this.handleLastnameChange}
                        onBlur={this.handleBlur("lastname")}
                        />
                    {/* <button disabled={isDisabled}>Sign up</button> */}
                    
                    <Mutation
                        mutation={SIGNUP_MUTATION}
                        variables={{email, password, firstname, lastname }}
                        onCompleted={data => this._confirm(data)}
                    >
                        {mutation => (
                        <button type="button" className="btn-login" disabled={isDisabled} onClick={mutation}>
                            Sign up
                        </button>
                        )}
                    </Mutation>
                    
                    
                    
                    {/* <Link to="/setup"> <button type="button" className="btn-login" disabled={isDisabled} > Login </button> </Link>
                    <Link to="/register"> <button type="button" className="btn-sign-up"> Sign up </button> </Link> */}
                    <a className="forgotPassword" href="/"> Forgot password </a>
                </form>
            </div>
        </div>
    );
  }

  _confirm = async data => {
   
    try {
        const { token } = data.register.data
            this._saveUserData(token)
            alert(`Thank you for signing up ${data.register.data.user.firstName}`)
            this.props.history.push(`/setup`)
      } catch {
        alert('Invalid signup');
      }
  }
  
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }
  
}



export default RegisterForm;