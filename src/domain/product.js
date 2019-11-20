const Supplier = require("./supplier");
const Quantity = require("./quantity");

class Product {
  /**
   *
   * @param {Object} newProduct JS Object containing product
   */
  constructor(newProduct) {
    console.log(newProduct);
    if (newProduct === undefined) {
      return;
    }
    this._productName = newProduct.productName;
    this._productQuantity = new Quantity(
      newProduct.productQuantityObject.amount,
      newProduct.productQuantityObject.unit
    );
    this._productSuppliers = newProduct.productSuppliers;
    this._productRating = 0.0;
    this._lastUpdate = new Date().toLocaleString();
  }
  // optional variables (Not implemented yet for MVP)

  // this._singlePriceThreshold = newProduct.singlePriceThreshold;
  // this._weightThreshold = newProduct.weightThreshold;
  // this._productTags = [];
  // newProduct.Tags = newProduct.Tags || [];
  // for (let tag of newProduct.Tags) {
  //     this._productTags.push(new Tag(tag));
  // }
  // this._productImageURL = newProduct.productImageURL;

  /**
   * @returns {String}
   */
  get productName() {
    return this._productName;
  }

  /**
   * @returns {Number} Price double
   */
  get productPrice() {
    return this._productPrice;
  }

  /**
   * @returns {Supplier[]} Suppliers array
   */
  get productSuppliers() {
    return this._productSuppliers;
  }

  /**
   * @returns {String} Date
   */
  get lastUpdate() {
    return this._lastUpdate;
  }

  /**
   * @returns {Quantity}
   */
  get productQuantity() {
    return this._productQuantity;
  }

  /**
   * @returns {Number} Rating of the product
   */
  get productRating() {
    return this._productRating;
  }
  // To be implemented once MVP stands.

  // getSinglePriceThreshold(){
  //     return this._singlePriceThreshold;
  // }

  // getWeightThreshold(){
  //     return this._weightThreshold;
  // }
}

module.exports = Product;
