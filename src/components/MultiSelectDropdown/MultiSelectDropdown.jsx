import React, { useState } from "react";
import PropTypes from "prop-types";
import "./MultiSelectDropdown.css"; // Make sure to include styling
import { IoMdClose } from "react-icons/io";


const MultiSelectDropdown = ({
  options,
  selectedValues,
  onChange,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggle = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    const newSelection = selectedValues.includes(option)
      ? selectedValues.filter((item) => item !== option)
      : [...selectedValues, option];
    onChange(newSelection);
  };

  const allSelected = options.length > 0 && selectedValues.length === options.length;

  const handleSelectAll = () => {
    if (allSelected) {
      // Deselect all if currently all are selected
      onChange([]);
    } else {
      // Select all if not already selected
      onChange(options);
    }
  };
  const handleUnselect = ( ) => {
    console.log('clicked')
  };
  const handleSearch = (event) => setSearchTerm(event.target.value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="multi-select-dropdown">
      <div className="select-header" onClick={handleToggle}>
        <span className="selection-container">
          {selectedValues.length > 0
            ? selectedValues.map((item, index) => (
                <span className="selected-items" key={index}>
                  {item.label} <IoMdClose onClick={() => handleUnselect()}/>
                </span>
              ))
            : placeholder}
        </span>
        <span className="arrow">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className="select-body">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="options">
          <div className="option" onClick={handleSelectAll}>
            <input
              type="checkbox"
              checked={allSelected}
              onChange={handleSelectAll}
            />
            <span>Select All</span>
          </div>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`option ${
                    selectedValues.includes(option) ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option)}
                    onChange={() => handleSelect(option)}
                  />
                  <span>{option.label}</span>
                </div>
              ))
            ) : (
              <div className="no-options">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

MultiSelectDropdown.propTypes = {
  options: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default MultiSelectDropdown;
