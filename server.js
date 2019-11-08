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

app.get("/", function(req, res) {
  console.log("hi");
});

app.get("/api/ingredient/retrieve", async function(req, res) {
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

  console.log(query);
  res.status(200);
  res.json(query);
});

// API that is called when a new ingredient is requested to beadded.
app.post(
  "/api/ingredient/add",
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
  "/api/recipe/add",
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

// Hosts the server on localhost with selected serverport in settings.
app.listen(port, () =>
  console.log(`Server is listening on localhost:${port}!`)
);
