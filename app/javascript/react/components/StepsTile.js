import React from "react";
import { Link } from "react-router";

const StepsTile = props => {
  return (
    <div>
      <li className="steps">{props.step}</li>
    </div>
  );
};

export default StepsTile;
