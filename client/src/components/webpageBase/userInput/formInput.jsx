import React, { Component } from "react";
import "./formInput.css";

class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      formName: props.formName,
      placeholder: props.hint,
      type: props.type,
      className: "form-input-field"
    };
  }
  render() {
    return (
      <label className="form-input-container">
        <input
          className={this.state.className}
          value={this.state.inputValue}
          onChange={input => this.handleFormChange(input)}
        />
        <div className="form-input-name">{this.state.formName}</div>
      </label>
    );
  }

  handleFormChange(input) {
    this.setState({
      inputValue: input.target.value
    });
    this.updateClass();
  }

  updateClass() {
    let className = this.state.className;
    if (this.state.inputValue.length > 0) {
      className = "form-input-field value-exists";
    } else {
      className = "form-input-field";
    }
    this.setState({ className });
  }
}

export default FormInput;
