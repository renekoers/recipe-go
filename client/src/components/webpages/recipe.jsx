import React, { Component } from "react";
import "./recipe.css";
import RecipeIngredient from "../webpageBase/recipe/ingredients/recipeIngredient";
import ShoppingList from "../webpages/shoppinglist";
import {
  Button,
  Icon,
  Form,
  Divider,
  Header,
  Dropdown
} from "semantic-ui-react";

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeID: props.match.params.recipeID,
      recipe: {},
      recipeIngredientList: [],
      isShoppingListActive: false,
      isShoppingListMissingProducts: true,
      shoppingListItems: [],
      productSupplierOptions: [],
      availableSuppliers: [],
      selectedProductSuppliers: []
    };
  }

  componentDidMount() {
    fetch("/api/recipes/retrieve/byid", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.recipeID
      })
    })
      .then(result => {
        return result.json();
      })
      .then(data => {
        let retrievedRecipe = data;
        this.setState({ recipe: retrievedRecipe[0] }, () => {
          const recipe = this.state.recipe;
          this.extractIngredientsFromRecipe(recipe);
        });
      });
  }

  extractIngredientsFromRecipe = recipe => {
    let shoppingListItems = this.state.shoppingListItems;
    for (let i = 0; i < recipe._recipeIngredients.length; i++) {
      shoppingListItems.push({
        id: i,
        product: {},
        productSupplier: "",
        price: ""
      });
    }
    this.generateRecipeIngredientForms(recipe);
  };

  generateRecipeIngredientForms = recipe => {
    let recipeIngredientList = this.state.recipeIngredientList;
    recipeIngredientList = recipe._recipeIngredients.map(
      (ingredientListing, index) => {
        return (
          <RecipeIngredient
            ingredientName={ingredientListing.ingredient._ingredientName}
            ingredientQuantity={ingredientListing.quantity._amount}
            ingredientUnit={ingredientListing.quantity._unit}
            ingredientProducts={
              ingredientListing.ingredient._ingredientProducts
            }
            getValues={this.getValues.bind(this)}
            generateSupplierOptions={this.generateSupplierOptions.bind(this)}
            selectedProductSuppliers={this.state.selectedProductSuppliers}
            didSupplierSelectionUpdate={true}
            key={index}
            id={index}
          />
        );
      }
    );
    this.setState({ recipeIngredientList });
  };

  handleProductSupplierChange = (e, { value }) => {
    this.setState({ selectedProductSuppliers: value }, () => {
      this.generateRecipeIngredientForms(this.state.recipe);
    });
  };

  generateSupplierOptions = x => {
    let productSupplierOptions = this.state.productSupplierOptions;
    let availableSuppliers = this.state.availableSuppliers;

    for (let supplierName of x) {
      availableSuppliers.push(supplierName);
    }

    this.setState({ availableSuppliers }, () => {
      let availableSuppliers = this.state.availableSuppliers;
      let suppliers = [...new Set(availableSuppliers)];
      productSupplierOptions = suppliers.map((supplier, index) => {
        return {
          key: index,
          text: supplier,
          value: supplier
          // image: supplier._imageUrl <-- To be implemented later
        };
      });
      this.setState({ productSupplierOptions });
    });
  };

  handleMakeShoppingListClick = () => {
    let isShoppingListActive = this.state.isShoppingListActive;
    if (isShoppingListActive === false) {
      isShoppingListActive = true;
      this.setState({ isShoppingListActive });
    }
  };

  handleGoBackToRecipeClick = () => {
    let isShoppingListActive = this.state.isShoppingListActive;
    if (isShoppingListActive === true) {
      isShoppingListActive = false;
      this.setState({ isShoppingListActive });
    }
  };

  getValues = x => {
    let shoppingListItems = this.state.shoppingListItems;
    shoppingListItems[x.id] = {
      id: x.id,
      product: x.product,
      productSupplier: x.productSupplier,
      price: x.price
    };
    console.log(shoppingListItems);
    this.checkIfShoppingListItemsMissing();
  };

  checkIfShoppingListItemsMissing = () => {
    let shoppingListItems = this.state.shoppingListItems;
    let missingProduct = false;
    for (let item of shoppingListItems) {
      if (Object.keys(item.product).length === 0) {
        missingProduct = true;
        break;
      }
    }
    console.log(missingProduct);
    this.setState({ isShoppingListMissingProducts: missingProduct });
  };

  render() {
    return (
      <div>
        {this.state.isShoppingListActive ? (
          <ShoppingList
            shoppingListItems={this.state.shoppingListItems}
            handleGoBackToRecipeClick={this.handleGoBackToRecipeClick.bind(
              this
            )}
          />
        ) : null}
        <div className="recipe-page">
          <div className="recipe-container">
            <div className="recipe">
              <Header as="h1" className="recipe-title">
                {this.state.recipe._recipeName}
              </Header>
              <Divider />
              <div className="recipe-filters-container">
                <div className="suppliers-container">
                  <Dropdown
                    placeholder="Kies uw winkel(s)"
                    fluid
                    multiple
                    selection
                    onChange={this.handleProductSupplierChange}
                    options={this.state.productSupplierOptions}
                  />
                </div>
              </div>
              <div className="recipe-content-container">
                <div className="recipe-ingredient-list-container">
                  <Form>
                    <ul className="ingredient-list">
                      {this.state.recipeIngredientList}
                    </ul>
                  </Form>
                </div>
              </div>
              <div className="button-makelist">
                <Button
                  color="green"
                  animated
                  onClick={this.handleMakeShoppingListClick}
                  disabled={this.state.isShoppingListMissingProducts}
                >
                  <Button.Content visible>
                    {"Maak boodschappenlijst"}
                  </Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Recipe;
