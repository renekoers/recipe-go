const Tag = require("./tag");
const Store = require("./store");

class Ingredient {
    /**
     * 
     * @param {Object} newIngredient JS Object containing ingredient
     */
    constructor(newIngredient) {
        this._ingredientName = newIngredient.ingredientName;
        this._ingredientKind = newIngredient.ingredientKind;
        this._ingredientPrice = parseFloat(newIngredient.ingredientPrice);
        this._ingredientSuppliers = [];
        this._lastUpdate = new Date().toLocaleString();
        this._ingredientRating = 0.00;

        for (let storeName of newIngredient.ingredientSuppliers) {
            this._ingredientSuppliers.push(new Store(storeName));
        }



        // optional variables (Not implemented yet for MVP)

        // this._singlePriceThreshold = newIngredient.singlePriceThreshold;
        // this._weightThreshold = newIngredient.weightThreshold;
        // this._ingredientTags = [];
        // newIngredient.Tags = newIngredient.Tags || [];
        // for (let tag of newIngredient.Tags) {
        //     this._ingredientTags.push(new Tag(tag));
        // }
        // this._ingredientImageURL = newIngredient.ingredientImageURL;
       
    }

    /**
     * @returns {String}
     */
    get ingredientName() {
        return this._ingredientName;
    }

    /**
     * @returns {String}
     */
    get ingredientKind() {
        return this._ingredientKind;
    }

    /**
     * @returns {Number} Price double
     */
    get ingredientPrice() {
        return this._ingredientPrice;
    }

    /**
     * @returns {Store[]} Suppliers array
     */
    get ingredientSuppliers() {
        return this._ingredientSuppliers;
    }

    /**
     * @returns {String} Date
     */
    get lastUpdate() {
        return this._lastUpdate;
    }

    /**
     * @returns {Number} Rating of the ingredient
     */
    get ingredientRating(){
        return this._ingredientRating;
    }
    // To be implemented once MVP stands.

    // getSinglePriceThreshold(){
    //     return this._singlePriceThreshold;
    // }

    // getWeightThreshold(){
    //     return this._weightThreshold;
    // }
}

module.exports = Ingredient;