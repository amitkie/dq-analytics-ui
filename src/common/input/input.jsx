import React from "react";

export default function input(props) {
  const { id, inputLabel, inputType, placeholder } = props;
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {inputLabel}
      </label>
      <input
        type={inputType}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}
