import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

import UserList from '../User/UserList'

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
})

class UsersContainer extends Component {
	state = {
		modalOpen: false,
	}

	render() {
		const { classes } = this.props
		const filter = this.props.match.params.filter

		return(
			<div>
				<Grid container spacing={24}>
					<Grid item xs={12} sm={3}>
	        </Grid>
	        <Grid item xs={12} sm={6}>
	        	<UserList filter={filter} />
	        </Grid>
	        <Grid item xs={12} sm={3}>
	        </Grid>
				</Grid>
			</div>
			)
	}
}

export default withStyles(styles)(UsersContainer)