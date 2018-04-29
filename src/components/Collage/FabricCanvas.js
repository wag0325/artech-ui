import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {fabric} from 'fabric'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import Input from 'material-ui/Input'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
});

class FabricCanvas extends Component{
    state = {
        title: 'A new look',
    }
    componentDidMount(){

        // Make a New Canvas
        this.the_canvas = new fabric.Canvas('main-canvas', {
            preserveObjectStacking: true,
            height:500,
            width:500,
        });
    }

    componentWillReceiveProps = (newprops) =>{

        // If Updated Item is not the same as the old one
        //      => Update the canvas with newer item
        if(newprops.activeProperty !== this.props.activeProperty){
            console.log("new")
            this.updateCanvasforImage(this.props.activeProperty,newprops.activeProperty);
        }
    }

    updateCanvasforImage = (prev,next) => {
        console.log("updatecanvas ", prev, next)
        if(next){

            let to_remove;
            // // Find the same kind of element
            // this.the_canvas.forEachObject( (object) => {

            //     if(object.the_type === next.the_type){
            //         to_remove = object;
            //     }
            // } );

            // this.the_canvas.remove(to_remove);

            // if(next.the_type === 'bg'){
            //     this.the_canvas.setBackgroundImage(next);
            //     this.the_canvas.renderAll();                
            //     return;
            // }

            this.the_canvas.add(next);
            this.the_canvas.moveTo(next, next.zIndex);
        }
    }

    saveToCanvas = () => {

        let link = document.createElement("a");
        link.href = this.the_canvas.toDataURL({format: 'png'});
        link.download = '.png';
        link.click();

    }

    render(){
        const { classes } = this.state 

        return (
            <div className="main-canvas-container">
                <Input
                    value={this.state.title}
                    inputProps={{
                      'aria-label': 'Title',
                    }}
                    onChange={e => this.setState({ title: e.target.value })}
                  />
                <canvas id= 'main-canvas'>
                </canvas>

                <Button onClick = {this.saveToCanvas}>
                    Publish
                </Button>
            </div>
        );
    }
}

FabricCanvas.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FabricCanvas)