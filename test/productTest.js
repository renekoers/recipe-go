const assert = require("chai").assert;
const Product = require("../src/domain/product");
const Supplier = require("../src/domain/supplier");

let newProduct = {
  productName: "tomato",
  productPrice: 0.5,
  productQuantityObject: {
    amount: 100,
    unit: "gram"
  },
  productSuppliers: [new Supplier("Albert Heijn"), new Supplier("Jumbo")]
};

var product = new Product(newProduct);

describe("Product", function() {
  describe("getProductName", function() {
    it("Should return tomato", function() {
      let result = product.productName;
      assert.equal(result, "tomato");
    });
  });

  describe("getProductPrice", function() {
    it("Should return " + 0.5, function() {
      let result = product.productPrice;
      assert.equal(result, 0.5);
    });
  });

  describe("getProductSuppliers", function() {
    it("Should return Albert Heijn and Jumbo", function() {
      let supplier = product.productSuppliers;
      let result1 = supplier[0].supplierName;
      let result2 = supplier[1].supplierName;

      assert.equal(result1, "Albert Heijn");
      assert.equal(result2, "Jumbo");
    });
  });

  describe("getProductRating on init", function() {
    it("Should return" + 0, function() {
      let result = product.productRating;

      assert.equal(result, 0);
    });
  });

  describe("getLastUpdate on init", function() {
    it(
      "Should return current date of: " + new Date().toLocaleString(),
      function() {
        let result = product.lastUpdate;
        console.log(result);
        assert.equal(result, new Date().toLocaleString());
      }
    );
  });
});
