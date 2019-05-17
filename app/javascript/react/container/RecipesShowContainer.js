import React, { Component } from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import IngredientTile from "../components/IngredientTile";
import StepsTile from "../components/StepsTile";
import DietTile from "../components/DietTile";

class RecipesShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      recipeImage: "",
      readyInMinutes: "",
      diet: [],
      steps: [],
      ingredients: [],
      favorited: false,
      current_user: null
    };
    this.favoriteOnClick = this.favoriteOnClick.bind(this);
  }
  favoriteOnClick(event) {
    event.preventDefault();
    const recipeId = this.props.params.id;
    if (this.state.favorited === true) {
      fetch(`/api/v1/recipes/${recipeId}`, {
        credentials: "same-origin",
        method: "DELETE",
        body: JSON.stringify(recipeId),
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
          this.setState({ favorited: false });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    } else {
      this.setState({ favorited: true });
      fetch("/api/v1/recipes", {
        method: "POST",
        body: recipeId,
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
          this.setState({ favorited: true });
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  componentDidMount() {
    const recipeId = this.props.params.id;
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
          id: body.id,
          title: body.title,
          recipeImage: body.recipeImage,
          instructions: body.instructions,
          steps: body.steps,
          readyInMinutes: body.readyInMinutes,
          diet: body.diet,
          ingredients: body.ingredients,
          favorited: body.favorited,
          current_user: body.current_user
        });
        let y = this.state.current_user;
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let favoriteClassName;
    if (this.state.favorited === true) {
      favoriteClassName = "yes";
    } else {
      favoriteClassName = "no";
    }
    let steps = this.state.steps.map((step, index) => {
      return (
        <StepsTile key={index + "steps"} id={step.number} step={step.step} />
      );
    });
    let diets = this.state.diet.map((preference, index) => {
      let dietClassName;
      let diet = Object.keys(preference).join("");
      if (preference[diet] === true) {
        dietClassName = "tick";
      } else {
        dietClassName = "cross";
      }
      return (
        <DietTile
          key={index + "diet"}
          name={diet}
          dietClassName={dietClassName}
        />
      );
    });
    let ingredients = this.state.ingredients.map((ingredient, index) => {
      let url = "https://spoonacular.com/recipeImages/";
      return (
        <IngredientTile
          key={ingredient.id + index + "ingredient"}
          id={ingredient.id}
          name={ingredient.name}
          amount={ingredient.originalString}
        />
      );
    });
    let favoriteButton = "";
    if (this.state.current_user !== null) {
      favoriteButton = (
        <div onClick={this.favoriteOnClick} className={favoriteClassName}>
          ❤️
        </div>
      );
    }
    return (
      <div className="showContainer">
        <div className="favorite-wrapper">
          <div className="show-title">
            <h2>How to make {this.state.title}</h2>
          </div>
          {favoriteButton}
        </div>
        <div className="show-image">
          <img src={this.state.recipeImage} alt="recipe-image" />
          <div className="diet">
            <ul className="featureList">{diets}</ul>
          </div>
        </div>
        <div className="ready">
          <h5>Ready in {this.state.readyInMinutes} minutes </h5>
        </div>
        <div className="ingredient-wrapper">
          <h3 className="what-you-need">What you need:</h3>
          <div className="show-ingredients">{ingredients}</div>
        </div>
        <div className="instructions">
          <h3 className="instruction-title">Instructions:</h3>
          <ol className="steps">{steps}</ol>
        </div>
      </div>
    );
  }
}

export default RecipesShowContainer;
