import React, { Component } from "react";
import ReactDOM from "react-dom";
import Homepage from "./components/webpages/homepage";
import Recipe from "./components/webpages/recipe";
import TopMenuBar from "./components/webpageBase/menu/topMenuBar";
import Products from "./components/webpages/products";
import AddProduct from "./components/webpages/add/addProduct";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class WebsiteApp extends Component {
  render() {
    return (
      <BrowserRouter>
        <TopMenuBar />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/recipes/:recipeID" exact strict component={Recipe} />
          <Route path="/products" exact strict component={Products} />
          <Route path="/products/add" exact strict component={AddProduct} />
        </Switch>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<WebsiteApp />, document.getElementById("root"));
