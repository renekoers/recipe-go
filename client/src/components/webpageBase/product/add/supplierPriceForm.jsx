import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./supplierPriceForm.css";

class SupplierPriceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      isLast: props.isLast,
      selectedSupplier: "",
      price: ""
    };
    this.callback = props.getValues;
  }

  render() {
    return (
      <div className="supplier-price-form-container">
        <InputGroup>
          <InputGroup.Prepend>
            <Form.Control
              as="select"
              value={this.state.selectedSupplier}
              placeholder="Winkel"
              required
              onChange={e => {
                this.setState(
                  {
                    selectedSupplier: e.target.value
                  },
                  () => this.callback(this.state)
                );
              }}
            >
              <option default disabled value="">
                Kies winkel
              </option>
              {this.generateSupplierOptions()}
            </Form.Control>
            <InputGroup.Text id="input-field-flag">€</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Prijs"
            aria-describedby="input-field-flag"
            value={this.state.price}
            onChange={e => {
              this.setState({ price: e.target.value }, () =>
                this.callback(this.state)
              );
            }}
            required
          />
          <Form.Control.Feedback type="invalid">
            Vul de prijs van het product in.
          </Form.Control.Feedback>
        </InputGroup>
      </div>
    );
  }

  generateSupplierOptions() {
    return this.props.productSuppliers.map((supplier, index) => {
      if (
        (supplier.price === "") |
        (this.state.selectedSupplier === supplier.supplier._supplierName)
      ) {
        return <option key={index}>{supplier.supplier._supplierName}</option>;
      } else {
        return <></>;
      }
    });
  }
}

export default SupplierPriceForm;
