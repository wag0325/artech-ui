import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import {withRouter} from 'react-router-dom'
import gql from 'graphql-tag'
import axios from 'axios'
import moment from 'moment'

import { withStyles } from 'material-ui/styles'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Select from 'material-ui/Select'
import Switch from 'material-ui/Switch'
import Input, { InputLabel } from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormControl, FormControlLabel } from 'material-ui/Form'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'


import FeedbackMessage from '../Util/FeedbackMessage'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root: {
    padding: 20,
    marginTop: 20,
  },
  button: {
    margin: theme.spacing.unit * 2,
  },
})

class CreateEvent extends Component {
  state = {
    id: '',
    type: '',
    title: '',
    text: '',  
    startDateTime: null,
    endDateTime: null,
    location: '',
    addDateTime: false,
    errors: [],
  }

  componentWillUpdate() {
    if (this.state.errors.length > 0 ) this.setState({errors: []})
  }

  render() {
    const { classes } = this.props
    const { 
      addDateTime,
      startDateTime,
      endDateTime, } = this.state
    
    console.log("startDateTime", startDateTime)

    const gigTypes = [
      {name: 'Creative', value: 'CREATIVE'}, 
      {name: 'Crew', value: 'CREW'}, 
      {name: 'Event', value: 'EVENT'}, 
      {name: 'Labor', value: 'LABOR'}, 
      {name: 'Talent', value: 'TALENT'}, 
      {name: 'Technical', value: 'TECHNICAL'}, 
      {name: 'Writing', value: 'WRITING'}, 
      {name: 'Other', value: 'OTHER'}, 
    ]
    const start = moment().format('YYYY-MM-DD[T]hh:mm').toString()
    const end = moment().add(2, 'hours').format('YYYY-MM-DD[T]hh:mm').toString()
    
    const $dateTimeForm = (
        <FormControl fullWidth className={classes.margin} disabled>
            <TextField
              id='datetime-start'
              label='Start Date & Time'
              type='datetime-local'
              defaultValue={start}
              className={classes.textField}
              onChange={e => this.setState({ startDateTime: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id='datetime-end'
              label='End Date & Time'
              type='datetime-local'
              defaultValue={end}
              className={classes.textField}
              onChange={e => this.setState({ endDateTime: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </FormControl>)
    
    const { errors } = this.state
    let $errorMessage = null
    if (errors.length > 0) {
      $errorMessage = (<FeedbackMessage type='error' message={errors[0].message} />)
    }

    return (
      <Paper className={classes.root} elevation={4}>
        <Typography variant='title' gutterBottom>
         Post an Event
        </Typography>
        <Typography component='p'>
          Is there a cool event you'd like to share with us?
        </Typography>
        <form className={this.props.container} noValidate autoComplete="off">
          <FormControl fullWidth className={classes.margin}>
            <TextField
              id='title'
              label='Title'
              className={this.props.textField}
              value={this.state.title}
              onChange={e => this.setState({ title: e.target.value })}
              margin='normal'
            />
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <TextField
              id='location'
              label='Location'
              className={this.props.textField}
              value={this.state.location}
              onChange={e => this.setState({ location: e.target.value })}
              margin='normal'
            />
          </FormControl>
          <FormControl fullWidth className={classes.margin}>
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.addDateTime}
                  onChange={this._handleDateTimeOn('addDateTime')}
                  value='addDateTime'
                  color='primary'
                />
              }
              label='Add Date & Time'
            />
          </FormControl>
          {addDateTime && $dateTimeForm}
          <FormControl fullWidth className={classes.margin}>
            <TextField
              id="text"
              label="Description"
              multiline={true}
              rows={5}
              rowsMax={8}
              className={this.props.textField}
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
              margin="normal"
            />
          </FormControl>
          <Button variant="raised" color="primary" className={this.props.button} onClick={() => this._createEvent()}>
              Submit
          </Button>
        </form>
        {$errorMessage}
      </Paper>
    )
  }
  
  _handleDateTimeOn = name => event => {
    this.setState({ [name]: event.target.checked })
  }

  _createEvent = async () => {
    const { 
      title, 
      text, 
      location,
      startDateTime,
      endDateTime
      } = this.state
    
    console.log("submit ", startDateTime, endDateTime)
    const start = moment(startDateTime).toJSON()
    const end = moment(endDateTime).toJSON()
    console.log("submit ", start, end)
    await this.props.createEventMutation({
      variables: {
        title,
        text,
        startDateTime: start,
        endDateTime: end,
        location,
      },
      update: (store, { data: { createEvent }}) => {
        this.props.history.push(`/e/${createEvent._id}`)
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
  }
}

const CREATE_EVENT_MUTATION = gql`
  mutation CreateEventMutation(
      $title: String!, 
      $text: String!,
      $startDateTime: Date, 
      $endDateTime: Date, 
      $location: String,
    ) {
    createEvent(
      title: $title, 
      text: $text
      startDateTime: $startDateTime, 
      endDateTime: $endDateTime, 
      location: $location
      ) {
      _id
    }
  }
`

export default withStyles(styles)(compose(
  graphql(CREATE_EVENT_MUTATION, {name: 'createEventMutation'}),
)(withRouter(CreateEvent)))