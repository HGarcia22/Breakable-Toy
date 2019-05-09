import React from "react";

const RecipeTile = props => {
  return (
    <div className="recipe-tile">
      <div className="recipe-image">
        <img src={props.imageUri} />
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
