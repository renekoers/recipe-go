import React from "react";
import { Link } from "react-router-dom";
import "./homepageRecipe.css";

function HomepageRecipe(props) {
  return (
    <div className="homepage-recipe-container">
      <div className="homepage-recipe-content">
        <Link to={"recipes/" + props.id}>
          <img
            className="teaser-image"
            src="https://www.smakelijketenzonderzout.nl/uploads/_products/product_7150/ah-huismerk-gepelde-tomaten.jpg"
            alt="ingredient"
          />
        </Link>
        <div className="homepagerecipe-content-wrapper">
          <Link to={"recipes/" + props.id} className="recipe-name-link">
            <h3 className="recipe-name">{props.recipeName}</h3>
          </Link>
          <div className="recipe-description">{props.description}</div>
        </div>
      </div>
    </div>
  );
}

export default HomepageRecipe;
