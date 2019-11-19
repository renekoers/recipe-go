import React, { Component } from "react";
import { Button, Form, ButtonGroup } from "react-bootstrap";
// import { Redirect } from "react-router-dom";
import ProductForIngredientForm from "../../webpageBase/interaction/forms/productForIngredientForm";
import "./addIngredient.css";

class AddIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredientName: "",
      ingredientProducts: [{}],
      productAmount: 1
    };
    // this.saveIngredient = props.saveIngredient;
    this.cancelForm = props.cancelForm;
  }

  render() {
    console.log(this.state);
    return (
      <div className="add-product-popup-page">
        <div className="add-product-popup">
          <div className="add-product-form-container">
            <div className="add-product-form">
              <Form
                onSubmit={a => {
                  a.preventDefault();
                  this.handleSubmit();
                }}
              >
                <Form.Group controlid="validation-product-name">
                  <Form.Label>Naam ingrediënt</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Naam"
                    value={this.state.ingredientName}
                    onChange={input =>
                      this.setState({ ingredientName: input.target.value })
                    }
                  />
                  <Form.Text className="text-muted">
                    Bijvoorbeeld: Kruimige aardappelen
                  </Form.Text>
                </Form.Group>
                <Form.Group controlid="validation-product-products">
                  <Form.Label>Bijhorende producten</Form.Label>
                  <div className="select-product-forms-container">
                    {this.generateSelectProductForms()}
                  </div>

                  <ButtonGroup className="form-button-row">
                    <Button
                      variant="success"
                      type="button"
                      className="add-button"
                      onClick={() => this.addSelectProductForm()}
                    >
                      Voeg product toe
                    </Button>
                    <Button
                      variant="danger"
                      type="button"
                      className="remove-button"
                      onClick={() => this.removeSelectProductForm()}
                    >
                      Verwijder
                    </Button>
                  </ButtonGroup>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="submit-button"
                  // onClick={() => this.saveIngredient()}
                >
                  Sla op
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  className="cancel-button"
                  onClick={() => this.cancelForm()}
                >
                  Annuleer
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  generateSelectProductForms() {
    return [...new Array(this.state.productAmount)].map((i, index) => {
      return (
        <ProductForIngredientForm
          key={index}
          id={index}
          getValue={this.getValue.bind(this)}
        />
      );
    });
  }

  addSelectProductForm() {
    let productAmount = this.state.productAmount;
    let ingredientProducts = this.state.ingredientProducts;
    productAmount += 1;
    ingredientProducts.push({});

    this.setState({ productAmount, ingredientProducts });
  }

  removeSelectProductForm() {
    let productAmount = this.state.productAmount;
    let ingredientProducts = this.state.ingredientProducts;
    if (productAmount > 1) {
      productAmount -= 1;
      ingredientProducts.pop();
      this.setState({ productAmount, ingredientProducts });
    }
  }

  getValue(id, newlySelectedProduct) {
    let ingredientProducts = this.state.ingredientProducts;
    ingredientProducts = ingredientProducts.map(
      (earlierSelectedProduct, index) => {
        if (index === id) {
          return newlySelectedProduct;
        } else {
          return earlierSelectedProduct;
        }
      }
    );

    this.setState({ ingredientProducts });
  }

  handleSubmit() {
    let ingredient = {
      ingredientName: this.state.ingredientName,
      ingredientProducts: this.state.ingredientProducts
    };
    this.saveIngredient(ingredient);
  }
}

export default AddIngredient;
