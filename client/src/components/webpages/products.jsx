import React, { Component } from "react";
import "./products.css";
import Product from "../webpageBase/product/product";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestProductsList: []
    };
  }

  componentDidMount() {
    fetch("/api/products/retrieve/latest")
      .then(results => {
        return results.json();
      })
      .then(data => {
        console.log(data);
        let latestProducts = data.map((product, index) => {
          return (
            <Product
              productName={product._productName}
              ProductQuantity={product._productQuantity}
              productSuppliers={product._productSuppliers}
              productRating={product._productRating}
              productUpdated={product._lastUpdate}
              key={index}
            />
          );
        });
        this.setState({ latestProductsList: latestProducts });
      });
  }
  render() {
    return (
      <div className="products-page">
        <div className="top-add-button">
          <Link to="/products/add">
            <Button variant="primary">Product toevoegen</Button>
          </Link>
        </div>

        <div className="latest-products-list-container">
          <div className="latest-products-list">
            {this.state.latestProductsList}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
