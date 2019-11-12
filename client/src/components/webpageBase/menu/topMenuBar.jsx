import React, { Component } from "react";
import "./topMenuBar.css";
import NavigationButton from "./navigationButton";

class TopMenuBar extends Component {
  state = {
    websiteName: "Recipe & Go",
    navigationTargets: [
      {
        targetName: "Recepten",
        targetUrl: "/"
      },
      {
        targetName: "Ingrediënten",
        targetUrl: "/ingredients"
      },
      {
        targetName: "Target3",
        targetUrl: "/target3"
      },
      {
        targetName: "Target4",
        targetUrl: "/target4"
      }
    ]
  };

  render() {
    return (
      <header className="TopMenuBarContainer">
        <div className="TopMenuBar">
          <div className="NavigationContainer">
            <div className="Navigation">
              <a className="MenuBanner" href="/">
                <img
                  className="MenuLogo"
                  src="./img/websitelogo.png"
                  alt="logo"
                ></img>
                <span className="MenuWebsiteName">
                  {this.state.websiteName}
                </span>
              </a>
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
