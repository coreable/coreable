import React, { Component } from "react";
import './Register.scss';
import { Link, Redirect } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import { JWT, USER_NAME, USERID } from '../../../constants';
import { SIGNUP_MUTATION } from '../../../apollo/mutations';

import {
  Typography,
  Container,
  Button,
  TextField,
  FormControl
} from '@material-ui/core';

class Register extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      loggedIn: false,
      loading: false,

      touched: {
        email: false,
        password: false,
        firstname: false,
        lastname: false
      }
    };
  }

  componentDidMount() {
    if (localStorage.getItem(JWT)) {
      this.setState({ loggedIn: true });
    }
  }

  errors() {
    return this.validate(this.state.email, this.state.password, this.state.firstname, this.state.lastname);
  }

  validate(email, password, firstname, lastname) {
    return {
      email: email.length === 0 || !email.includes("@"),
      password: password.length <= 4,
      firstname: firstname.length <= 1,
      lastname: lastname.length <= 1
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
      const { token } = data.register.data;
      const { firstName, _id } = data.register.data.user;
      this._saveUserData({ token, firstName, _id });
      this.props.history.push(`/setup`);
    } catch (err) {
      alert('Invalid signup');
    }
  }

  _error = (err) => {
    console.error(err);
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

    let { email, password, firstname, lastname } = this.state;
    return (
      <Container maxWidth="xl" style={{ height: '95.25vh' }} className="sign-up-container">
        <Container maxWidth="md">
          <Typography variant="h3" component="h1" style={{ fontWeight: 'bold', marginTop: '48pt', textAlign: 'left', color: '#000' }}>
            Welcome,
          </Typography>
          <Typography variant="h3" component="h1" style={{ textAlign: 'left', color: '#707070' }}>
            sign up to continue
          </Typography>
          <FormControl style={{ marginTop: '16pt' }}>
            <TextField
              label="First Name"
              placeholder="Enter first name"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="firstname"
              error={this.shouldMarkError("firstname")}
              value={this.state.firstname}
              type="text"
              required
              onChange={this.handleChange}
              onBlur={this.handleBlur("firstname")}
              style={{ marginTop: '8pt', backgroundColor: this.getColour("firstname") }}
            />
            <TextField
              label="Last Name"
              placeholder="Enter last name"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              name="lastname"
              error={this.shouldMarkError("lastname")}
              value={this.state.lastname}
              type="text"
              required
              onChange={this.handleChange}
              onBlur={this.handleBlur("lastname")}
              style={{ marginTop: '8pt', backgroundColor: this.getColour("lastname") }}
            />
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
            <Mutation
              mutation={SIGNUP_MUTATION}
              variables={{ email, password, firstname, lastname }}
              onCompleted={data => this._success(data)}
              onError={err => this._error(err)}
            >
              {(mutation, { _, loading, __ }) => {
                return (
                  <Button className="btn-sign-up" disabled={this.isDisabled()} onClick={mutation}>
                    Sign up
                  </Button>
                );
              }}
            </Mutation>
            <Link to="/forgot" style={{ marginTop: '8pt', textDecoration: 'none' }}>
              <Button color="primary">
                Forgot password
                </Button>
            </Link>
          </FormControl>
        </Container>
      </Container>
    );
  }

}

export default Register;