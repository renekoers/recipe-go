class Quantity {
  /**
   *
   * @param {Number} amount
   * @param {String} unit
   */
  constructor(amount, unit) {
    this._amount = amount;
    this._unit = unit;
  }

  /**
   * @returns {Number}
   */
  get amount() {
    return this._amount;
  }

  /**
   * @returns {String}
   */
  get unit() {
    return this._unit;
  }
}

module.exports = Quantity;
