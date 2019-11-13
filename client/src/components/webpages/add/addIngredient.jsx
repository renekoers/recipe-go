import React, { Component } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import "./addIngredient.css";

class AddIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableSuppliers: [],
      newIngredient: {
        ingredientName: null,
        ingredientKind: null,
        ingredientPrice: null,
        ingredientSuppliers: []
      }
    };
  }

  componentDidMount() {
    fetch("/api/suppliers/retrieve/all")
      .then(response => {
        return response.json();
      })
      .then(data => {
        let retrievedSuppliers = data.map(supplier => {
          return supplier;
        });
        this.setState({ availableSuppliers: retrievedSuppliers });
      });
  }

  render() {
    console.log(this.state.availableSuppliers);
    return (
      <div className="add-ingredient-page">
        <div className="add-ingredient-form-container">
          <Form>
            <Form.Group controlid="validation-ingredient-name">
              <Form.Label>Naam ingrediënt</Form.Label>
              <Form.Control required type="text" placeholder="Naam" />
              <Form.Text className="text-muted">
                Bijvoorbeeld: AH Stamppot aardappelen
              </Form.Text>
            </Form.Group>
            <Form.Group controlid="validation-ingredient-kind">
              <Form.Label>Soort ingrediënt</Form.Label>
              <Form.Control required type="text" placeholder="Soort" />
              <Form.Text className="text-muted">
                Bijvoorbeeld: Stamppot aardappelen
              </Form.Text>
            </Form.Group>
            <Form.Group controlid="validation-ingredient-price">
              <Form.Label>Prijs ingrediënt</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="input-field-flag">€</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Prijs"
                  aria-describedby="input-field-flag"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Vul de prijs van het ingrediënt in.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="formGridState">
              <Form.Label>Te koop bij</Form.Label>
              <Form.Control required as="select" multiple>
                {this.state.availableSuppliers.map(supplier => {
                  return <option>{supplier._storeName}</option>;
                })}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Voeg toe
            </Button>
          </Form>
        </div>
      </div>
    );
  }
  // generateSupplierOptions() {
  //   return this.state.availableSuppliers.map(supplier => {
  //     <option>{supplier._storeName}</option>;
  //   });
  // }
}

export default AddIngredient;
