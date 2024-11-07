import React, { useState } from 'react';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle, IoIosCloseCircle } from "react-icons/io";

import "./SuperThemes.scss";
 


const MetricWeights = ({ metricThemeGroupWeights, removeMetric }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = (groupId) => {
    setIsExpanded((prevExpanded) => ({
      ...prevExpanded,
      [groupId]: !prevExpanded[groupId],
    }));
  };
  console.log("weights of ", metricThemeGroupWeights)
  return (
    <div> 
      <h5 className="group-name-heading">Saved Metrics Weights</h5>
       
      {metricThemeGroupWeights.map((group) => (
        <div key={group.id} className={isExpanded[group.id] ? "metric-group-expanded" : "metric-group-collapsed"}>
          {/* Display the name of the Metric Theme Group */}
          <div className="group-name-details">
            {/* <h5 className="group-name-heading">Metric Theme Name</h5> */}
            <div className={isExpanded[group.id] ? "theme-btn-expanded" : "theme-btn-collapsed"}>
              <span className="group-name"> {group.Theme_name}: {group.weight_sum} </span>
              <div className="action-items">
              {isExpanded[group.id] ? <IoIosArrowDropupCircle className="expand-details" onClick={() => toggleExpand(group.id)} /> : <IoIosArrowDropdownCircle className="expand-details" onClick={() => toggleExpand(group.id)} />}
                
                <IoIosCloseCircle
                  className="expand-details"
                  onClick={() => removeMetric(group.id, group.id)}
                />
              </div>
            </div>
          </div>
          {/* Display Metric IDs and their names */}
          {isExpanded[group.id] && (
            <div className="metrics-list">
              <h5 className="group-name-heading">Metrics List</h5>
              
              {group.sources.map((source, sourceIndex) => (
                <div key={sourceIndex}>
                  <ul className="selected-metrics">
                    {source.metric_ids.map((metric, metricIndex) => (
                      <li key={metricIndex} className="metric-list">
                        {metric.metricname}: {metric.weight_sum}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

               
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MetricWeights;

