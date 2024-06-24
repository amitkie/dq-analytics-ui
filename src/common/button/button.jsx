import React from "react";

export default function button({ btnClass, btnName }) {
  return (
    <div>
      <button type="button" className={`btn ${btnClass}`}>
        {btnName}
      </button>
    </div>
  );
}
