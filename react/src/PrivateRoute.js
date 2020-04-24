import React, { Component } from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    const { component } = props;
    this.state = {
      loading: true,
      authenticated: false,
      Component: component,
      redirect: '/',
      user: {},
      errors: [],
      AUTH_TOKEN: localStorage.getItem("auth-token")
    }
  }

  async componentDidMount() {
    const query = {
      query: `
        query {
          me {
            data {
              user {
                _id
                firstName
                lastName
              }
            }
            errors {
              code
              path
              message
            }
          }
        }
      `
    };

    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'JWT': this.state.AUTH_TOKEN,
      },
      body: JSON.stringify(query)
    };

    const res = await fetch('https://coreable.appspot.com/graphql', options).then(res => res.json());
    const user = res.data.me.data;
    const errors = res.data.me.errors;

    this.setState({
      ...this.state,
      user,
      errors,
      authenticated: !!user,
      loading: false,
    });
  }

  render() {
    const { Component } = this.state;
    let props = this.props;

    if (this.state.loading) {
      return null;
    }
    if (!this.state.loading && this.state.authenticated) {
      return (<Route render={(props) => <Component {...props} />} />);
    }
    if (!this.state.loading && !this.state.authenticated) {
      return (<Route render={(props) => <Redirect to={{ pathname: '/', state: { from: props.location } }} />} />);
    }
  }
}

export default PrivateRoute;