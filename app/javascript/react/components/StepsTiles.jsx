import React from "react";
import StepsTile from "./StepsTile";

const StepsTiles = ({ steps }) => (
  <div className="show-steps">
    {steps.map((step, index) => {
      return <StepsTile key={index + "step"} id={step.id} step={step.step} />;
    })}
  </div>
);

export default StepsTiles;
