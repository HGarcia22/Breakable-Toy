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
        debugger;
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
// glutenFree() {
//   let glutenFree;
//   if (this.state.recipe.glutenFree === true) {
//     glutenFree = <li className="tick">Gluten Free</li>;
//   } else {
//     glutenFree = <li className="cross">Gluten Free</li>;
//   }
//   return glutenFree;
// }
//
// dairyFree() {
//   let dairyFree;
//   if (this.state.recipe.dairyFree === true) {
//     dairyFree = <li className="tick">Dairy Free</li>;
//   } else {
//     dairyFree = <li className="cross">Dairy Free</li>;
//   }
//   return dairyFree;
// }
//
// vegetarian() {
//   let vegetarian;
//   if (this.state.recipe.vegetarian === true) {
//     vegetarian = <li className="tick">Vegetarian</li>;
//   } else {
//     vegetarian = <li className="cross">Vegetarian</li>;
//   }
//   return vegetarian;
// }
//
// vegan() {
//   let vegan;
//   if (this.state.recipe.vegan === true) {
//     vegan = <li className="tick">Vegan</li>;
//   } else {
//     vegan = <li className="cross">Vegan</li>;
//   }
//   return vegan;
// }
//
// ketogenic() {
//   let ketogenic;
//   if (this.state.recipe.ketogenic === true) {
//     ketogenic = <li className="tick">Ketogenic</li>;
//   } else {
//     ketogenic = <li className="cross">Ketogenic</li>;
//   }
//   return ketogenic;
// }
// lowFodmap() {
//   let lowFodmap;
//   if (this.state.recipe.lowFodmap === true) {
//     lowFodmap = <li className="tick">LowFodmap</li>;
//   } else {
//     lowFodmap = <li className="cross">LowFodmap</li>;
//   }
//   return lowFodmap;
// }
//
// ingredients() {
//   let ingredient;
//   return this.state.recipe.ingredients.map(ingredient => {
//     let baseUri =
//       "https://spoonacular.com/cdn/ingredients_100x100/" + ingredient.image;
//     ingredient = (
//       <div className="ingredient-tile" key={ingredient.id}>
//         <img src={baseUri} alt="recipe-image" />
//         <p>{ingredient.original}</p>
//       </div>
//     );
//     return ingredient;
//   });
// }

// <img src={this.state.recipe.recipeImage} alt="recipe-image" />
// <h2>{this.state.recipe.title}</h2>
// <h5>Ready in {this.state.recipe.readyInMinutes} minutes</h5>
// <br />
// <h4>Ingredients</h4>
// <div>{this.ingredients()}</div>
// <h4>Dietary Considerations</h4>
// <ul className="featureList">
//   {this.glutenFree()}
//   {this.vegan()}
//   {this.vegetarian()}
//   {this.ketogenic()}
//   {this.lowFodmap()}
// </ul>
// <br />
// <br />
// <div className="instructions">
//   <h4>Instructions</h4>
//   {this.state.recipe.instructions}
// </div>
