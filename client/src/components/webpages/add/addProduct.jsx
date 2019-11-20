import React, { Component } from "react";
import { Button, Form, InputGroup, ButtonGroup } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import SupplierPriceForm from "../../webpageBase/product/add/supplierPriceForm";
import "./addProduct.css";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      supplierFormAmount: 1,
      productName: "",
      productAmount: "",
      productUnit: "",
      productSuppliers: []
    };
  }

  componentDidMount() {
    let productSuppliers = this.state.productSuppliers;
    fetch("/api/suppliers/retrieve/all")
      .then(response => {
        return response.json();
      })
      .then(data => {
        productSuppliers = data.map(supplier => {
          return {
            supplier: supplier,
            price: ""
          };
        });
        this.setState({ productSuppliers });
      });
  }

  render() {
    const redirect = this.state.redirect;
    if (redirect === true) {
      return <Redirect to="/products" />;
    }

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
                  <Form.Control
                    as="select"
                    value={this.state.productUnit}
                    placeholder="Eenheid"
                    required
                    onChange={input => {
                      if (input.target.value !== "Kies eenheid") {
                        this.setState({
                          productUnit: input.target.value
                        });
                      }
                    }}
                  >
                    <option default disabled value="">
                      Kies eenheid
                    </option>
                    <option>stuks</option>
                    <option>gram</option>
                    <option>ml</option>
                  </Form.Control>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>

            <Form.Group controlid="validation-product-price">
              <Form.Label>Prijs product bij winkel(s)</Form.Label>
              <div className="supplier-price-forms-container">
                {this.generateSupplierPriceForms()}
              </div>
              <ButtonGroup className="form-button-row">
                {" "}
                <Button
                  variant="success"
                  type="button"
                  className="add-button"
                  onClick={event => this.addSupplierPriceForm(event)}
                >
                  Voeg toe
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  className="remove-button"
                  onClick={event => this.removeSupplierPriceForm(event)}
                >
                  {" "}
                  Verwijder
                </Button>
              </ButtonGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="submit-button">
              Sla product op
            </Button>
          </Form>
        </div>
      </div>
    );
  }

  generateSupplierPriceForms() {
    return [...new Array(this.state.supplierFormAmount)].map((i, index) => {
      if (index < this.state.supplierFormAmount) {
        return (
          <SupplierPriceForm
            isLast={true}
            getValues={this.getValues.bind(this)}
            id={index}
            key={index}
            productSuppliers={this.state.productSuppliers}
          />
        );
      } else {
        return (
          <SupplierPriceForm
            isLast={false}
            getValues={this.getValues.bind(this)}
            id={index}
            key={index}
            productSuppliers={this.state.productSuppliers}
          />
        );
      }
    });
  }

  addSupplierPriceForm() {
    let formAmount = this.state.supplierFormAmount;
    if (formAmount < this.state.productSuppliers.length) {
      formAmount = formAmount + 1;
    }
    this.setState({ supplierFormAmount: formAmount });
  }

  removeSupplierPriceForm() {
    let formAmount = this.state.supplierFormAmount;
    if (formAmount !== 1) {
      formAmount = formAmount - 1;
    }
    this.setState({ supplierFormAmount: formAmount });
  }

  handleSubmit() {
    const data = this.getCorrectState();
    console.log(data);
    fetch("/api/products/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
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

  getCorrectState() {
    let productSuppliers = [];
    for (let supplier of this.state.productSuppliers) {
      if (supplier.price !== "") {
        productSuppliers.push(supplier);
      }
    }

    const data = {
      productName: this.state.productName,
      productQuantityObject: {
        amount: this.state.productAmount,
        unit: this.state.productUnit
      },
      productSuppliers: productSuppliers
    };

    return data;
  }

  getValues(x) {
    console.log(this.state.productSuppliers);
    let productSuppliers = this.state.productSuppliers;
    let updatedProductSuppliers = productSuppliers.map(supplier => {
      if (supplier.supplier._supplierName === x.selectedSupplier) {
        return {
          supplier: {
            _supplierName: x.selectedSupplier
          },
          price: x.price
        };
      }

      return supplier;
    });
    console.log(updatedProductSuppliers);
    this.setState({ productSuppliers: updatedProductSuppliers });
  }

  redirect() {
    this.setState({ redirect: true });
  }
}

export default AddProduct;
