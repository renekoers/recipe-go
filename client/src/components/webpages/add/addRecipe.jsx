import React, { Component } from "react";
import { Button, Form, ButtonGroup } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import IngredientForm from "../../webpageBase/interaction/forms/ingredientForm";
import AddIngredient from "../../webpages/add/addIngredient";
import "./addRecipe.css";

class AddRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      recipeName: "",
      recipeDescription: "",
      recipeIngredients: [
        {
          ingredientObject: "",
          ingredientQuantityObject: {
            amount: "",
            unit: ""
          }
        }
      ],
      ingredientAmount: 1,
      ingredientForm: []
    };
  }
  render() {
    const redirect = this.state.redirect;
    if (redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <div className="add-recipe-page">
        <div>{this.state.ingredientForm}</div>
        <div className="add-recipe-form-container">
          <Form
            onSubmit={a => {
              a.preventDefault();
              this.handleSubmit();
            }}
          >
            <Form.Group controlid="validation-recipe-name">
              <Form.Label>Naam recept</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Naam"
                value={this.state.recipeName}
                onChange={e => this.setState({ recipeName: e.target.value })}
              />
              <Form.Text className="text-muted">
                Bijvoorbeeld: Ome henk's Stampot Boerenkool
              </Form.Text>
            </Form.Group>

            <Form.Group controlid="validation-recipe-name">
              <Form.Label>Descriptie</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows="2"
                placeholder="Geef een korte beschrijving"
                value={this.state.recipeDescription}
                onChange={e =>
                  this.setState({ recipeDescription: e.target.value })
                }
              />
              <Form.Text className="text-muted">
                Bijvoorbeeld: Stampot boerenkool met heerlijke kippenjus!
              </Form.Text>
            </Form.Group>

            <Form.Group controlid="validation-recipe-ingredient">
              <Form.Label>Ingrediënten</Form.Label>
              <div className="ingredient-forms-container">
                {this.generateIngredientForms()}
              </div>
              <ButtonGroup className="form-button-row">
                <Button
                  variant="success"
                  type="button"
                  className="add-button"
                  onClick={() => {
                    this.addIngredientForm();
                  }}
                >
                  {"Voeg toe"}
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  className="remove-button"
                  onClick={() => {
                    this.removeIngredientForm();
                  }}
                >
                  {"Verwijder"}
                </Button>
              </ButtonGroup>
              <Button
                variant="secondary"
                type="button"
                className="add-ingredient-button"
                onClick={() => this.renderNewIngredientForm()}
              >
                Maak ingrediënt
              </Button>
            </Form.Group>

            <Button variant="primary" type="submit" className="submit-button">
              Stuur recept op
            </Button>
          </Form>
        </div>
      </div>
    );
  }

  generateIngredientForms() {
    return [...new Array(this.state.ingredientAmount)].map((i, index) => {
      return (
        <IngredientForm
          getValues={this.getValues.bind(this)}
          id={index}
          key={index}
        />
      );
    });
  }

  getValues(x) {
    let recipeIngredients = this.state.recipeIngredients;
    recipeIngredients = recipeIngredients.map((otherIngredient, index) => {
      if (index === x.id) {
        return {
          ingredientObject: x.ingredientObject,
          ingredientQuantityObject: {
            amount: x.amount,
            unit: x.unit
          }
        };
      } else {
        return otherIngredient;
      }
    });

    this.setState({ recipeIngredients });
  }

  addIngredientForm() {
    let ingredientAmount = this.state.ingredientAmount;
    let recipeIngredients = this.state.recipeIngredients;
    ingredientAmount += 1;
    recipeIngredients.push({
      ingredientObject: "",
      ingredientQuantityObject: {
        amount: "",
        unit: ""
      }
    });
    this.setState({ ingredientAmount, recipeIngredients });
  }

  removeIngredientForm() {
    let ingredientAmount = this.state.ingredientAmount;
    let recipeIngredients = this.state.recipeIngredients;
    if (ingredientAmount > 1) {
      ingredientAmount -= 1;
      recipeIngredients.pop();
      this.setState({ ingredientAmount, recipeIngredients });
    }
  }

  renderNewIngredientForm() {
    let ingredientForm = this.state.ingredientForm;
    if (ingredientForm.length === 0) {
      ingredientForm.push(
        <AddIngredient
          saveIngredientToDatabase={this.saveIngredientToDatabase.bind(this)}
          cancelForm={this.closeAddIngredientWindow.bind(this)}
          key={0}
        />
      );
    }
    this.setState({ ingredientForm });
    console.log(ingredientForm);
  }

  closeAddIngredientWindow() {
    let ingredientForm = this.state.ingredientForm;
    ingredientForm.pop();
    this.setState({ ingredientForm });
  }

  saveIngredientToDatabase(ingredient) {
    fetch("/api/ingredient/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ingredient)
    })
      .then(response => this.checkIfIngredientAdded(response))
      .catch(error => {
        console.log("Request failed", error);
      });
  }

  checkIfIngredientAdded(response) {
    if (response.status === 200) {
      this.closeAddIngredientWindow();
      console.log("Ingredient added succesfully!");
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  saveRecipeToDatabase(recipe) {
    console.log("Recipe being sent!");
    fetch("/api/recipes/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    })
      .then(response => this.status(response))
      .catch(error => {
        console.log("Request failed", error);
      });
  }

  status(response) {
    console.log(response.status);
    if (response.status === 200) {
      console.log("Recipe added succesfully!");
      this.redirectToHomePage();
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  redirectToHomePage() {
    this.setState({ redirect: true });
  }

  handleSubmit() {
    console.log("Submit button clicked");
    let toBeAddedRecipe = {
      recipeName: this.state.recipeName,
      recipeDescription: this.state.recipeDescription,
      recipeIngredients: this.state.recipeIngredients
    };
    this.saveRecipeToDatabase(toBeAddedRecipe);
  }
}

export default AddRecipe;
