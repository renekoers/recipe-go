import React, { Component } from "react";
import { Form, InputGroup } from "react-bootstrap";
import "./ingredientForm.css";

class ingredientForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id : props.id,
      ingredient: "",
      amount: "",
      unit: "",
      availableIngredients: []
    };
    // this.timeout = 0;
    this.callback = props.getValues;
  }

  componentDidMount() {
    fetch("/api/ingredients/retrieve/all")
      .then(results => {
        return results.json();
      })
      .then(data => {
        let ingredients = data.map((ingredient, index) => {
          return (
            <option value={ingredient.id} index={index} key={index}>
              {ingredient._ingredientName}{" "}
            </option>
          );
        });
        this.setState({ availableIngredients: ingredients });
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
            <option>gram</option>
            <option>ml</option>
            <option>stuks</option>
          </Form.Control>
        </InputGroup.Append>

        <Form.Control
          className="ingredient-input-field"
          placeholder="Kies ingrediënt"
          as="select"
          value={this.state.ingredient}
          required
          onChange={e => {
            this.setState({ ingredient: e.target.value }, () =>
              this.callback(this.state)
            );
          }}
        >
          <option default disabled value="">
            Kies ingrediënt
          </option>
          {this.state.availableIngredients}
        </Form.Control>
      </InputGroup>
    );
  }

  // searchIngredient(e) {
  //   this.setState({ ingredient: e.target.value });
  //   let query = e.target.value;
  //   if (this.timeout) clearTimeout(this.timeout);
  //   this.timeout = setTimeout(() => {
  //     fetch("api/ingredient/retrieve/search", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         query: query
  //       })
  //     })
  //       .then(response => this.status(response))
  //       .then(results => results.json())
  //       .then(data => this.handleResultData(data))
  //       .catch(error => {
  //         console.log("Request failed", error);
  //       });
  //   }, 300);
  // }

  // status(response) {
  //   if (response.status === 200) {
  //     return Promise.resolve(response);
  //   } else {
  //     return Promise.reject(new Error(response.statusText));
  //   }
  // }

  // handleResultData(data) {
  //   if (data.length === 0) {
  //     console.log("Not found");
  //   } else {
  //     this.setState({ searchedIngredients: data });
  //     this.setRenderedIngredients(data);
  //   }
  // }

  // setRenderedIngredients(data) {
  //   let ingredients = data.map((ingredient, index) => {
  //     return <li key={index}>{ingredient._ingredientName}</li>;
  //   });

  //   this.setState({ renderedIngredients: ingredients });
  // }
}

export default ingredientForm;
