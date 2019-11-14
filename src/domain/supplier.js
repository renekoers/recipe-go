class Supplier {
  /**
   *
   * @param {String} supplier Suppliername string
   */
  constructor(supplierName) {
    this._supplierName = supplierName;
  }

  /**
   * @returns {String}
   */
  get supplierName() {
    return this._supplierName;
  }
}

module.exports = Supplier;
