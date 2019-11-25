import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import "./shoppinglistItem.css";

class ShoppingListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: props.productName,
      unit: props.unit,
      amount: props.amount,
      price: props.price
    };
  }
  render() {
    return (
      <Table.Row>
        <Table.Cell className="item-product">
          {this.state.productName +
            " (" +
            this.state.amount +
            " " +
            this.state.unit +
            ")"}
        </Table.Cell>

        <Table.Cell className="item-price">{"€" + this.state.price}</Table.Cell>
      </Table.Row>
    );
  }
}

export default ShoppingListItem;
