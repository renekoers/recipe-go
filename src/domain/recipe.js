const Quantity = require("./quantity");

class Recipe {
  /**
   *
   * @param {String} recipe JSON String
   */
  constructor(recipe) {
    this._recipeName = recipe.recipeName;
    this._recipeDescription = recipe.recipeDescription;
    this._recipeIngredients = [];
    this._lastUpdate = new Date().toLocaleString();
    this._recipeRating = 0.0;

    for (let recipeIngredient of recipe.recipeIngredients) {
      let RecipeIngredient = {
        ingredient: recipeIngredient.ingredientObject,
        quantity: new Quantity(recipeIngredient.amount, recipeIngredient.unit)
      };

      this._recipeIngredients.push(RecipeIngredient);
    }

    // optional variables (Not implemented yet for MVP)

    // this._recipeTags = [];
    // this._recipeImageUrl = recipe._recipeImageUrl;

    // for (let tag of recipe.recipeTags) {
    //     this._recipeTags.push(tag);
    // }
  }

  get recipeName() {
    return this._recipeName;
  }

  get recipeDescription() {
    return this._recipeDescription;
  }

  get recipeIngredients() {
    return this._recipeIngredients;
  }

  get lastUpdate() {
    return this._lastUpdate;
  }

  get recipeRating() {
    return this._recipeRating;
  }
}

module.exports = Recipe;
