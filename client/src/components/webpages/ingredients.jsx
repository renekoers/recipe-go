import React, { Component } from "react";
import "./ingredients.css";
import Ingredient from "../webpageBase/ingredient/ingredient";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

class Ingredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestIngredientsList: []
    };
  }

  componentDidMount() {
    fetch("/api/ingredients/retrieve/latest")
      .then(results => {
        return results.json();
      })
      .then(data => {
        let latestIngredients = data.map((ingredient, index) => {
          return (
            <Ingredient
              ingredientName={ingredient._ingredientName}
              ingredientKind={ingredient._ingredientKind}
              ingredientPrice={ingredient._ingredientPrice}
              ingredientSuppliers={ingredient._ingredientSuppliers}
              ingredientRating={ingredient._ingredientRating}
              ingredientUpdated={ingredient._lastUpdate}
              key={index}
            />
          );
        });
        this.setState({ latestIngredientsList: latestIngredients });
      });
  }
  render() {
    return (
      <div className="ingredients-page">
        <div className="top-add-button">
          <Link to="/ingredients/add">
            <Button variant="primary">Add ingredient</Button>
          </Link>
        </div>

        <div className="latest-ingredients-list-container">
          <div className="latest-ingredients-list">
            {this.state.latestIngredientsList}
          </div>
        </div>
      </div>
    );
  }
}

export default Ingredients;
