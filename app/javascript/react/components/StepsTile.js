import React from "react";
import { Link } from "react-router";

const StepsTile = props => {
  let ingredients = props.ingredientsImages.map((image, index) => {
    if (image !== undefined) {
      return (
        <div key={index}>
          <img
            src={"https://spoonacular.com/cdn/ingredients_100x100/" + image}
          />
        </div>
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
