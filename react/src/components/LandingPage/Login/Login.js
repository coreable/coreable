import React, { Component } from "react";
import './Login.scss';
import { Link, Redirect } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import { JWT, USER_NAME, USERID } from '../../../constants';
import { LOGIN_MUTATION } from '../../../apollo/mutations';

import {
  Typography,
  Container,
  Button,
  StylesProvider,
  TextField,
  FormControl
} from '@material-ui/core';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      loading: false,

      touched: {
        email: false,
        password: false
      }
    };
  }

  componentDidMount() {
    if (localStorage.getItem(JWT)) {
      this.setState({ loggedIn: true });
    }
  }

  errors() {
    return this.validate(this.state.email, this.state.password);
  }

  validate(email, password) {
    return {
      email: email.length === 0 || !email.includes("@"),
      password: password.length <= 4
    };
  };

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  handleBlur = field => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  getColour = (field) => {
    if (this.state.touched[field] && !this.errors()[field]) {
      return '#e8f0fe';
    }
    return '#f7f9fc';
  }

  handleSubmit = (evt) => {
    if (!this.isDisabled) {
      evt.preventDefault();
      return false;
    }
  };

  shouldMarkError(field) {
    const hasError = this.errors()[field];
    const shouldShow = this.state.touched[field];
    return hasError ? shouldShow : false;
  };

  isDisabled = () => Object.keys(this.errors()).some(x => this.errors()[x]);

  _success = (data) => {
    this.setState({ loading: false });
    try {
      const { token } = data.login.data;
      const { firstName, _id } = data.login.data.user;
      this._saveUserData({ token, firstName, _id });
      this.props.history.push(`/setup`);
    } catch {
      alert('Invalid login');
    }
  }

  _error = (err) => {
    console.log(err);
  }

  _saveUserData = ({ token, firstName, _id }) => {
    localStorage.setItem(JWT, token);
    localStorage.setItem(USER_NAME, firstName);
    localStorage.setItem(USERID, _id);
  }

  render() {
    if (this.state.loggedIn) {
      return (<Redirect to="/setup"></Redirect>);
    }

    let { email, password } = this.state;
    return (
      <Container maxWidth="xl" style={{ height: '95.25vh' }} className="login-container">
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" style={{ fontWeight: 'bold', marginTop: '48pt', textAlign: 'left', color: '#000' }}>
            Welcome,
          </Typography>
          <Typography variant="h3" component="h1" style={{ textAlign: 'left', color: '#707070' }}>
            sign in to continue
          </Typography>
          <FormControl style={{ marginTop: '16pt' }}>
            <TextField
              label="Email"
              placeholder="Enter email"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="email"
              error={this.shouldMarkError("email")}
              value={this.state.email}
              type="email"
              required
              onChange={this.handleChange}
              onBlur={this.handleBlur("email")}
              style={{ marginTop: '8pt', backgroundColor: this.getColour("email") }}
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="password"
              error={this.shouldMarkError("password")}
              value={this.state.password}
              type="password"
              required
              onChange={this.handleChange}
              onBlur={this.handleBlur("password")}
              style={{ marginTop: '8pt', marginBottom: '8pt', backgroundColor: this.getColour("password") }}
            />
            <StylesProvider injectFirst>
              <Mutation
                mutation={LOGIN_MUTATION}
                variables={{ email, password }}
                onCompleted={data => this._success(data)}
                onError={err => this._error(err)}
              >
                { mutation => (
                  <Button className="btn-login" disabled={this.isDisabled()} onClick={mutation}>
                    Sign in
                  </Button>
                )}
              </Mutation>
              <Link to="/forgot" style={{ marginTop: '8pt', textDecoration: 'none' }}>
                <Button color="primary">
                  Forgot password
                </Button>
              </Link>
            </StylesProvider>
          </FormControl>
        </Container>
      </Container>
    );
  }

}

export default (Login);