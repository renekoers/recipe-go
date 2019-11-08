import React, { Component } from "react";
import "./topMenuBar.css";

class TopMenuBar extends Component {
  state = {
    websiteName: "Recipe & Go",
    navigationTargets: [
      {
        targetName: "Hoi jeroen",
        targetUrl: "/target1"
      },
      {
        targetName: "Target2",
        targetUrl: "/target2"
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
              <a className="MenuBanner" href>
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
    return this.state.navigationTargets.map(target => (
      <a className="NavigationTarget" href={target.url}>
        {target.targetName}
      </a>
    ));
  }
}

export default TopMenuBar;
