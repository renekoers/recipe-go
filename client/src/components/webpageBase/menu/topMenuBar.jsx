import React, { Component } from "react";
import "./topMenuBar.css";
import NavigationButton from "./navigationButton";
import { Link } from "react-router-dom";
import Logo from "../../../img/websitelogo.png";

class TopMenuBar extends Component {
  state = {
    websiteName: "Recipe & Go",
    navigationTargets: [
      {
        targetName: "Recepten",
        targetUrl: "/"
      },
      {
        targetName: "Producten",
        targetUrl: "/products"
      }
    ]
  };

  render() {
    return (
      <header className="TopMenuBarContainer">
        <div className="TopMenuBar">
          <div className="NavigationContainer">
            <div className="Navigation">
              <Link className="MenuBanner" to="/">
                <img className="MenuLogo" src={Logo} alt="logo"></img>
                <span className="MenuWebsiteName">
                  {this.state.websiteName}
                </span>
              </Link>
              <nav className="NavigationBar">{this.getNavigationTargets()}</nav>
            </div>
          </div>
        </div>
      </header>
    );
  }

  getNavigationTargets() {
    return this.state.navigationTargets.map((target, index) => (
      <NavigationButton
        key={index}
        targetName={target.targetName}
        targetUrl={target.targetUrl}
      />
    ));
  }
}

export default TopMenuBar;
