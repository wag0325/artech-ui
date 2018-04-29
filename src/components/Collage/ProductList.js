import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
import Subheader from 'material-ui/List/ListSubheader'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'

import Product from './Product'

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


class ProductList extends Component {
  constructor(props) {
    super(props)
    console.log("constructor")
    this.state = {
      cat: props.cat,
      products: props.products,
      load_num: 1,
    }
  }
  
  _localAddToCanvas = (e) => {
    console.log("product clicked", e)
    this.props.addToCanvas(e.target, 'product')
  }
  
  _handleLoadMoreProducts = () => {
    this.props.loadMoreProducts()
  }

  render() {
    const { classes, products } = this.props
    console.log("prducts ", products)

    return (
      <div className={classes.root}>
        {products.map((product) => 
          <Product key={product.id} 
                   product={product} 
                   addToCanvas={this.props.addToCanvas} />
        )}
        <Button variant="raised" color="default" className={classes.button} onClick={() => this._handleLoadMoreProducts()}>View More</Button>
      </div>
    );
  }
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProductList)