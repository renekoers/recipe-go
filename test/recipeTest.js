const assert = require("chai").assert;
const Ingredient = require("../src/domain/ingredient");
const Product = require("../src/domain/product");
const Supplier = require("../src/domain/supplier");
const Quantity = require("../src/domain/quantity");
const Recipe = require("../src/domain/recipe");

let newRecipe = {
  recipeName: "tomatenpuree",
  recipeDescription: "Ambachtelijk met de hand inelkaar geslagen.",
  recipeIngredients: [
    {
      ingredientObject: new Ingredient({
        ingredientName: "tomaten puree",
        ingredientProducts: new Product({
          productName: "AH tomaten",
          productPrice: 0.5,
          productQuantityObject: {
            amount: 100,
            unit: "gram"
          },
          productSuppliers: [
            new Supplier("Albert Heijn"),
            new Supplier("Jumbo")
          ]
        })
      }),
      quantityObject: {
        amount: 200,
        unit: "gram"
      }
    }
  ]
};

let recipe = new Recipe(newRecipe);

describe("Recipe", function() {
  describe("getRecipeName", function() {
    it("Should return tomatenpuree", function() {
      let result = recipe.recipeName;

      assert.equal(result, "tomatenpuree");
    });
  });

  describe("getRecipeIngredient", function() {
    it("Should return Ingredient object and its name", function() {
      let ingredients = recipe.recipeIngredients;
      let ingredientObject = ingredients[0].ingredient;
      let ingredientName = ingredientObject.ingredientName;

      assert.isTrue(ingredientObject instanceof Ingredient);
      assert.equal(ingredientName, "tomaten puree");
    });
  });

  describe("getRecipeIngredientQuantity", function() {
    it("Should return Quantity object and its values", function() {
      let ingredients = recipe.recipeIngredients;
      let quantityObject = ingredients[0].quantity;
      let quantityAmount = quantityObject.amount;
      let quantityUnit = quantityObject.unit;

      assert.isTrue(quantityObject instanceof Quantity);
      assert.equal(200, quantityAmount);
      assert.equal("gram", quantityUnit);
    });
  });

  describe("getLastUpdate on init", function() {
    it("Should return " + new Date().toLocaleString(), function() {
      let result = recipe.lastUpdate;

      assert.equal(result, new Date().toLocaleString());
    });
  });

  describe("getRecipeRating on init", function() {
    it("Should return " + 0, function() {
      let result = recipe.recipeRating;

      assert.equal(result, 0);
    });
  });
});
