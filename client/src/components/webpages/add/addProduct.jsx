import React, { Component } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import "./addProduct.css";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      availableSuppliers: [],
      productName: "",
      productAmount: "",
      productUnit: "",
      productPrice: "",
      productSuppliers: []
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
    const redirect = this.state.redirect;
    if (redirect === true) {
      return <Redirect to="/products" />;
    }
    console.log(this.state);
    return (
      <div className="add-product-page">
        <div className="add-product-form-container">
          <Form
            onSubmit={a => {
              a.preventDefault();
              this.handleSubmit();
            }}
          >
            <Form.Group controlid="validation-product-name">
              <Form.Label>Naam product</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Naam"
                value={this.state.productName}
                onChange={input =>
                  this.setState({ productName: input.target.value })
                }
              />
              <Form.Text className="text-muted">
                Bijvoorbeeld: AH Stamppot aardappelen
              </Form.Text>
            </Form.Group>

            <Form.Group controlid="validation-product-quantity">
              <Form.Label>Hoeveelheid</Form.Label>
              <InputGroup>
                <Form.Control
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Hoeveelheid"
                  required
                  value={this.state.productAmount}
                  onChange={input => {
                    this.setState({
                      productAmount: input.target.value
                    });
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  Voer een hoeveelheid van het product in
                </Form.Control.Feedback>
                <InputGroup.Append className="quantity-select">
                  <InputGroup.Text>
                    <Form.Control
                      as="select"
                      value={this.state.productUnit}
                      placeholder="Eenheid"
                      onChange={input => {
                        this.setState({
                          productUnit: input.target.value
                        });
                      }}
                    >
                      <option>stuks</option>
                      <option>gram</option>
                      <option>ml</option>
                    </Form.Control>
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>

            <Form.Group controlid="validation-product-price">
              <Form.Label>Prijs product</Form.Label>
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
                  value={this.state.productPrice}
                  onChange={input =>
                    this.setState({ productPrice: input.target.value })
                  }
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Vul de prijs van het product in.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="validation-product-suppliers">
              <Form.Label>Te koop bij</Form.Label>
              <Form.Control
                required
                as="select"
                multiple
                onChange={input =>
                  this.updateMultipleSelection(input.target.options)
                }
              >
                {this.generateSupplierOptions()}
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

  generateSupplierOptions() {
    return this.state.availableSuppliers.map((supplier, index) => {
      return <option key={index}>{supplier._supplierName}</option>;
    });
  }

  updateMultipleSelection(options) {
    let selectedOptions = [];

    for (let option of options) {
      if (option.selected) {
        this.state.availableSuppliers.map(supplier => {
          if (supplier._supplierName === option.value) {
            selectedOptions.push(supplier);
          }
        });
      }
    }
    this.setState({ productSuppliers: selectedOptions });
  }

  handleSubmit() {
    fetch("/api/products/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productName: this.state.productName,
        productAmount: this.state.productAmount,
        productUnit: this.state.productUnit,
        productPrice: this.state.productPrice,
        productSuppliers: this.state.productSuppliers
      })
    })
      .then(response => this.status(response))
      .catch(error => {
        console.log("Request failed", error);
      });
  }

  status(response) {
    console.log(response);
    if (response.status === 200) {
      this.redirect();
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  redirect() {
    this.setState({ redirect: true });
  }
}

export default AddProduct;
