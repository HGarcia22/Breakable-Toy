import React from "react";

const TextField = props => {
  return (
    <label className="searchbox">
      {props.label}
      <input {...props} />
    </label>
  );
};

export default TextField;
