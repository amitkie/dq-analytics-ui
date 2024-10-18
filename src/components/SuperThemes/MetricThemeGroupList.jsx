import React from "react";
import { FaTimes } from "react-icons/fa"; // Assuming you're using react-icons for the close icon

const MetricThemeGroupList = ({ metricThemeGroups, removeMetric }) => {
  return (
    <div>
      {metricThemeGroups.map((group) => (
        <div key={group.id} className="metric-group">
          {/* Display the name of the Metric Theme Group */}
          <div className="d-flex gap-2 align-items-center">
            <p><b>{group.name}</b></p>
            <FaTimes
                  style={{ cursor: "pointer" }}
                  onClick={() => removeMetric(group.id, group.id)}
                />
          </div>


          {/* Display Metric IDs and their names */}
          <div className="metrics">
            {group.metric_ids.map((metric, index) => (
              <div key={index} className="selected-metrics">
                <p style={{ marginRight: "10px" }}>{metric.name}</p>
                {/* <FaTimes
                  style={{ cursor: "pointer" }}
                  onClick={() => removeMetric(group.id, metric.id)}
                /> */}
              </div>
            ))}
          </div>

          {/* Display Metric Group IDs and their names */}
          <div className="metric-groups">
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
      ))}
    </div>
  );
};

export default MetricThemeGroupList;
