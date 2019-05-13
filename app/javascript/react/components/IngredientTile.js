import React from "react";

const IngredientTile = props => {
  return (
    <div className="ingredient-name">
      <li>{props.amount}</li>
    </div>
  );
};

export default IngredientTile;
