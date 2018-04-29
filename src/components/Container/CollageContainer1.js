import React, { Component } from 'react';
import FabricCanvas from '../Collage/FabricCanvas';
import TemplateList from '../Collage/ItemList'
import {fabric} from 'fabric';

import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
})

class CollageContainer extends Component {

  constructor(props){
    super(props);

    this.state = {
       activeProperty : null
    };
  }

  addToCanvas = (imgElement, property_type, z_Index) => {

    var imgInstance = new fabric.Image(imgElement, {  
      width: 400,
      height: 400,
      the_type: property_type,
      zIndex : z_Index
    });

    this.setState({activeProperty: imgInstance });

  }

  render() {
    const { classes } = this.props

    return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>xs=12 sm=6</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>    
          Hello      
          <FabricCanvas 
                activeProperty = {this.state.activeProperty}/>
        </Grid>
      </Grid>
    </div>
    )
  }
}

export default withStyles(styles)(CollageContainer)
