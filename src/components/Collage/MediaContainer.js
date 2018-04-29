import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'

import ProductContainer from './ProductContainer'

/*
Search 
Items
  tops 
  outerwear
  dresses
  jeans
  pants
  skirts
  shorts
  shoes
  bags
  beauty
  people & print
  plus size
Layouts 
Text
Background
Uploads
*/

function TabContainer({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  },
})

class MediaContainer extends Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { classes, theme } = this.props
    const { value } = this.state

    // if (this.props.meQuery && this.props.meQuery.loading) {
    //   return <div>Loading</div>
    // }

    // if (this.props.meQuery && this.props.meQuery.error) {
    //   return <div>Error</div>
    // }
    
    // const { me } = this.props.meQuery
    
    return (
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor='primary'
            textColor='primary'
            fullWidth
          >
            <Tab label='Items'/>
            <Tab label='Uploads'/>
          </Tabs>

        </AppBar>
        {value === 0 && (
          <TabContainer>
            <ProductContainer addToCanvas={this.props.addToCanvas}/>
          </TabContainer>
        )}
        {value === 1 && <TabContainer></TabContainer>}
      </div>
    )
  }
}

MediaContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      firstName
      lastName
      avatarURL
    }
  }
`

export default withStyles(styles, { withTheme: true })(MediaContainer)
