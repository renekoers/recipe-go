const assert = require("chai").assert;
const Ingredient = require("../src/domain/ingredient");

var newIngredient = {
  ingredientName: "tomato",
  ingredientKind: "fruit",
  ingredientPrice: 0.5,
  ingredientSuppliers: ["Albert Heijn", "Jumbo"]
};

var ingredient = new Ingredient(newIngredient);

describe("Ingredient", function() {
  describe("getIngredientName", function() {
    it("Should return tomato", function() {
      let result = ingredient.ingredientName;
      assert.equal(result, "tomato");
    });
  });

  describe("getIngredientKind", function() {
    it("Should return fruit", function() {
      let result = ingredient.ingredientKind;
      assert.equal(result, "fruit");
    });
  });

  describe("getIngredientPrice", function() {
    it("Should return " + 0.5, function() {
      let result = ingredient.ingredientPrice;
      assert.equal(result, 0.5);
    });
  });

  describe("getIngredientSuppliers", function() {
    it("Should return Albert Heijn and Jumbo", function() {
      let store = ingredient.ingredientSuppliers;
      let result1 = store[0].storeName;
      let result2 = store[1].storeName;

      assert.equal(result1, "Albert Heijn");
      assert.equal(result2, "Jumbo");
    });
  });

  describe("getIngredientRating on init", function() {
    it("Should return" + 0, function() {
      let result = ingredient.ingredientRating;

      assert.equal(result, 0);
    });
  });

  describe("getLastUpdate on init", function() {
    it(
      "Should return current date of: " + new Date().toLocaleString(),
      function() {
        let result = ingredient.lastUpdate;

        assert.equal(result, new Date().toLocaleString());
      }
    );
  });
});
