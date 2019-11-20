import React, { Component } from "react";
import "./product.css";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: props.productName,
      productPrice: 0,
      productQuantity: props.productQuantity,
      productSuppliers: props.productSuppliers,
      productRating: props.productRating
    };
  }

  componentDidMount() {
    let cheapestPrice = 99999999;
    for (let supplier of this.props.productSuppliers) {
      if (supplier.price < cheapestPrice) {
        cheapestPrice = supplier.price;
      }
    }
    this.setState({ productPrice: cheapestPrice });
  }

  render() {
    return (
      <div className="product-list-unit">
        <article className="product">
          <div className="product-top-bar">
            <div className="product-name">{this.state.productName}</div>
            <div className="product-rating">
              rating: {this.state.productRating}
            </div>
          </div>
          <div className="product-content-container">
            <img
              className="product-image"
              alt="product"
              src="https://www.smakelijketenzonderzout.nl/uploads/_products/product_7150/ah-huismerk-gepelde-tomaten.jpg"
            />
            <div className="product-information">
              <div className="product-price">€{this.state.productPrice}</div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Product;
