import React from "react";
import { Link } from "react-router";

const StepsTile = props => {
  let ingredients = props.ingredientsImages.map(image => {
    if (image !== undefined) {
      return (
        <img src={"https://spoonacular.com/cdn/ingredients_100x100/" + image} />
      );
    }
  });

  return (
    <div>
      {props.id}. {props.step}
      {ingredients}
    </div>
  );
};

export default StepsTile;
