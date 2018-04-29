import React, { Component } from 'react'
import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import {withRouter} from 'react-router-dom'

import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import IconButton from 'material-ui/IconButton'
import Search from 'material-ui-icons/Search'

import User from '../User/User'
import SearchContainer from '../Container/SearchContainer'

class ProductSearch extends Component {

  state = {
    users: [],
    filter: ''
  }

  render() {
    const { users, filter } = this.state 

    return (
      <div>
        <Input
          type='text'
          placeholder='Search'
          onChange={(e) => this.setState({ filter: e.target.value })}
          endAdornment={
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => this._executeSearch()}
                    aria-label="Search">
                    <Search />
                  </IconButton>
                </InputAdornment>
              }
        />
      </div>
    )
  }

  _executeSearch = async () => {
    console.log("clicked search")
    const { filter } = this.state

    this.props.handleProductSearch(filter)
  }

}


export default withApollo(withRouter(ProductSearch))