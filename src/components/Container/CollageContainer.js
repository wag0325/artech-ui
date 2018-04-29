import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import {fabric} from 'fabric'

import FabricCanvas from '../Collage/FabricCanvas'
import MediaContainer from '../Collage/MediaContainer'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    padding: 30
  },
  button: {
    margin: theme.spacing.unit,
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
})

class CollageContainer extends Component {
	state = {
		activeProperty: null,
	}
	
	addToCanvas = (imgElement, property_type) => {
    var imgInstance = new fabric.Image(imgElement, {  
      the_type: property_type,
    });

    console.log("addToCanvas ", imgElement, imgInstance)

    this.setState({activeProperty: imgInstance });
		
  }

	render() {
		const { classes } = this.props

		return(
			<div className={classes.root}>
				<Grid container spacing={24}>
	        <Grid item xs={12} sm={6}>
	        	<MediaContainer addToCanvas={this.addToCanvas}/>
	        </Grid>
	        <Grid item xs={12} sm={6}>
	        	<Paper className={classes.root} elevation={1}>
	        		<FabricCanvas activeProperty = {this.state.activeProperty} />
	        	</Paper>
	        </Grid>
				</Grid>
			</div>
			)
	}
}

export default withStyles(styles)(CollageContainer)