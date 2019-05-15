import React, { Component } from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import IngredientTile from "../components/IngredientTile";
import StepsTile from "../components/StepsTile";
import DietTile from "../components/DietTile";

class RecipesShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      recipeImage: "",
      readyInMinutes: "",
      diet: [],
      steps: [],
      ingredients: []
    };
  }

  favorite() {
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

  componentDidMount() {
    let recipeId = this.props.params.id;
    fetch(`/api/v1/recipes/${recipeId}`)
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
          title: body.title,
          recipeImage: body.recipeImage,
          instructions: body.instructions,
          steps: body.steps,
          readyInMinutes: body.readyInMinutes,
          diet: body.diet,
          ingredients: body.ingredients
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }
  render() {
    let diets = this.state.diet.map((preference, index) => {
      let dietClassName;
      let diet = Object.keys(preference).join("");
      if (preference[diet] === true) {
        dietClassName = "tick";
      } else {
        dietClassName = "cross";
      }
      return <DietTile key={index} name={diet} dietClassName={dietClassName} />;
    });
    let steps = this.state.steps.map((step, index) => {
      let ingredientsImages = [];
      step.ingredients.map(ingredient => {
        ingredientsImages.push(ingredient.image);
      });
      return (
        <StepsTile
          key={index}
          id={step.number}
          step={step.step}
          ingredientsImages={ingredientsImages}
        />
      );
    });
    let ingredients = this.state.ingredients.map(ingredient => {
      let url = "https://spoonacular.com/recipeImages/";
      return (
        <IngredientTile
          key={ingredient.id}
          id={ingredient.id}
          name={ingredient.name}
          amount={ingredient.originalString}
        />
      );
    });
    return (
      <div>
        <h2>{this.state.title}</h2>
        <img src={this.state.recipeImage} alt="recipe-image" />
        <h5>Ready in {this.state.readyInMinutes} minutes </h5>
        <ul className="featureList">{diets}</ul>
        What you will need:
        {ingredients}
        {steps}
      </div>
    );
  }
}

export default RecipesShowContainer;
