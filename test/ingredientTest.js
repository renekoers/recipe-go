const assert = require("chai").assert;
const Product = require("../src/domain/product");
const Supplier = require("../src/domain/supplier");
const Ingredient = require("../src/domain/ingredient");

let ingredient = new Ingredient({
  ingredientName: "tomaten puree",
  ingredientProducts: new Product({
    productName: "AH tomaten",
    productPrice: 0.5,
    productQuantityObject: {
      amount: 100,
      unit: "gram"
    },
    productSuppliers: [new Supplier("Albert Heijn"), new Supplier("Jumbo")]
  })
});

describe("Ingredient", function() {
  describe("getIngredientName", function() {
    it("Should return tomaten puree", function() {
      let result = ingredient.ingredientName;
      assert.equal(result, "tomaten puree");
    });
  });

  describe("getIngredientProducts", function() {
    it("Should return AH tomaten", function() {
      let products = ingredient.ingredientProducts;
      let result = products.productName;
      assert.equal(result, "AH tomaten");
    });
  });

  describe("getLastUpdate on init", function() {
    it(
      "Should return current date of: " + new Date().toLocaleString(),
      function() {
        let result = ingredient.lastUpdate;
        console.log(result);
        assert.equal(result, new Date().toLocaleString());
      }
    );
  });
});
