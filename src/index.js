// import React from 'react';
// import ReactDOM, { render } from 'react-dom';
// import ApolloClient from 'apollo-boost'
// import { ApolloProvider } from "react-apollo"

// import './index.css';
// import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';
// import gql from "graphql-tag"

// const client = new ApolloClient({
//   uri: "http://localhost:3000/graphql"
// })

// // client
// //   .query({
// //     query: gql`
// //       {
// //         getPosts {
// //           text
// //         }
// //       }
// //     `
// //   })
// //   .then(result => console.log(result))

// // const App = () => (
// //   <ApolloProvider client={client}>
// //     <div>
// //       <h2>My first Apollo app 🚀</h2>
// //     </div>
// //   </ApolloProvider>
// // );

// render(<App />, document.getElementById("root"))

// registerServiceWorker();


import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter } from 'react-router-dom'

import { AUTH_TOKEN } from './constants'
import { ApolloLink } from 'apollo-link'

const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const client = new ApolloClient({
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all'
    }
  }
})

ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </BrowserRouter>
  , document.getElementById('root')
)