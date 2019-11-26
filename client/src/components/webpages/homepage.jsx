import React, { Component } from "react";
import "../webpageBase/menu/topMenuBar";
import "./homepage.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomepageRecipe from "../webpageBase/recipe/homepageRecipe";

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      frontPageRecipes: []
    };
  }

  componentDidMount() {
    fetch("/api/recipes/retrieve/latest")
      .then(results => {
        return results.json();
      })
      .then(data => {
        let latestRecipes = data.map((recipe, index) => {
          return (
            <HomepageRecipe
              recipeName={recipe._recipeName}
              description={recipe._recipeDescription}
              id={this.formatID(recipe.id)}
              key={index}
            />
          );
        });
        this.setState({ frontPageRecipes: latestRecipes });
      });
  }
  render() {
    return (
      <div className="homepage-page">
        <div className="top-add-recipe-button">
          <Link to="/recipes/add">
            <Button variant="primary">Recept toevoegen</Button>
          </Link>
        </div>
        <div className="recipe-list">{this.state.frontPageRecipes}</div>
      </div>
    );
  }

  formatID(receivedID) {
    let id = receivedID.substring(receivedID.indexOf("/") + 1);
    return id;
  }
}

export default Homepage;
