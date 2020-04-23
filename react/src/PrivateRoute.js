import React, { Component } from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';

const AuthService = {
  isAuthenticated: false,
  AUTH_TOKEN: localStorage.getItem("auth-token"),
  loading: false,
  async checkAuth(cb) {
    this.loading = true;

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
        'JWT': this.AUTH_TOKEN,
      },
      body: JSON.stringify(query)
    };

    const res = await fetch('https://coreable.appspot.com/graphql', options).then(res => res.json());
    const user = res.data.me.data;
    const errors = res.data.me.errors;

    if (!errors) {
      this.authenticated = true;
    }

    this.loading = false;

    return {
      user,
      errors
    };
  },
  login(cb) {
    this.isAuthenticated = true;
  },
  logout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100) // fake async
  },
}

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    const { component } = props;
    this.state = {
      loading: false,
      authenticated: false,
      Component: component,
      redirect: '/'
    }
  }

  render() {
    const { Component } = this.state;
    let props = this.props;
    if (this.state.authenticated) {
      return (<Route render={(props) => <Component {...props} />} />);
    }
    return (<Route render={(props) => <Redirect to={{ pathName: '/', state: { from: props.location } }} />} />);
  }
}

// function PrivateRoute ({ component: Component, authed, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) => authed === true
//         ? <Component {...props} />
//         : <Redirect to={{pathname: '/', state: { from: props.location }}} />}
//     />
//   );
// }

// export default PrivateRoute;

export default PrivateRoute;