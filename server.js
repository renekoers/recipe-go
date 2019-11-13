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
const Ingredient = require("./src/domain/ingredient");
const Recipe = require("./src/domain/recipe");
const Store = require("./src/domain/store");

// API that is called when a new ingredient is requested to beadded.
app.post(
  "/api/ingredients/add",
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async function(req, res) {
    let ingredient = new Ingredient(req.body);

    const session = store.openSession();

    ingredient = await session.store(ingredient);
    await session.saveChanges();
    console.log("Ingredient was added.");

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
    console.log("Recipe was added.");
  }
);

app.get(
  "/api/ingredients/retrieve/all",
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async function(req, res) {
    console.log("API call: request for ingredients.");
    const session = store.openSession();
    const query = await session
      .query({ collection: "Ingredients" })
      .waitForNonStaleResults()
      .selectFields([
        "id",
        "_ingredientName",
        "_ingredientKind",
        "_ingredientPrice",
        "_lastUpdate",
        "_ingredientRating",
        "_ingredientSuppliers"
      ])
      .all();

    res.status(200);
    res.json(query);
  }
);

app.get(
  "/api/ingredients/retrieve/latest",
  /**
   *
   * @param {Request} req
   * @param {Response} res
   */
  async function(req, res) {
    console.log("API call: request for latest ingredients.");
    const session = store.openSession();
    const query = await session
      .query({ collection: "Ingredients" })
      .waitForNonStaleResults()
      .selectFields([
        "id",
        "_ingredientName",
        "_ingredientKind",
        "_ingredientPrice",
        "_lastUpdate",
        "_ingredientRating",
        "_ingredientSuppliers"
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
    .query({ collection: "Stores" })
    .waitForNonStaleResults()
    .all();

  res.status(200);
  res.json(query);
});

// app.get("/api/initializestore", async function(req, res) {
//   let newStorename = "";
//   let newStore = new Store(newStorename);

//   let session = store.openSession();
//   newStore = await session.store(newStore);
//   await session.saveChanges();

//   console.log(newStore + " added!");
//   res.status(200);
//   res.json(newStore);
// });

// API to make recipes while function is not yet available on the website
app.get("/api/makerecipetest", async function(req, res) {
  let newIngredient = {
    ingredientName: "aardbei",
    ingredientKind: "fruit",
    ingredientPrice: 0.6,
    ingredientSuppliers: ["Albert Heijn"]
  };

  let newQuantity = {
    amount: 10,
    unit: "gram"
  };
  let ingredient = new Ingredient(newIngredient);
  let neededIngredient = {
    ingredientObject: ingredient,
    quantityObject: newQuantity
  };

  let newRecipe = {
    recipeName: "Aardbeien Jam",
    recipeDescription: "Het is een aardbei in een pot.",
    recipeIngredients: [neededIngredient]
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
