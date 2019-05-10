import React from "react";
import { Link } from "react-router";

const RecipeTile = props => {
  return (
    <div className="recipe-tile">
      <div className="recipe-image">
        <Link to={`/recipes/${props.id}`}>
          <img src={props.imageUri} />
        </Link>
      </div>
      <div className="recipe-details">
        <div className="recipe-title">
          <h5 className="recipe-title">{props.title}</h5>
        </div>
        <div className="ready-in-minutes">
          <p>Ready in {props.readyInMinutes} minutes</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeTile;
