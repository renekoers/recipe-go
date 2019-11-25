import React, { Component } from "react";
import { Dropdown, Form } from "semantic-ui-react";
import "./recipeIngredient.css";

class RecipeIngredient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      ingredientName: props.ingredientName,
      ingredientQuantity: props.ingredientQuantity,
      ingredientUnit: props.ingredientUnit,
      ingredientProducts: props.ingredientProducts,
      selectedProductSuppliers: props.selectedProductSuppliers,
      productOptions: [],
      availableProductsWithCurrentSupplierSelection: [],
      selectedProduct: {},
      selectedProductPrice: "",
      selectedProductId: "",
      bestSupplierChoice: "",
      firstOptionId: "",
      hasProductsDropdownNoOptions: true
    };

    this.callback = props.getValues;
    this.returnAllSuppliers = props.generateSupplierOptions;
  }

  componentDidMount() {
    let allSuppliers = [];
    for (let product of this.state.ingredientProducts) {
      for (let productSupplier of product._productSuppliers) {
        allSuppliers.push(productSupplier.supplier._supplierName);
      }
    }
    this.returnAllSuppliers(allSuppliers);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.selectedProductSuppliers !== this.props.selectedProductSuppliers
    ) {
      this.getProductsForIngredients();
    }
  }

  getProductObjectWithCurrentId = () => {
    let availableProductsWithCurrentSupplierSelection = this.state
      .availableProductsWithCurrentSupplierSelection;
    let selectedProduct = this.state.selectedProduct;
    let selectedProductId = this.state.selectedProductId;

    for (let product of availableProductsWithCurrentSupplierSelection) {
      if (product.id === selectedProductId) {
        selectedProduct = product;
      }
    }
    this.setState({ selectedProduct }, () => {
      this.handlePriceChange();
    });
  };

  handleUserProductSelectionChange = (e, { value }) => {
    this.setState({ selectedProductId: value }, () => {
      this.getProductObjectWithCurrentId();
    });
  };

  handleSupplierProductSelectionChange = productId => {
    this.setState({ selectedProductId: productId }, () => {
      this.getProductObjectWithCurrentId();
    });
  };

  getProductsForIngredients = () => {
    let ingredientProducts = this.state.ingredientProducts;
    let newingredientProducts = JSON.parse(JSON.stringify(ingredientProducts));
    let availableProductsWithCurrentSupplierSelection = this.state
      .availableProductsWithCurrentSupplierSelection;
    availableProductsWithCurrentSupplierSelection = [];

    for (let product of newingredientProducts) {
      let eligibleSuppliers = product._productSuppliers.filter(supplier =>
        this.props.selectedProductSuppliers.includes(
          supplier.supplier._supplierName
        )
      );

      let eligibleProduct = product;
      eligibleProduct._productSuppliers = eligibleSuppliers;

      availableProductsWithCurrentSupplierSelection.push(eligibleProduct);
    }
    this.setState({ availableProductsWithCurrentSupplierSelection }, () => {
      this.generateProductOptions();
    });
  };

  generateProductOptions = () => {
    let productOptions = this.state.availableProductsWithCurrentSupplierSelection.map(
      (product, index) => {
        if (product._productSuppliers.length < 1) {
          return {
            key: index,
            text: "Geen product beschikbaar",
            value: 0,
            suppliers: []
          };
        }
        return {
          key: index,
          text: product._productName,
          value: product.id,
          suppliers: product._productSuppliers
          // image:
        };
      }
    );
    this.setState({ productOptions: productOptions }, () => {
      this.selectFirstProduct();
    });
  };

  selectFirstProduct = () => {
    let selectedProductId = "";
    let hasProductsDropdownNoOptions = false;
    if (this.state.productOptions.length < 1) {
      hasProductsDropdownNoOptions = true;
    } else if (
      this.state.productOptions.length === 1 &&
      this.state.productOptions[0].value === 0
    ) {
      hasProductsDropdownNoOptions = true;
    } else {
      hasProductsDropdownNoOptions = false;
      for (let option of this.state.productOptions) {
        if (option.value !== 0) {
          selectedProductId = option.value;
        }
      }
    }
    this.setState(
      {
        selectedProductId: selectedProductId,
        hasProductsDropdownNoOptions: hasProductsDropdownNoOptions
      },
      () => {
        this.handleSupplierProductSelectionChange(this.state.selectedProductId);
      }
    );
  };

  handlePriceChange = () => {
    let selectedProduct = this.state.selectedProduct;
    let bestSupplierChoice = this.state.bestSupplierChoice;
    let lowestPrice = 0;
    let supplierAmount = 0;

    if (Object.keys(selectedProduct).length === 0) {
      supplierAmount = 0;
    } else {
      supplierAmount = selectedProduct._productSuppliers.length;
    }

    for (let i = 0; i < supplierAmount; i++) {
      if (i === 0) {
        lowestPrice = Number(selectedProduct._productSuppliers[i].price);
        bestSupplierChoice =
          selectedProduct._productSuppliers[i].supplier._supplierName;
      } else if (
        i > 0 &&
        Number(selectedProduct._productSuppliers[i].price) < lowestPrice
      ) {
        lowestPrice = Number(selectedProduct._productSuppliers[i].price);
        bestSupplierChoice =
          selectedProduct._productSuppliers[i].supplier._supplierName;
      }
    }
    this.setState(
      {
        selectedProductPrice: lowestPrice.toFixed(2),
        bestSupplierChoice
      },
      () => {
        this.handleCallBack();
      }
    );
  };

  handleCallBack = () => {
    this.callback({
      id: this.state.id,
      product: this.state.selectedProduct,
      productSupplier: this.state.bestSupplierChoice,
      price: this.state.selectedProductPrice
    });
  };

  render() {
    console.log(this.props.selectedProductSuppliers);
    return (
      <li className="ingredient-container">
        <div className="ingredient">
          <div className="ingredient-quantity-unit">
            {this.state.ingredientQuantity} {this.state.ingredientUnit}
          </div>
          <div className="ingredient-name">{this.state.ingredientName}</div>
          <div className="ingredient-product-supplier-container">
            {this.state.bestSupplierChoice}
          </div>
          <div className="ingredient-products-container">
            <Form.Dropdown
              control={Dropdown}
              className="ingredient-product-dropdown"
              fluid
              selection
              value={this.state.selectedProductId}
              disabled={this.state.hasProductsDropdownNoOptions}
              options={this.state.productOptions}
              onChange={this.handleUserProductSelectionChange}
            />
          </div>
          <div className="ingredient-product-price-container">
            <div className="ingredient-product-price">
              {this.state.selectedProductPrice === ""
                ? "€ -.--"
                : "€ " + this.state.selectedProductPrice}
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default RecipeIngredient;
