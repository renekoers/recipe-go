import React, { Component } from "react";
import ReactDOM from "react-dom";
import Homepage from "./components/webpages/homepage";
import Recipe from "./components/webpages/recipe";
import TopMenuBar from "./components/webpageBase/menu/topMenuBar";
import Ingredients from "./components/webpages/ingredients";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class WebsiteApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <TopMenuBar />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/recipes/:recipeID" exact strict component={Recipe} />
          <Route path="/ingredients" exact strict component={Ingredients} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<WebsiteApp />, document.getElementById("root"));
