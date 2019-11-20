import React, { Component } from "react";
import "./recipe.css";
import RecipeIngredient from "../webpageBase/recipe/ingredients/recipeIngredient";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeID: props.match.params.recipeID,
      recipe: {},
      recipeIngredientList: []
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
          <div className="recipe-content-container">
            <div className="recipe-ingredient-list-container">
              <ul className="ingredient-list">
                {this.state.recipeIngredientList}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  extractIngredientsFromRecipe(recipe) {
    let recipeIngredientList = this.state.recipeIngredientList;
    recipeIngredientList = recipe._recipeIngredients.map(
      (ingredientListing, index) => {
        return (
          <RecipeIngredient
            ingredientName={ingredientListing.ingredient._ingredientName}
            ingredientQuantity={ingredientListing.quantity._amount}
            ingredientUnit={ingredientListing.quantity._unit}
            ingredientProducts={}
            key={index}
          />
        );
      }
    );
    this.setState({ recipeIngredientList });
  }
}

export default Recipe;
