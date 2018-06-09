import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { withStyles } from 'material-ui/styles'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'

import { AUTH_TOKEN, AVATAR_DEFAULT } from '../../constants'
import { timeDifferenceForDate } from '../../utils'

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
  ul: {
    display: 'flex',            /* establish flex container */
    flexWrap: "wrap",            /* enable flex items to wrap */
    justifyContent: "space-between",
    padding: 0,             /* remove default padding */
    listStyleType: "none",
    width: "100%",
    '& li': {
      maxWidth: '250px'
    }
  }
})

class Event extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    const { event, classes } = this.props
    let $eventDateRange = null 
    let $location = null

    if (event.startDateTime || event.endDateTime) {
      const start = moment(event.startDateTime).format('LL')
      $eventDateRange = start
    }

    return (
      <ListItem>
        <ul className={classes.ul}>
          <li><Link to={`/e/${event._id}`}>{event.title}</Link></li>
          <li>{event.location}</li>
          <li>{$eventDateRange}</li>
        </ul>
      </ListItem>
    )
  }

  _likePost = async () => {
    const postId = this.props.post.id
    await this.props.postLikeMutation({
      variables: {
        postId
      },
      update: (store, {data: {postLike}}) => {
        this.props.updateStoreAfterPostLike(store, postLike, postId)
      },
    })
  }
}



export default withStyles(styles)(Event)