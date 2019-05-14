import React from "react";

const BodyField = props => {
  return (
    <label>
      {props.label}
      <textarea {...props} />
    </label>
  );
};

export default BodyField;
