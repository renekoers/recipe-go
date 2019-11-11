import React from "react";
import { Link } from "react-router-dom";
import "./homepageRecipe.css";

function HomepageRecipe(props) {
  return (
    <article className="recipe-container">
      <Link to={props.id}>
        <div
          className="teaser-image"
          src="../../../../public/img/websitelogo.png"
          alt="recipe-image"
        ></div>
        <h3 className="recipe-name">{props.recipeName}</h3>
      </Link>
      <div className="recipe-description-container">
        <div className="recipe-description">{props.description}</div>
      </div>
    </article>
  );
}

export default HomepageRecipe;
