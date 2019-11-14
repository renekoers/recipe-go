import React, { Component } from "react";
import "./recipeIngredient.css";

class RecipeIngredient extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ingredientName: props.ingredientName,
      ingredientKind: props.ingredientKind,
      ingredientQuantity: props.ingredientQuantity,
      ingredientUnit: props.ingredientUnit
    };
  }
  render() {
    console.log(this.state);
    return (
      <li className="ingredient-container">
        <article className="ingredient">
          <div className="ingredient-quantity">
            {this.state.ingredientQuantity}
          </div>
          <div className="ingredient-unit">{this.state.ingredientUnit}</div>
          <div className="ingredient-name">{this.state.ingredientName}</div>
        </article>
      </li>
    );
  }
}

export default RecipeIngredient;
