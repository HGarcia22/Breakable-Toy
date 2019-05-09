import React from "react";

const RecipeTile = props => {
  return (
    <div className="">
      <div className="">
        <img
          className="recipe-image"
          id="recipe-main-image"
          src={props.imageUri}
        />
        <div className="recipe-details">
          <div className="recipe-details-alignment">
            <h5 id="recipe-name">{props.title}</h5>
            <p>Ready in {props.readyInMinutes} minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeTile;
