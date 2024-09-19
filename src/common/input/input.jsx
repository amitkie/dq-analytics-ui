import React, { useState } from "react";

export default function InputComponent(props) {
  const {
    id,
    inputLabel,
    inputType,
    placeholder,
    containerClass,
    inputValue,
    onChange,
    classNames,
  } = props;

  const [isDirty, setIsDirty] = useState(false);

  const handleBlur = () => {
    setIsDirty(true);
  };

  const inputClassNames = `form-control ${isDirty ? classNames : ''}`;

  return (
    <div className={containerClass}>
      <label htmlFor={id} className="form-label">
        {inputLabel}
      </label>
      <input
        type={inputType}
        className={inputClassNames}
        id={id}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        onBlur={handleBlur} // Set isDirty to true when the input loses focus
      />
    </div>
  );
}
