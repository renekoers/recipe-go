import React, { Component } from "react";
import ReactDOM from "react-dom";
import Homepage from "./components/webpages/homepage";
import Recipe from "./components/webpages/recipe";
import { BrowserRouter, Route } from "react-router-dom";

class WebsiteApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={Homepage} />
        {/* <Route path="/ingredienten" exact strict component={Ingredients} /> */}
        <Route path="/recipes/:recipe-id" exact strict component={Recipe} />
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<WebsiteApp />, document.getElementById("root"));
