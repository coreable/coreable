import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link  } from 'react-router-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

//apollo
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { JWT } from './constants'


const httpLink = createHttpLink({
  uri: 'https://coreable.appspot.com/graphql',
  // credentials: 'same-origin'
})


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(JWT)
  console.log(token)
  return {
    headers: {
      ...headers,
<<<<<<< HEAD
      JWT: token ? token : null,
=======
      JWT: token ? token : "",
>>>>>>> fb9ef445b3b78b057d93237c0a39a521340a3a58
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