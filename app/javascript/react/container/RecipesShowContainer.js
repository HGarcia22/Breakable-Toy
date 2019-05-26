import React, { Component } from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import { IngredientTile, StepsTile, DietTile } from "../components";
import { getRecipes, removeFavorite, addFavorite } from "../api";

// import ReactToPrint from "react-to-print";

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
    const { id } = this.props.params;

    event.preventDefault();
    if (this.state.favorited === true) {
      removeFavorite(id).then(body => this.setState(body));
    } else {
      addFavorite(id).then(body => this.setState(body));
    }
  }

  componentDidMount() {
    const { id } = this.props.params;
    getRecipes(id).then(body => {
      this.setState(body);
    });
  }

  render() {
    const { favorited, steps, diet, current_user } = this.state;
    const favoriteClassName = favorited === true ? "yes" : "no";
    const StepsTiles = steps.map((step, index) => {
      return (
        <StepsTile key={index + "steps"} id={step.number} step={step.step} />
      );
    });
    const DietsTiles = diet.map((preference, index) => {
      const diet = {
        name: Object.keys(preference).join(""),
        key: `${index}-diet`,
        dietClassName: preference[diet] === true ? "tick" : "cross"
      };
      return <DietTile {...diet} />;
    });
    const ingredients = this.state.ingredients.map((ingredient, index) => {
      return (
        <IngredientTile
          key={index + "ingredient"}
          id={ingredient.id}
          amount={ingredient.originalString}
        />
      );
    });

    const favoriteButton =
      current_user !== null ? (
        <span onClick={this.favoriteOnClick} className={favoriteClassName}>
          ❤️
        </span>
      ) : (
        ""
      );
    return (
      <div className="showContainer">
        <div className="show-title">
          <h2>How to make {this.state.title}</h2>
        </div>

        <div className="show-image">
          <img src={this.state.recipeImage} alt="recipe-image" />
          {favoriteButton}
          <div className="diet">
            <ul className="featureList">{DietsTiles}</ul>
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
          <ol className="steps">{StepsTiles}</ol>
        </div>
      </div>
    );
  }
}

class Example extends React.Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={el => (this.componentRef = el)} />
      </div>
    );
  }
}

export default RecipesShowContainer;
