import React, { Component } from "react";
import "./product.css";

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        productName: props.productName,
        productPrice: props.productPrice,
        productQuantity: props.productQuantity,
        productSuppliers: props.productSuppliers,
        productRating: props.productRating
      },
      suppliers: []
    };
  }

  componentDidMount() {
    let suppliers = this.getProductSuppliers(
      this.state.product.productSuppliers
    );
    this.setState({ suppliers: suppliers });
  }

  render() {
    return (
      <div className="product-list-unit">
        <article className="product">
          <div className="product-top-bar">
            <div className="product-name">{this.state.product.productName}</div>
            <div className="product-rating">
              rating: {this.state.product.productRating}
            </div>
          </div>
          <div className="product-content-container">
            <img
              className="product-image"
              alt="product"
              src="https://www.smakelijketenzonderzout.nl/uploads/_products/product_7150/ah-huismerk-gepelde-tomaten.jpg"
            />
            <div className="product-information">
              <div className="product-price">
                €{this.state.product.productPrice.toFixed(2)}
              </div>
              <ul className="product-suppliers">
                Verkocht bij: {this.state.suppliers}
              </ul>
            </div>
          </div>
        </article>
      </div>
    );
  }

  getProductSuppliers(suppliers) {
    let supplierArray = suppliers.map((supplier, index) => {
      return (
        <li className="product-supplier" key={index}>
          {supplier._supplierName}
        </li>
      );
    });
    return supplierArray;
  }
}

export default Product;
