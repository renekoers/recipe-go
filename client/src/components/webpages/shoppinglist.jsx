import React, { Component } from "react";
import ShoppingListItem from "../webpageBase/product/shoppinglistItem";
import { Button, Icon, Header, Table } from "semantic-ui-react";
import "./shoppinglist.css";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingListItems: props.shoppingListItems,
      shoppingListContent: []
    };

    this.handleGoBackToRecipeClick = props.handleGoBackToRecipeClick;
  }

  componentDidMount() {
    this.generateShoppingListContent();
  }

  generateShoppingListContent = () => {
    let shoppingListItems = this.state.shoppingListItems;
    let shoppingListContent = this.state.shoppingListContent;

    let uniqueProductSuppliers = this.getUniqueSuppliers(shoppingListItems);

    shoppingListContent = uniqueProductSuppliers.map((supplier, index) => {
      return (
        <div className="supplier-shopping-list" key={index}>
          <Header size="medium" className="shopping-list-supplier-header">
            {supplier}
          </Header>
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Prijs</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.generateShoppingListItemsForEachSupplier(
                supplier,
                shoppingListItems
              )}
            </Table.Body>
          </Table>
        </div>
      );
    });
    this.setState({ shoppingListContent });
  };

  generateShoppingListItemsForEachSupplier = (supplier, shoppingListItems) => {
    let shoppingListItemArray = shoppingListItems
      .filter(item => item.productSupplier === supplier)
      .map((item, index) => {
        return (
          <ShoppingListItem
            productName={item.product._productName}
            unit={item.product._productQuantity._unit}
            amount={item.product._productQuantity._amount}
            price={item.price}
            key={index}
          />
        );
      });
    return shoppingListItemArray;
  };

  /**
   *
   * @param {Object[]} shoppingListItems
   * @returns {String[]} unique ProductSuppliers
   */
  getUniqueSuppliers(shoppingListItems) {
    let productSuppliers = shoppingListItems.map(item => {
      return item.productSupplier;
    });
    let uniqueProductSuppliers = [...new Set(productSuppliers)];
    return uniqueProductSuppliers;
  }

  /**
   * @returns {Number} Sum of all selected products' prices
   */
  getTotalPrice = () => {
    let totalprice = 0;
    let shoppingListItems = this.state.shoppingListItems;

    totalprice = shoppingListItems
      .map(item => Number(item.price))
      .reduce((total, price) => {
        return total + price;
      });
    console.log(totalprice);
    return totalprice;
  };

  render() {
    return (
      <div>
        <div className="shopping-list-page">
          <div className="shopping-list-container">
            <div className="shopping-list-content-container">
              <div className="shopping-list-content">
                {this.state.shoppingListContent}
              </div>
            </div>
            <div className="shopping-list-totalprice">
              {"Totaal: €" + this.getTotalPrice().toFixed(2)}
            </div>
            <div className="back-button">
              <Button
                color="red"
                animated
                onClick={this.handleGoBackToRecipeClick}
              >
                <Button.Content visible>{"Terug"}</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow left" />
                </Button.Content>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoppingList;
