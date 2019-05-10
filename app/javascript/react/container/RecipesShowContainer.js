import React, { Component } from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import RecipeShowTile from "../components/RecipeShowTile";

class RecipesShowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {
        title: "",
        recipeImage: "",
        instructions: "",
        readyInMinutes: "",
        vegetarian: false,
        glutenFree: false,
        dairyFree: false,
        vegan: false,
        ketogenic: false,
        lowFodmap: false,
        ingredients: []
      }
    };
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
          recipe: {
            title: body.title,
            recipeImage: body.image,
            instructions: body.instructions,
            readyInMinutes: body.readyInMinutes,
            vegetarian: body.vegetarian,
            glutenFree: body.glutenFree,
            dairyFree: body.dairyFree,
            vegan: body.vegan,
            ketogenic: body.ketogenic,
            lowFodmap: body.lowFodmap,
            ingredients: body.extendedIngredients
          }
        });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  glutenFree() {
    let glutenFree;
    if (this.state.recipe.glutenFree === true) {
      glutenFree = <li className="tick">Gluten Free</li>;
    } else {
      glutenFree = <li className="cross">Gluten Free</li>;
    }
    return glutenFree;
  }

  dairyFree() {
    let dairyFree;
    if (this.state.recipe.dairyFree === true) {
      dairyFree = <li className="tick">Dairy Free</li>;
    } else {
      dairyFree = <li className="cross">Dairy Free</li>;
    }
    return dairyFree;
  }

  vegetarian() {
    let vegetarian;
    if (this.state.recipe.vegetarian === true) {
      vegetarian = <li className="tick">Vegetarian</li>;
    } else {
      vegetarian = <li className="cross">Vegetarian</li>;
    }
    return vegetarian;
  }

  vegan() {
    let vegan;
    if (this.state.recipe.vegan === true) {
      vegan = <li className="tick">Vegan</li>;
    } else {
      vegan = <li className="cross">Vegan</li>;
    }
    return vegan;
  }

  ketogenic() {
    let ketogenic;
    if (this.state.recipe.ketogenic === true) {
      ketogenic = <li className="tick">Ketogenic</li>;
    } else {
      ketogenic = <li className="cross">Ketogenic</li>;
    }
    return ketogenic;
  }
  lowFodmap() {
    let lowFodmap;
    if (this.state.recipe.lowFodmap === true) {
      lowFodmap = <li className="tick">LowFodmap</li>;
    } else {
      lowFodmap = <li className="cross">LowFodmap</li>;
    }
    return lowFodmap;
  }

  ingredients() {
    let ingredient;
    return this.state.recipe.ingredients.map(ingredient => {
      let baseUri =
        "https://spoonacular.com/cdn/ingredients_100x100/" + ingredient.image;
      ingredient = (
        <div className="ingredient-tile" key={ingredient.id}>
          <img src={baseUri} alt="recipe-image" />
          <p>{ingredient.original}</p>
        </div>
      );
      return ingredient;
    });
  }
  render() {
    return (
      <div>
        <img src={this.state.recipe.recipeImage} alt="recipe-image" />
        <h2>{this.state.recipe.title}</h2>
        <h5>Ready in {this.state.recipe.readyInMinutes} minutes</h5>
        <br />
        <h4>Ingredients</h4>
        <div>{this.ingredients()}</div>
        <h4>Dietary Considerations</h4>
        <ul className="featureList">
          {this.glutenFree()}
          {this.vegan()}
          {this.vegetarian()}
          {this.ketogenic()}
          {this.lowFodmap()}
        </ul>
        <br />
        <br />
        <div className="instructions">
          <h4>Instructions</h4>
          {this.state.recipe.instructions}
        </div>
      </div>
    );
  }
}

export default RecipesShowContainer;
