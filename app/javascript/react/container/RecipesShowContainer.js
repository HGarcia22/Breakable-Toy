import React, { Component } from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";

class RecipesShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: []
    };
  }
}

export default RecipesShowContainer;
