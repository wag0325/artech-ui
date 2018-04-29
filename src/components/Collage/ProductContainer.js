import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList'
import Subheader from 'material-ui/List/ListSubheader'
import IconButton from 'material-ui/IconButton'
import Button from 'material-ui/Button'

import accessories from '../../assets/icons/items/accessories.png'
import bags from '../../assets/icons/items/bags.png'
import tops from '../../assets/icons/items/tops.png'
import outerwears from '../../assets/icons/items/outerwears.png'
import dresses from '../../assets/icons/items/dresses.png'
import shorts from '../../assets/icons/items/shorts.png'
import skirts from '../../assets/icons/items/skirts.png'
import pants from '../../assets/icons/items/pants.png'
import beauty from '../../assets/icons/items/beauty.png'
import shoes from '../../assets/icons/items/shoes.png'

import ProductList from './ProductList'
import ProductSearch from './ProductSearch'

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
  catWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  cat: {
    width: 50,
    textAlign: 'center',
    padding: 10,
  },
  catImg: {
    width: 50,
    height: 50,
  },
  product: {
    padding: 10,
  },
  productImg: {
    height: 120,
    maxWidth: 120,
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

const itemIcons = [
  {
    img: tops,
    title: 'Tops',
    slug: 'womens-tops',
  },
  {
    img: outerwears,
    title: 'Outerwear',
    slug: 'womens-outerwear',
  },
  {
    img: dresses,
    title: 'Dresses',
    slug: 'womens-dresses',
  },
  {
    img: skirts,
    title: 'Skirts',
    slug: 'skirts',
  },
  {
    img: pants,
    title: 'Pants',
    slug: 'womens-pants',
  },
  {
    img: shorts,
    title: 'Shorts',
    slug: 'shorts',
  },
  {
    img: shoes,
    title: 'Shoes',
    slug: 'womens-shoes',
  },
  {
    img: accessories,
    title: 'Accessories',
    slug: 'womens-accessories',
  },
  {
    img: bags,
    title: 'Bags',
    slug: 'handbags',
  },
  {
    img: beauty,
    title: 'Beauty',
    slug: 'womens-beauty',
  },
] 

class ProductContainer extends Component {
  state = {
    products: null,
    activeCat: null,
    load_num: 1,
  }
  
  _handleProductSearch = (filters) => {
    console.log("search")
    const fts = filters 
    const limit = COLLAGE_PRODUCTS_PER_PAGE
    fetch(`http://api.shopstyle.com/api/v2/products?pid=uid6436-40877206-78&fts=${fts}&offset=0&limit=${limit}`)
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          this.setState({
            activeCat: null,
            products: result.products,
            load_num: 1,
          })
        }
      )
  }

  _handleCategorySearch = (slug) => {
    const cat = slug
    const limit = COLLAGE_PRODUCTS_PER_PAGE
    console.log("click", slug) 
    fetch(`http://api.shopstyle.com/api/v2/products?pid=uid6436-40877206-78&cat=${cat}&offset=0&limit=${limit}`)
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          this.setState({
            activeCat: slug,
            products: result.products,
            load_num: 1,
          })
        }
      )
  }

  loadMoreProducts = () => {
    const { activeCat, load_num, products, filters } = this.state
    const cat = activeCat
    const limit = COLLAGE_PRODUCTS_PER_PAGE
    const offset = load_num * COLLAGE_PRODUCTS_PER_PAGE
    const fts = filters
    console.log("loadmore ", load_num, offset)
    let url = null
    cat ? url = `http://api.shopstyle.com/api/v2/products?pid=uid6436-40877206-78&cat=${cat}&offset=${offset}&limit=${limit}`
        : url = `http://api.shopstyle.com/api/v2/products?pid=uid6436-40877206-78&fts=${fts}&offset=${offset}&limit=${limit}`

    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          this.setState({
            load_num: load_num + 1,
            products: [...products, ...result.products]
          })
        }
      )

  }
  
  render() {
    const { classes } = this.props
    const { products, activeCat } = this.state

    return (
      <div className={classes.root}>
        <ProductSearch handleProductSearch={this._handleProductSearch}/>
        <div className={classes.catWrapper}>
          {itemIcons.map((cat) => {
            return(
              <div className={classes.cat} onClick={() => this._handleCategorySearch(cat.slug)} key={cat.slug}>
                <img src={cat.img} alt={cat.title} className={classes.catImg}/>
              </div>
              )
          })}
        </div>
          {products && 
            <ProductList cat={activeCat} 
              products={products} 
              addToCanvas={this.props.addToCanvas} 
              loadMoreProducts={this.loadMoreProducts}
              />}
      </div>
    );
  }
}

ProductContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProductContainer)