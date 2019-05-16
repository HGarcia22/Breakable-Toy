import React, { Component } from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import SearchForm from "./SearchForm";
import RecipeTile from "../components/RecipeTile";
import recipehub2 from "../../../assets/images/recipehub2.png";

class RecipesIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      baseUri: null
    };
    this.getRecipes = this.getRecipes.bind(this);
  }

  getRecipes(formPayload) {
    const body = JSON.stringify({ formPayload });
    console.log(formPayload);
    fetch("/api/v1/recipes/search", {
      method: "POST",
      body: body,
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
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
          recipes: body.results,
          baseUri: body.baseUri
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render() {
    let recipes = this.state.recipes.map(recipe => {
      return (
        <RecipeTile
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          imageUri={this.state.baseUri + recipe.image}
          readyInMinutes={recipe.readyInMinutes}
          servings={recipe.servings}
        />
      );
    });
    return (
      <div>
        <div className="spanImage">
          <img src={recipehub2} alt="recipehub" />
        </div>
        <div className="search-form">
          <SearchForm getRecipes={this.getRecipes} />
        </div>
        <div id="recipe-container">{recipes}</div>
      </div>
    );
  }
}

export default RecipesIndexContainer;
