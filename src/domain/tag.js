class Tag {
  /**
   *
   * @param {String} tag Tagname
   */
  constructor(tag) {
    this._tagName = tag.tagName;
  }

  /**
   * @returns {String}
   */
  get tagName() {
    return this._tagName;
  }
}

module.exports = Tag;
