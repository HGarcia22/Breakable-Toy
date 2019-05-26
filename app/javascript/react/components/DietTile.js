import React from "react";

const DietTile = ({ dietClassName, name }) => {
  return (
    <div>
      <li className={dietClassName}>{name}</li>
    </div>
  );
};

export default DietTile;
