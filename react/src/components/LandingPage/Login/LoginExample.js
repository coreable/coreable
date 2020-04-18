import React from "react";
import {
  Link
} from 'react-router-dom';
import './LoginExample.css';

//apollo / graphQl
import { Mutation } from 'react-apollo'
import { JWT, USER_NAME, USERID } from '../../../constants'

import { LOGIN_MUTATION } from '../../../Queries';

// const LOGIN_MUTATION = gql`
//     mutation LoginMutation($email: String!, $password: String!){
//         login(email:$email, password: $password) {
//             data {
//                 user {
//                     firstName
//                     email
//                     _id
//                     }
//                 token
//                 }
//                 errors {
//                     code
//                     path
//                     message
//                 }
//         }
//   }
// `

function validate(email, password) {
  // true means invalid, so our conditions got reversed
  return {
    email: email.length === 0 || !email.includes("@"),
    password: password.length <= 4
  };
}

class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      name: "",

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
    const { email, password } = this.state;

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <div className="login-page">
        <div className="base-container">
          <div>
            <h1> Welcome, <br /> <span className="span"> sign in to continue </span></h1>
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
            {/* <button disabled={isDisabled}>Sign up</button> */}
            {/* <Link to="/setup"> <button type="button" className="btn-login" disabled={isDisabled} > Login </button> </Link> */}

            <Mutation
              mutation={LOGIN_MUTATION}
              variables={{ email, password }}
              onCompleted={data => this._confirm(data)}
            >
              {mutation => (
                <button type="button" className="btn-login" disabled={isDisabled} onClick={mutation}>
                  Login
                </button>
              )}
            </Mutation>

            <Link to="/register"> <button type="button" className="btn-sign-up"> Sign up </button> </Link>
            <a className="forgotPassword" href="/"> Forgot password </a>
          </form>
        </div>
      </div>
    );
  }


  _confirm = async data => {
    try {
      const { token } = data.login.data
      const { firstName, _id } = data.login.data.user
      this._saveUserData({ token, firstName, _id })
      // this._saveUserData(firstName)
      // alert(`Welcome ${data.login.data.user.firstName}`)
      this.setState({ name: firstName })
      alert(`${this.state.name}`)
      this.props.history.push(`/setup`)
    }
    catch {
      alert('Invalid login');
    }
  }

  _saveUserData = ({ token, firstName, _id }) => {
    localStorage.setItem(JWT, token)
    localStorage.setItem(USER_NAME, firstName)
    localStorage.setItem(USERID, _id)
  }

}



//binding GraphQl with this component
export default (LoginForm);


