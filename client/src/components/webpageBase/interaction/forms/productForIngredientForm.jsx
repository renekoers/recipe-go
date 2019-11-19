import React, { Component } from "react";
import { Form } from "react-bootstrap";
class ProductForIngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      availableProductOptions: [],
      availableProducts: [],
      selectedProductId: "",
      selectedProductObject: {}
    };

    this.callback = props.getValue;
  }

  componentDidMount() {
    let availableProducts = this.state.availableProducts;
    fetch("/api/products/retrieve/all")
      .then(results => {
        return results.json();
      })
      .then(data => {
        let fetchedProductOptions = data.map((product, index) => {
          availableProducts.push(product);
          return (
            <option value={product.id} index={index} key={index}>
              {product._productName}
            </option>
          );
        });
        this.setState({ availableProductOptions: fetchedProductOptions });
      });
  }

  render() {
    console.log(this.state);
    return (
      <Form.Control
        className="product-input-field"
        placeholder="Kies product"
        as="select"
        value={this.state.selectedProductId}
        required
        onChange={e => this.handleChange(e)}
      >
        <option default disabled value="">
          Kies product
        </option>
        {this.state.availableProductOptions}
      </Form.Control>
    );
  }

  handleChange(e) {
    this.setState({ selectedProductId: e.target.value });

    this.state.availableProducts.map(product => {
      if (product.id === e.target.value) {
        this.setState({ selectedProductObject: product });
      }
    });

    this.callback(this.state.id, this.state.selectedProductObject);
  }
}

export default ProductForIngredientForm;
