import React from "react";
import { Link } from "react-router-dom";
import "./navigationButton.css";

function NavigationButton(props) {
  return (
    <Link to={props.targetUrl} className="NavigationButton">
      {props.targetName}
    </Link>
  );
}

export default NavigationButton;
