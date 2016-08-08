import React, { PropTypes, Component } from 'react';

export default class Product extends Component {
  static propTypes = {
    price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div className="product">
        <img src={this.props.image}/>
        <h2 className="header">{this.props.name}</h2>
        <p className="price">{this.props.price}</p>
        <div className="btn">Add to cart</div>
        <div className="quickview">quickview</div>
      </div>
    )
  }
}
