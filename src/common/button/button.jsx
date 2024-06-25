import React from "react";

export default function button({ btnClass, btnName, onClick }) {
  return (
    <div>
      <button type="button" className={`btn ${btnClass}`} onClick={onClick}>
        {btnName}
      </button>
    </div>
  );
}
