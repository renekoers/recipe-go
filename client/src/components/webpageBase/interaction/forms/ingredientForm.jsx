import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./ingredientForm.css";

class ingredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      ingredientId: "",
      amount: "",
      unit: "",
      availableIngredientOptions: [],
      availableIngredients: [],
      ingredientObject: {},
      measurementUnits: ["gram", "ml", "cup", "theelepel", "eetlepel", "stuks"]
    };
    // this.timeout = 0;
    this.callback = props.getValues;
  }

  componentDidMount() {
    let availableIngredients = this.state.availableIngredients;

    fetch("/api/ingredients/retrieve/all")
      .then(results => {
        return results.json();
      })
      .then(data => {
        let availableIngredientOptions = this.state.availableIngredientOptions;
        availableIngredientOptions = data.map((ingredient, index) => {
          availableIngredients.push(ingredient);
          return (
            <option value={ingredient.id} index={index} key={index}>
              {ingredient._ingredientName}
            </option>
          );
        });
        this.setState({ availableIngredientOptions, availableIngredients });
      });
  }

  render() {
    return (
      <InputGroup>
        <Form.Control
          className="amount-input-field"
          type="number"
          min="1"
          step="1"
          required
          placeholder="Hoeveelheid"
          value={this.state.amount}
          onChange={e => {
            this.setState(
              {
                amount: e.target.value
              },
              () => this.callback(this.state)
            );
          }}
        />
        <Form.Control.Feedback type="invalid">
          Voer een hoeveelheid van het ingrediënt in
        </Form.Control.Feedback>

        <InputGroup.Append className="quantity-select">
          <Form.Control
            className="unit-input-field"
            as="select"
            value={this.state.unit}
            required
            onChange={e => {
              this.setState({ unit: e.target.value }, () =>
                this.callback(this.state)
              );
            }}
          >
            <option disabled default value="">
              Eenheid
            </option>
            {this.generateMeasurementUnitOptions()}
          </Form.Control>
        </InputGroup.Append>

        <Form.Control
          className="ingredientId-input-field"
          placeholder="Kies ingrediënt"
          as="select"
          value={this.state.ingredientId}
          required
          onChange={e => this.handleIngredientChange(e)}
        >
          <option default disabled value="">
            Kies ingrediënt
          </option>
          {this.state.availableIngredientOptions}
        </Form.Control>
      </InputGroup>
    );
  }

  handleIngredientChange(e) {
    this.setState({ ingredientId: e.target.value }, () => {
      let ingredientObject = this.state.ingredientObject;
      for (let ingredient of this.state.availableIngredients) {
        if (this.state.ingredientId === ingredient.id) {
          ingredientObject = ingredient;
        }
      }
      this.setState({ ingredientObject }, () => {
        this.callback(this.state);
      });
    });
  }

  generateMeasurementUnitOptions() {
    return this.state.measurementUnits.map((measurement, index) => {
      return (
        <option key={index} value={measurement}>
          {measurement}
        </option>
      );
    });
  }
}

export default ingredientForm;
