import React from "react";

const DietTile = props => {
  return (
    <div>
      <li className={props.dietClassName}>{props.name}</li>
    </div>
  );
};

export default DietTile;
