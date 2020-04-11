import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link  } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

//apollo
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { AUTH_TOKEN } from './constants'


const httpLink = createHttpLink({
  uri: 'https://coreable.appspot.com/graphql'
})


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})



ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
serviceWorker.unregister();