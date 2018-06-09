import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import Header from './Header/Header'
import LoginContainer from './Container/LoginContainer'
import ResetContainer from './Container/ResetContainer'
import HomeContainer from './Container/HomeContainer'
import SearchContainer from './Container/SearchContainer'
import EventsContainer from './Event/EventsContainer'
import EventContainer from './Event/EventContainer'
import CreateEventContainer from './Event/CreateEventContainer'
import PostsContainer from './Post/PostsContainer'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="">
          <Switch>
            <Route exact path='/' component={EventsContainer}/>
            <Route exact path='/login' component={LoginContainer}/>
            <Route exact path='/forgot' component={ResetContainer}/>
            <Route exact path='/posts' component={PostsContainer}/>
            <Route exact path='/events' component={EventsContainer}/>
            <Route exact path='/events/new' component={CreateEventContainer}/>
            <Route path='/e/:id' component={EventContainer}/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default App