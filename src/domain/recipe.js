const Quantity = require("./quantity");

class Recipe {
  /**
   *
   * @param {String} newRecipe JSON String
   */
  constructor(newRecipe) {
    if (newRecipe === undefined) {
      return;
    }
    this._recipeName = newRecipe.recipeName;
    this._recipeDescription = newRecipe.recipeDescription;
    this._recipeIngredients = [];
    this._lastUpdate = new Date().toLocaleString();
    this._recipeRating = 0.0;

    for (let recipeIngredient of newRecipe.recipeIngredients) {
      console.log(recipeIngredient);
      let RecipeIngredient = {
        ingredient: recipeIngredient.ingredientObject,
        quantity: new Quantity(
          recipeIngredient.ingredientQuantityObject.amount,
          recipeIngredient.ingredientQuantityObject.unit
        )
      };

      this._recipeIngredients.push(RecipeIngredient);
    }

    // optional variables (Not implemented yet for MVP)

    // this._recipeTags = [];
    // this._recipeImageUrl = newRecipe._recipeImageUrl;

    // for (let tag of newRecipe.recipeTags) {
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
