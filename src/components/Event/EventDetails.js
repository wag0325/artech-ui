import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'

import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { CircularProgress } from 'material-ui/Progress'
import { LinearProgress } from 'material-ui/Progress'
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu'
import IconButton from 'material-ui/IconButton'
import Tooltip from 'material-ui/Tooltip'
import Delete from 'material-ui-icons/Delete'
import MoreHorizIcon from 'material-ui-icons/MoreHoriz'
import WatchLater from 'material-ui-icons/WatchLater'
import LocationOn from 'material-ui-icons/LocationOn'

import { AUTH_TOKEN, AVATAR_DEFAULT, ME_ID } from '../../constants'

const styles = theme => ({
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  locationWrapper: {
    padding: 15,
    marginTop: 10,
  },
  address: {
    color: theme.palette.text.secondary,
  },
  directions: {
    color: theme.palette.text.secondary,
  },
  dateTimeWrapper: {
    marginBottom: 20,
  },
  cover: {
    width: 151,
    height: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  description: {
    padding: 15,
    marginTop: 10,
  },
  playIcon: {
    height: 38,
    width: 38,
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
  progress: {
    margin: theme.spacing.unit * 2,
  },
   root: {
    flexGrow: 1,
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
})

class EventDetails extends Component {
  constructor(props) {
    super(props)

    // console.log("me", props.meQuery.me)
    this.state = {
      following: false,
      anchorEl: null,
      openModal: false,
      openModalGig: false,
    }
  }

  componentWillReceiveProps(nextProps){
    // const { user } = nextProps.userQuery
    // const { me } = nextProps.meQuery 
  
    // if (me && user) {
    //   console.log("props ", me, user)
    //   if (me.id === user.id) {
    //     this.setState({myProfile: true})
    //   }
      
    //   me.follows.map(follow => {
    //     if (follow.id === user.id) {
    //       this.setState({following: true})
    //       return false
    //     }
    //   })
    // }
  }

  render() {
    if (this.props.eventQuery && this.props.eventQuery.loading) {
      return <CircularProgress className={this.props.progress} size={30} />
      // return (
      //   <div className={this.props.root}>
      //     <LinearProgress />
      //   </div>
      //   )
    }

    
    if (this.props.eventQuery && this.props.eventQuery.error) {
      return <div>Error</div>
    }     
    
    const meId = localStorage.getItem(ME_ID)
    const { classes } = this.props
    const event = this.props.eventQuery.getEvent
    const { text, title, location, startDateTime, endDateTime, user, _id } = event
    const { following, openModal, openModalGig, anchorEl } = this.state
    
    console.log("me ", meId, user._id)

    let $dateTimeDisplay = null
    let myEvent = false
    
    console.log("event ", event)
    if (meId === user._id) myEvent = true 

    if (startDateTime || endDateTime) {
      $dateTimeDisplay = (
        <span>{moment(startDateTime).format('LLL')} - {moment(endDateTime).format('LLL')}</span>
        )  
    }

    return (
      <div>
        <Card className={classes.card}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="headline">{event.title}</Typography>
              <Typography variant="subheading" color="textSecondary">
                {location} | {startDateTime && endDateTime && ($dateTimeDisplay)}
              </Typography>
              <Typography variant="subheading" color="textSecondary">
                by {user.firstName} {user.lastName}
                {myEvent && (
                  <IconButton aria-label="Delete" onClick={() => this._deleteEvent(_id)}>
                    <Delete />
                  </IconButton>
                )}
              </Typography>
              <Typography variant='subheading' component='h5'>
                Description
              </Typography>
              <Typography component='p'>
                {event.text}
              </Typography>
            </CardContent>
          </div>
        </Card> 
      </div>
    )
  }
  
  _deleteEvent = async ( _id ) => {
    console.log("delete ", _id)
    await this.props.deleteEventMutation({
      variables: { _id },
      update: (store, { data: { deleteEvent }}) => {
        this.props.history.push('/events')
      }
    })
    .then(res => {
        if (!res.errors) {
        } else {
            // handle errors with status code 200
            console.log('200 errors ', res.errors)
            if (res.errors.length > 0) this.setState({errors: res.errors})
        }
      })
      .catch(e => {
        // GraphQL errors can be extracted here
        if (e.graphQLErrors) {
            console.log('catch errors ', e.graphQLErrors)
            this.setState({errors: e.graphQLErrors})
        }
       }) 

  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  };

  handleClose = () => {
    this.setState({ anchorEl: null })
  };
  
  _handleSendMessage = () => {
    this.setState({ openModal: true })
  }
  
  _handleEditGig = () => {
    this.setState({ openModalGig: true })
  }

  _followUser = async () => {
    const { id } = this.props.userQuery.user
    await this.props.followMutation({
      variables: {
        id
      },
      update: (store, {data: {follow}}) => {
        this.setState({ following: true })
      },
    })
  }

  _unfollowUser = async () => {
    const { id } = this.props.userQuery.user
    await this.props.unfollowMutation({
      variables: {
        id
      },
      update: (store, {data: {unfollow}}) => {
        this.setState({ following: false })
      },
    })
  }
}

export const EVENT_QUERY = gql`
  query EventQuery($_id: String!) {
    getEvent(_id: $_id) {
      _id
      title
      text
      location
      startDateTime
      endDateTime
      user {
        _id
        firstName
        lastName
      }
    }
  }
`

const DELETE_EVENT_MUTATION = gql`
  mutation DeleteEventMutation($_id: ID!) {
    deleteEvent(_id: $_id) {
      message
    }
  }
`

export default withStyles(styles)(compose(
  graphql(EVENT_QUERY, { 
    name: 'eventQuery',
    options: (props) => ({
      variables: { _id: props.eventId }
    }),
  }),
  graphql(DELETE_EVENT_MUTATION, { 
    name: 'deleteEventMutation',
  }),
  )(EventDetails))