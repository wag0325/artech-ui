import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
import Subheader from 'material-ui/List/ListSubheader'
import IconButton from 'material-ui/IconButton'
import Visibility from 'material-ui-icons/Visibility'
import Button from 'material-ui/Button'

import { COLLAGE_PRODUCTS_PER_PAGE } from '../../constants'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  button: {
    display: 'block'
  },
  product: {
    padding: 10,
    width: 120,
    height: 120,
  },
  productImg: {
  }
});

/**
tops 
  outerwear
  dresses
  pants
  skirts
  shorts
  shoes
  bags
  accessories
  beauty
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 */

// const tileData = [
//   {
//     img: image,
//     title: 'Image',
//     author: 'author',
//   }
// ]


class Product extends Component {
  constructor(props) {
    super(props)

    this.state = {
      product: props.product
    }
  }
  
  _localAddToCanvas = (e) => {
    console.log("product clicked", e)
    this.props.addToCanvas(e.target, 'product')
  }
  
  _handleLoadMoreProducts = () => {
    this.props.loadMoreProducts()
  }
  
  _handleRedirectUrl = (url) => {
    console.log("clicked details")
    window.open(url, '_blank')
  }

  render() {
    const { classes, product } = this.props

    return (
      <div className={classes.root}>
        <img src={product.image.sizes.XLarge.url} 
            alt={product.name} key={product.id} 
            className={classes.productImg}
            onClick={(e) => this._localAddToCanvas(e)} />
        <div className={classes.controls}>
          <IconButton
            onClick={() => this._handleRedirectUrl(product.clickUrl)}>
            <Visibility />
          </IconButton>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Product)