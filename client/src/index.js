import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';

import App from './components/Application/Application';

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { BrowserRouter } from 'react-router-dom';


// Here you create the HttpLink that will connect your ApolloClient
// instance with the GraphQL API; your GraphQL server will be running
// on http://localhost:3000.
const httpLink = new HttpLink({ uri: 'http://localhost:3000' })
// Now you instantiate ApolloClient by passing in the httpLink and a
// new instance of an InMemoryCache.
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})
// Finally you render the root component of your React app.
// The App is wrapped with the higher-order component ApolloProvider
// that gets passed the client as a prop.
ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
  , document.getElementById('root')
)