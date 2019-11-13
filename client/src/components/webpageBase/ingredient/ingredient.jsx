import React, { Component } from "react";

import "./ingredient.css";

class Ingredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredient: {
        ingredientName: props.ingredientName,
        ingredientKind: props.ingredientKind,
        ingredientPrice: props.ingredientPrice,
        ingredientSuppliers: props.ingredientSuppliers,
        ingredientRating: props.ingredientRating
      },
      suppliers: []
    };
  }

  componentDidMount() {
    let suppliers = this.getIngredientSuppliers(
      this.state.ingredient.ingredientSuppliers
    );
    this.setState({ suppliers: suppliers });
  }

  render() {
    return (
      <div className="ingredient-list-unit">
        <article className="ingredient">
          <div className="ingredient-top-bar">
            <div className="ingredient-name">
              {this.state.ingredient.ingredientName}
            </div>
            <div className="ingredient-rating">
              rating: {this.state.ingredient.ingredientRating}
            </div>
          </div>
          <div className="ingredient-content-container">
            <img
              className="ingredient-image"
              alt="ingredient"
              src="https://www.smakelijketenzonderzout.nl/uploads/_products/product_7150/ah-huismerk-gepelde-tomaten.jpg"
            />
            <div className="ingredient-information">
              <div className="ingredient-price">
                €{this.state.ingredient.ingredientPrice.toFixed(2)}
              </div>
              <ul className="ingredient-suppliers">
                Verkocht bij: {this.state.suppliers}
              </ul>
            </div>
          </div>
        </article>
      </div>
    );
  }

  getIngredientSuppliers(suppliers) {
    let supplierArray = suppliers.map((supplier, index) => {
      return (
        <li className="ingredient-supplier" key={index}>
          {supplier._storeName}
        </li>
      );
    });
    return supplierArray;
  }
}

export default Ingredient;
