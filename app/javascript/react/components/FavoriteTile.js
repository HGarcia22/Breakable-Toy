import React from "react";
import { Link } from "react-router";

const FavoriteTile = props => {
  return (
    <div>
      <div className="favorite-image">
        <Link to={`/recipes/${props.id}`}>
          <img src={props.image} />
        </Link>
      </div>
      <div id="favorite-title">
        <div>{props.title}</div>
      </div>
    </div>
  );
};

export default FavoriteTile;
