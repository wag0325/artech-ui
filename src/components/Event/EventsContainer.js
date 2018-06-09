import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

import { parse } from 'query-string'

import EventList from './EventList'

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'relative',
    marginTop: theme.spacing.unit * 4,
  },
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
})

class EventsContainer extends Component {

	render() {
		const { classes } = this.props
		let parsedLoc = null
		
		if (this.props.location) parsedLoc = parse(this.props.location.search)

		
		return(
			<div className={classes.root}>
				<Grid container spacing={24}>
					<Grid item xs={12} sm={2}>
	        </Grid>
	        <Grid item xs={12} sm={8}>
	        	<EventList location={parsedLoc}/>
	        </Grid>
	        <Grid item xs={12} sm={2}>
	        </Grid>
				</Grid>
			</div>
			)
	}
}

export default withStyles(styles)(EventsContainer)