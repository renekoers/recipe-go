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
  productSuppliers: [
    {
      supplier: new Supplier("Albert Heijn"),
      price: 0.5
    },
    {
      supplier: new Supplier("Jumbo"),
      price: 1.3
    }
  ]
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
    it("Should return " + 0.5 + "and" + 1.3, function() {
      let productSupplier = product.productSuppliers;
      let result1 = productSupplier[0].price;
      let result2 = productSupplier[1].price;
      assert.equal(result1, 0.5);
      assert.equal(result2, 1.3);
    });
  });

  describe("getProductSuppliers", function() {
    it("Should return Albert Heijn and Jumbo", function() {
      let supplier = product.productSuppliers;
      let result1 = supplier[0].supplier.supplierName;
      let result2 = supplier[1].supplier.supplierName;

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

  describe("getProduct quantity and unit", function() {
    it("Should return " + 100 + "and" + "gram", function() {
      let productQuantity = product.productQuantity;
      let amountResult = productQuantity.amount;
      let unitResult = productQuantity.unit;
      console.log(productQuantity);
      console.log(amountResult);
      console.log(unitResult);
      assert.equal(amountResult, 100);
      assert.equal(unitResult, "gram");
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
