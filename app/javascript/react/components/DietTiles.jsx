import React from "react";
import DietTile from "./DietTile";

const DietTiles = ({ diet }) => (
  <div className="show-diets">
    {diet.map((preference, index) => {
      return (
        <DietTile
          key={`${index}-diet`}
          name={Object.keys(preference).join("")}
          dietClassName={
            preference[Object.keys(preference).join("")] === true
              ? "tick"
              : "cross"
          }
        />
      );
    })}
  </div>
);

export default DietTiles;
