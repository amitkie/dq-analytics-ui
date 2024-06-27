import React from "react";

export default function button({ btnClass, btnName, onClick, disabled }) {
  return (
    <div>
      <button
        type="button"
        className={`btn ${btnClass}`}
        onClick={onClick}
        disabled={disabled}
      >
        {btnName}
      </button>
    </div>
  );
}
