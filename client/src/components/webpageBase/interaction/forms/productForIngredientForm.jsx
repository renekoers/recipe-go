import React, { Component } from "react";
import { Form } from "react-bootstrap";
class ProductForIngredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      availableProducts: [],
      selectedProduct: ""
    };

    this.callback = props.getValue;
  }

  componentDidMount() {
    fetch("/api/products/retrieve/all")
      .then(results => {
        return results.json();
      })
      .then(data => {
        let fetchedProductOptions = data.map((product, index) => {
          return (
            <option value={product.id} index={index} key={index}>
              {product._productName}
            </option>
          );
        });
        this.setState({ availableProducts: fetchedProductOptions });
      });
  }

  render() {
    return (
      <Form.Control
        className="product-input-field"
        placeholder="Kies product"
        as="select"
        value={this.state.selectedProduct}
        required
        onChange={e => {
          console.log(e.target.value);
          this.setState({ selectedProduct: e.target.value }, () =>
            this.callback(this.state.id, this.state.selectedProduct)
          );
        }}
      >
        <option default disabled value="">
          Kies product
        </option>
        {this.state.availableProducts}
      </Form.Control>
    );
  }
}

export default ProductForIngredientForm;
