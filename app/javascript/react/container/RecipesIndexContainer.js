import React, { Component } from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import SearchForm from "./SearchForm";
import RecipeTile from "../components/RecipeTile";

class RecipesIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
    this.getRecipes = this.getRecipes.bind(this);
  }

  getRecipes(formPayload) {
    fetch("/api/v1/recipes/search", {
      method: "POST",
      body: JSON.stringify(formPayload),
      headers: {
        "Content-Type": "application/json"
      }
    })
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
        this.setState({
          recipes: body.recipes
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render() {
    return (
      <div>
        <RecipeTile />
        <SearchForm getRecipes={this.getRecipes} />
      </div>
    );
  }
}

export default RecipesIndexContainer;
