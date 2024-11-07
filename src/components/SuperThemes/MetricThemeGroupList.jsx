import React, { useState } from 'react';
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle, IoIosCloseCircle } from "react-icons/io";

import "./SuperThemes.scss";
 


const MetricThemeGroupList = ({ metricThemeGroups, removeMetric }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = (groupId) => {
    setIsExpanded((prevExpanded) => ({
      ...prevExpanded,
      [groupId]: !prevExpanded[groupId],
    }));
  };
  console.log('metricThemeGroups', metricThemeGroups)
  return (
    <div> 
      <h5 className="group-name-heading">Saved Themes</h5>
      {metricThemeGroups.map((group) => (
        <div key={group.id} className={isExpanded[group.id] ? "metric-group-expanded" : "metric-group-collapsed"}>
          {/* Display the name of the Metric Theme Group */}
          <div className="group-name-details">
            {/* <h5 className="group-name-heading">Metric Theme Name</h5> */}
            <div className={isExpanded[group.id] ? "theme-btn-expanded" : "theme-btn-collapsed"}>
              <span className="group-name"> {group.name} </span>
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
            <ul className="selected-metrics">
              {group.metric_ids.map((metric, index) => (
                <li key={index} className="metric-list">
                  {metric.name} 
                </li>
              ))}
            </ul>
            {/* Display Metric Group IDs and their names */}
            <div className="metric-groups">
            <h5 className="group-name-heading">Metrics Group Name</h5>
              {group.metric_group_ids.map((metricGroup, index) => (
                <div key={index} className="selected-metric-groups">
                  <p style={{ marginRight: "10px" }}>{metricGroup.name}</p>
                  {/* <FaTimes
                    style={{ cursor: "pointer" }}
                    // onClick={() => removeMetric(group.id, metricGroup.id)}
                  /> */}
                </div>
              ))}
            </div>
          </div>
          )}
          


        </div>
      ))}
    </div>
  );
};

export default MetricThemeGroupList;
