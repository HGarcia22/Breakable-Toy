import React, { Component } from "react";
import { Route, IndexRoute, Router, browserHistory } from "react-router";
import { IngredientTiles, StepsTiles, DietTiles } from "../components";
import { getRecipes, removeFavorite, addFavorite } from "../api";

import plus from "../../../assets/images/plus.png";
import box from "../../../assets/images/box.png";

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
    const {
      favorited,
      ingredients,
      steps,
      diet,
      current_user,
      readyInMinutes,
      title,
      recipeImage
    } = this.state;

    const favoriteClassName = favorited === true ? "yes" : "no";

    return (
      <div className="showContainer">
        <div className="show-title">
          <h2>How to make {title}</h2>
        </div>

        <div className="show-image">
          <img src={recipeImage} alt="recipe-image" />
          {current_user !== null ? (
            <span onClick={this.favoriteOnClick} className={favoriteClassName}>
              ❤️
            </span>
          ) : null}
          <img src={box} className="box" alt="box" />
          <img src={plus} className="plus" alt="plus" />
          <div className="diet">
            <ul className="featureList">
              <DietTiles diet={diet} />
            </ul>
          </div>
        </div>
        <div className="ready">
          <h5>Ready in {readyInMinutes} minutes </h5>
        </div>
        <div className="ingredient-wrapper">
          <h3 className="what-you-need">What you need:</h3>
          <IngredientTiles ingredients={ingredients} />
        </div>
        <div className="instructions">
          <h3 className="instruction-title">Instructions:</h3>
          <ol>
            <StepsTiles steps={steps} />
          </ol>
        </div>
      </div>
    );
  }
}

export default RecipesShowContainer;
