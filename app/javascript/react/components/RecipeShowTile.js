import React from "react";

const RecipeShowTile = props => {
  return <div>{props.recipe[0].steps}</div>;
};

export default RecipeShowTile;
