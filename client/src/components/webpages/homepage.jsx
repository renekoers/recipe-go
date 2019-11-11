import React, { Component } from "react";
import "../webpageBase/menu/topMenuBar";
import "./homepage.css";
import TopMenuBar from "../webpageBase/menu/topMenuBar";
import HomepageRecipe from "../webpageBase/recipe/homepageRecipe";

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      recipes: []
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
              id={recipe.id}
              key={index}
            />
          );
        });
        this.setState({ recipes: latestRecipes });
      });
  }
  render() {
    return (
      <div>
        <TopMenuBar />
        <div className="recipe-list">{this.state.recipes}</div>
      </div>
    );
  }
}

export default Homepage;
