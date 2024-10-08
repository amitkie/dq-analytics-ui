import { Table } from "react-bootstrap";
import React, { useState } from "react";
import "./AnalyticsTable.scss";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { IoMdAddCircleOutline } from "react-icons/io";

const AnalyticsTable = ({
  isBenchmarkSaved = false,
  metrics = [],
  handleWeightChange,
  handleCheckboxChange,
  projectDetails,
  checkStates,
  weights,
  handleSelectAll,
  totalWeights,
  removeMetricsFromDB
}) => {
  const [metricsData, setMetricsData] = useState(metrics);
  const [addRow, setAddRow] = useState([])
    
  // Function to add a new row
  const handleAddRow = () => {
    const newMetric = {
      metric_id: Date.now(),  // Unique ID (can use any unique generator, e.g. UUID)
      section: { name: "New Section" },
      platform: { name: "New Platform" },
      metric_name: "New Metric",
      isOverallChecked: false,
      isCategoryBasedChecked: false,
      benchmark: [{ category: "New Category", value: 0 }],
      isLoading: false,
    };
    setAddRow([...metrics, newMetric]);
  };
  return (
    
    <Table responsive striped bordered>
      <thead>
        <tr>
          <th className="col-1">Section</th>
          <th className="col-1">Platform</th>
          <th className="col-3">Metric list</th>
          <th className="col-1">Category</th>
          <th className="col-1">Weights ({totalWeights})</th>
          <th className="col-1">
            <div className="thead-align">
            <input
              type="checkbox"
              onChange={(e) => handleSelectAll(e, "overall")}
              className="c-pointer"
            />
            Overall
            </div>
          </th>
          <th className="col-1">
          <div className="thead-align">
            <input
              type="checkbox"
              onChange={(e) => handleSelectAll(e, "categoryBased")}
              className="c-pointer"
            />
            Category based
          </div>
          </th>
          <th className="col-2">Benchmarks</th>
          <th  className="col-1">Action</th>
        </tr>
      </thead>
      {!isBenchmarkSaved ? (<tbody>
        
        {metrics?.map((item, ind) => (
          <tr key={item.metric_id}>
            <td>{item?.section?.name}</td>
            <td>{item?.platform?.name}</td>
            <td>{item?.metric_name}</td>
            <td>{projectDetails?.categories?.join(", ")}</td>
            {/* <td>{item?.weights}</td> */}
            <td>
              <input
                type="number"
                // value={item?.weights || ""}
                // onChange={(e) => handleWeightChange(item, e.target.value)}
                value={weights[item?.metric_id]?.toFixed(2)}
                onChange={(e) => handleWeightChange(item?.metric_id, parseFloat(e.target.value).toFixed(2))}
                min="0"
                max="100"
                className={totalWeights > 100 ? "input-error form-input" : "form-input"}
                style={totalWeights > 100 ? { borderColor: 'red' } : {}}
              />
            </td>
            <td>
              <input
                type="checkbox"
                checked={item.isOverallChecked || false}
                className="c-pointer"
                style={item?.error ? { borderColor: 'red', borderWidth: '2px' } : {}}
                onChange={(e) => handleCheckboxChange(e, item, "overall")}
              />
            </td>
            <td>
              <input
                type="checkbox"
                className="c-pointer"
                checked={item.isCategoryBasedChecked || false}
                style={item?.error ? { borderColor: 'red', borderWidth: '2px' } : {}}
                onChange={(e) => handleCheckboxChange(e, item, "categoryBased")}
              />
            </td>
            {/* <td>
              {item.isCategoryBasedChecked ? (
                <Table responsive>

                  <>
                  
                    <tbody>
                      {item.benchmark.map(({ category, value }, index) => (
                        <tr>
                          <td key={index}><strong>{category}</strong></td>
                          <td key={index}>
                            {isNaN(Number(value))
                              ? "NA"
                              : Number(value).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>

                </Table>
              ) : item.isOverallChecked ? (
                <>
                  {isNaN(Number(item.benchmark[0]?.value))
                    ? "NA"
                    : Number(item.benchmark[0]?.value).toFixed(2)}
                </>
              ) : (
                "NA"
              )}
            </td> */}

            <td>
              {item?.isLoading ? (
                <div className="loader-container-sm">
                  <div className="loader-sm"></div>
                  <span className="loader-text">Loading...</span>
                </div>
              ) : item.isCategoryBasedChecked ? (
                <Table responsive>
                  <tbody>
                    {item.benchmark.map(({ category, value }, index) => (
                      <tr key={index}>
                        <td><strong>{category}</strong></td>
                        <td>
                          {isNaN(Number(value)) ? "NA" : Number(value).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : item.isOverallChecked ? (
                <>
                  {isNaN(Number(item.benchmark[0]?.value))
                    ? "NA"
                    : Number(item.benchmark[0]?.value).toFixed(2)}
                </>
              ) : (
                "NA"
              )}
            </td>
              <td>
                <div className="actionITems">
                  <IoMdRemoveCircleOutline className="action-item-icon" onClick={() => removeMetricsFromDB(item.metric_id, item.metric_name)} title="Remove Metric data"/>
                  <IoMdAddCircleOutline className="action-item-icon" title="Add Metric data" onClick={handleAddRow} />
                </div>
              </td>
          </tr>
        ))}
      </tbody>) : (
        <tr>
          <td colSpan="7" className="text-center p-5">
            <strong>Benchmarks and Weights have already been saved for this project. Please use a different project to perform further checks.</strong>
          </td>
        </tr>
      )}
      {/* <tr>
        <td>
           <MultiSelectDropdown
              options={platforms}
              selectedValues={selectedPlatforms}
              onChange={handlePlatformChange}
              placeholder="Select Sections"
            />
          </td>
        <td>
           <MultiSelectDropdown
              options={platforms}
              selectedValues={selectedPlatforms}
              onChange={handlePlatformChange}
              placeholder="Select Platforms"
            />
          </td>
          <td>
            <MultiSelectDropdown
              options={metrics}
              selectedValues={selectedMetrics}
              onChange={handleMetricsChange}
              placeholder="Select Metrics"
              isDisabled={isMetricsDisabled}
            />
          </td>
          <td>
            <MultiSelectDropdown
              options={categories}
              selectedValues={selectedCategories}
              onChange={handleCategoryChange}
              placeholder="Select Categories"
            />
          </td>
          <td>
            <input type="number" />
          </td>
          <td>
              <input
                type="checkbox"
                checked={item.isOverallChecked || false}
                className="c-pointer"
                style={item?.error ? { borderColor: 'red', borderWidth: '2px' } : {}}
                onChange={(e) => handleCheckboxChange(e, item, "overall")}
              />
            </td>
            <td>
              <input
                type="checkbox"
                className="c-pointer"
                checked={item.isCategoryBasedChecked || false}
                style={item?.error ? { borderColor: 'red', borderWidth: '2px' } : {}}
                onChange={(e) => handleCheckboxChange(e, item, "categoryBased")}
              />
            </td>
            <td>
              {item?.isLoading ? (
                <div className="loader-container-sm">
                  <div className="loader-sm"></div>
                  <span className="loader-text">Loading...</span>
                </div>
              ) : item.isCategoryBasedChecked ? (
                <Table responsive>
                  <tbody>
                    {item.benchmark.map(({ category, value }, index) => (
                      <tr key={index}>
                        <td><strong>{category}</strong></td>
                        <td>
                          {isNaN(Number(value)) ? "NA" : Number(value).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : item.isOverallChecked ? (
                <>
                  {isNaN(Number(item.benchmark[0]?.value))
                    ? "NA"
                    : Number(item.benchmark[0]?.value).toFixed(2)}
                </>
              ) : (
                "NA"
              )}
            </td>
              <td>
                <div className="actionITems">
                  <IoMdRemoveCircleOutline className="action-item-icon" onClick={() => handleRemoveRow(item.metric_id)} title="Remove Metric data"/>
                  <IoMdAddCircleOutline className="action-item-icon" title="Add Metric data" onClick={handleAddRow} />
                </div>
              </td>
        </tr> */}
    </Table>
  );
};

export default AnalyticsTable;
