class Quantity{
    /**
     * 
     * @param {Object} ingredientQuantityObject Contains the amount of the ingredient and the unit it is in. 
     */
    constructor(ingredientQuantityObject){
        this._amount = ingredientQuantityObject.amount;
        this._unit = ingredientQuantityObject.unit;
    }

    /**
     * @returns {Number}
     */
    get amount(){
        return this._amount;
    }

    /**
     * @returns {String}
     */
    get unit(){
        return this._unit;
    }
}

module.exports = Quantity;