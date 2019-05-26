import React from "react";
import IngredientTile from "./IngredientTile";

const IngredientTiles = ({ ingredients }) => (
  <div className="show-ingredients">
    {ingredients.map((ingredient, index) => {
      return (
        <IngredientTile
          key={index + "ingredient"}
          id={ingredient.id}
          amount={ingredient.originalString}
        />
      );
    })}
  </div>
);

export default IngredientTiles;

// must return a react component // surrounding div is needed // in React //
// 16, // import React, {Fragment} from 'react'; // // //{" "}
// <Fragment>
// <Component />
// //{" "}
// </Fragment>
