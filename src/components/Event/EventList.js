import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { withStyles } from 'material-ui/styles'
import { CircularProgress } from 'material-ui/Progress'
import { LinearProgress } from 'material-ui/Progress'
import Paper from 'material-ui/Paper'
import List from 'material-ui/List'
import Button from 'material-ui/Button'

import { EVENTS_PER_PAGE, EVENTS_ORDER_BY } from '../../constants'

import Event from './Event'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  root: {
    flexGrow: 1,
  },
  newGig: {
    marginBottom: 10
  },  
  loadMoreWrapper: {
    margin: 5,
    marginTop: 20,
    textAlign: 'center',
  },
})

class EventList extends Component {
  state = {
    dense: false,
    hasNextPage: false,
  }

  componentWillReceiveProps(nextProps) {
    // const { hasNextPage } = nextProps.gigFeedQuery.gigsConnection.pageInfo
    // this.setState({hasNextPage: hasNextPage })
  }

  render() {
    const { dense, hasNextPage } = this.state
    const { classes } = this.props
    let $loadMoreButton = null 
    
    if (this.props.getEventsQuery && this.props.getEventsQuery.loading) {
      return <CircularProgress className={this.props.progress} size={30} />
      // return (
      //   <div className={this.props.root}>
      //     <LinearProgress />
      //   </div>
      // )
    }
    
    if (this.props.getEventsQuery && this.props.getEventsQuery.error) {
      return <div>Error</div>
    }
    
    if(hasNextPage) {
      $loadMoreButton = 
        (<div className={classes.loadMoreWrapper}>
          <Button variant='raised' className={classes.button} onClick={this._loadMoreRows}>
            Load More
          </Button></div>)
    }

    const eventsToRender = this.props.getEventsQuery.getEvents
    console.log("events ", eventsToRender)
    const { postedById } = this.props
    return (
      <div>
        <div className={classes.newGig}>
          <Link to='/events/new'>
            <Button variant='raised' color='default' className={this.props.button}>
            Post an Event
            </Button>
          </Link>
        </div>
        <Paper className={classes.root} elevation={4}>
          <List dense={dense}>
            {eventsToRender.length === 0 && 'No events at the moment. Please refresh the page or check another time.'}
            {eventsToRender.map((event, index) => {
                return (<Event key={event._id} index={index} event={event} />)
              })}
          </List>
        </Paper>
        {$loadMoreButton}
      </div>
    )
  }
}

export const GET_EVENTS_QUERY = gql`
  query GetEventsQuery {
    getEvents {
      _id
      title
      startDateTime
      endDateTime
      location
    }
  }
`

export default withStyles(styles)(graphql(GET_EVENTS_QUERY, { 
  name: 'getEventsQuery',
})(EventList))