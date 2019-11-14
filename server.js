// Express
const express = require("express");
const app = express();
const port = 5000;
app.use(express.static("public"));
app.use(express.json());

// RavenDB
const { DocumentStore } = require("ravendb");
const dbUrl = "http://127.0.0.1:1337/";
const store = new DocumentStore([dbUrl], "RecipeGo");
const conventions = store.conventions;
store.initialize();

// Classes
const Product = require("./src/domain/product");
const Recipe = require("./src/domain/recipe");
const Supplier = require("./src/domain/supplier");

// API that is called when a new product is requested to beadded.
app.post(
  "/api/products/add",
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async function(req, res) {
    let product = new Product(req.body);

    const session = store.openSession();

    product = await session.store(product);
    await session.saveChanges();

    res.sendStatus(200);
  }
);

// API that is called when a new recipe is requested to be added.
app.post(
  "/api/recipes/add",
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async function(req, res) {
    let recipe = new Recipe(req.body);

    const session = store.openSession();

    recipe = await session.store(recipe);
    await session.saveChanges();
  }
);

app.get(
  "/api/products/retrieve/all",
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async function(req, res) {
    const session = store.openSession();
    const query = await session
      .query({ collection: "Products" })
      .waitForNonStaleResults()
      .selectFields([
        "id",
        "_productName",
        "_productKind",
        "_productPrice",
        "_lastUpdate",
        "_productRating",
        "_productSuppliers"
      ])
      .all();

    res.status(200);
    res.json(query);
  }
);

app.get(
  "/api/products/retrieve/latest",
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async function(req, res) {
    const session = store.openSession();
    const query = await session
      .query({ collection: "Products" })
      .waitForNonStaleResults()
      .selectFields([
        "id",
        "_productName",
        "_productKind",
        "_productPrice",
        "_lastUpdate",
        "_productRating",
        "_productSuppliers"
      ])
      .take(10)
      .all();

    res.status(200);
    res.json(query);
  }
);

app.get(
  "/api/recipes/retrieve/latest",
  /**
   *
   * @param {Request} req
   * @param {Response} res JSON response with 10 latest recipes.
   */
  async function(req, res) {
    const session = store.openSession();
    const query = await session
      .query({ collection: "Recipes" })
      .waitForNonStaleResults()
      .selectFields(["id", "_recipeName", "_recipeDescription"])
      .take(10)
      .all();

    res.status(200);
    res.json(query);
  }
);

app.post(
  "/api/recipes/retrieve/byid",

  /**
   *
   * @param {Request} req Request containing JSON object with recipe ID.
   * @param {Response} res
   */
  async function(req, res) {
    let data = req.body;
    const session = store.openSession();
    const query = await session
      .query({ collection: "Recipes" })
      .waitForNonStaleResults()
      .whereEquals("id", "recipes/" + data.id)
      .all();

    res.status(200);
    res.json(query);
  }
);

app.get("/api/suppliers/retrieve/all", async function(req, res) {
  const session = store.openSession();
  const query = await session
    .query({ collection: "Suppliers" })
    .waitForNonStaleResults()
    .all();

  res.status(200);
  res.json(query);
});

app.post("/api/initializesupplier", async function(req, res) {
  let newSupplierReq = req.body;
  let newSupplierName = newSupplierReq.supplierName;
  let newSupplier = new Supplier(newSupplierName);
  console.log(newSupplier);
  let session = store.openSession();
  newSupplier = await session.store(newSupplier);
  await session.saveChanges();

  res.status(200);
  res.json(newSupplier);
});

// API to make recipes while function is not yet available on the website
app.get("/api/makerecipetest", async function(req, res) {
  let newProduct = {
    productName: "aardbei",
    productKind: "fruit",
    productPrice: 0.6,
    productSuppliers: ["Albert Heijn"]
  };

  let newQuantity = {
    amount: 10,
    unit: "gram"
  };
  let product = new Product(newProduct);
  let neededProduct = {
    productObject: product,
    quantityObject: newQuantity
  };

  let newRecipe = {
    recipeName: "Aardbeien Jam",
    recipeDescription: "Het is een aardbei in een pot.",
    recipeProducts: [neededProduct]
  };

  let recipe = new Recipe(newRecipe);

  const session = store.openSession();
  recipe = await session.store(recipe);
  await session.saveChanges();
  console.log("recipe added");
});

// Hosts the server on localhost with selected serverport in settings.
app.listen(port, () =>
  console.log(`Server is listening on localhost:${port}!`)
);
