const Quantity = require('./quantity');

class Recipe {
    /**
     * 
     * @param {String} recipe JSON String
     */
    constructor(recipe) {       
        this._recipeName = recipe.recipeName;
        this._recipeIngredients = [];
        this._lastUpdate = new Date().toLocaleString();
        this._recipeRating = 0.00;

        for (let neededIngredient of recipe.recipeIngredients) {
            let ingredient = neededIngredient.ingredientObject;
            let quantity = new Quantity(neededIngredient.quantityObject);

            let recipeIngredient = {
                ingredient: ingredient,
                quantity: quantity
            };
            
            this._recipeIngredients.push(recipeIngredient);
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

    get recipeIngredients() {
        return this._recipeIngredients;
    }

    get ingredientQuantities() {
        return this._ingredientQuanities;
    }

    get lastUpdate(){
        return this._lastUpdate;
    }

    get recipeRating(){
        return this._recipeRating;
    }

}

module.exports = Recipe;