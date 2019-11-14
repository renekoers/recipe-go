class Ingredient {
  /**
   *
   * @param {Object} newIngredient JS Object containing ingredient
   */
  constructor(newIngredient) {
    this._ingredientName = newIngredient.ingredientName;
    this._ingredientProducts = newIngredient.ingredientProducts;
    this._lastUpdate = new Date().toLocaleString();
  }

  /**
   * @returns {String}
   */
  get ingredientName() {
    return this._ingredientName;
  }

  /**
   * @returns {Product[]} Date
   */
  get ingredientProducts() {
    return this._ingredientProducts;
  }

  /**
   * @returns {String} Date
   */
  get lastUpdate() {
    return this._lastUpdate;
  }
}

module.exports = Ingredient;
