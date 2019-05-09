import React, { Component } from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import RecipeShowTile from "../components/RecipeShowTile";

class RecipesShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: []
    };
  }
  componentDidMount() {
    let recipeId = this.props.params.id;
    fetch(`/api/v1/recipes/#{recipeId}`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}(${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ recipe: body });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render() {
    return;
  }
}

export default RecipesShowContainer;
