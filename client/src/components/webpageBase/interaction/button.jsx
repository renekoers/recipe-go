import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./button.css";

class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      target: props.target,
      kind: props.kind
    };
  }
  render() {
    let className = this.state.kind;

    return (
      <Link to={this.state.target}>
        <button className={"btn " + className}>{this.state.value}</button>
      </Link>
    );
  }
}

export default Button;
