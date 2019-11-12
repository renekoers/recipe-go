import React, { Component } from "react";
import "./recipe.css";
import RecipeIngredient from "../webpageBase/recipe/ingredients/recipeIngredient";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeID: this.props.match.params.recipeID,
      recipe: {},
      ingredients: []
    };
  }

  componentDidMount() {
    console.log(this.state.recipeID);
    fetch("/api/recipes/retrieve/byid", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.recipeID
      })
    })
      .then(result => {
        return result.json();
      })
      .then(data => {
        let retrievedRecipe = data;
        this.setState({ recipe: retrievedRecipe[0] });
        this.extractIngredientsFromRecipe(this.state.recipe);
      });
  }
  render() {
    return (
      <div className="recipe-container">
        <div className="recipe">
          <h1 className="recipe-title">{this.state.recipe._recipeName}</h1>
          <ul className="ingredient-list">{this.state.ingredients}</ul>
        </div>
      </div>
    );
  }

  extractIngredientsFromRecipe(recipe) {
    let ingredientList = recipe._recipeIngredients.map(
      (ingredientListing, index) => {
        return (
          <RecipeIngredient
            ingredientName={ingredientListing.ingredient._ingredientName}
            ingredientKind={ingredientListing.ingredient._ingredientKind}
            ingredientPrice={ingredientListing.ingredient._ingredientPrice}
            ingredientSuppliers={
              ingredientListing.ingredient._ingredientSuppliers
            }
            ingredientRating={ingredientListing.ingredient._ingredientRating}
            ingredientQuantity={ingredientListing.quantity._amount}
            ingredientUnit={ingredientListing.quantity._unit}
            key={index}
          />
        );
      }
    );
    this.setState({ ingredients: ingredientList });
  }
}

export default Recipe;
