import React, { useState } from "react";
import PropTypes from "prop-types";

import "./TabComponent.scss";

const TabComponent = ({ tabs, className, disabled, isBenchmarkDataSaved=false }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    console.log(isBenchmarkDataSaved, "isBenchmarkDataSaved")
    if(isBenchmarkDataSaved){
      setActiveTab(index);
    }
  };

  return (
    <div className={`tab-component ${className}`}>
      <ul className="tab-list">
        {tabs.map((tab, index) => (
          <li key={index} className={activeTab === index ? "active" : ""}>
            <button 
            // className={index !== 0 && !isBenchmarkDataSaved ? "disabled-tab" : ""} 
             onClick={() => handleTabChange(index)}
              // disabled={index !== 0 && !isBenchmarkDataSaved}
              >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="tab-content">{tabs[activeTab].content}</div>
      {tabs.content}
    </div>
  );
};

TabComponent.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
};

TabComponent.defaultProps = {
  className: "",
  tabs: [],
};

export default TabComponent;
