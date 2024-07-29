import React from "react";

export default function input(props) {
  const {
    id,
    inputLabel,
    inputType,
    placeholder,
    containerClass,
    inputValue,
    onChange,
  } = props;
  return (
    <div className={containerClass}>
      <label htmlFor={id} className="form-label">
        {inputLabel}
      </label>
      <input
        type={inputType}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
      />
    </div>
  );
}
