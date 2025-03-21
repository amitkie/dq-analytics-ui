import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import ButtonComponent from "../../common/button/button";

 import "./AnalyticsTable.scss";

const AnalyticsTable = ({
  metrics = [],
  handleWeightChange,
  handleCheckboxChange,
  projectDetails,
  checkStates,
  isBenchmarkSaved,
  weights,
  handleSelectAll,
  totalWeights,
  removeMetricsFromDB,
  isLoading,
  selectedCategory= [],
  selectedSections = [],
  selectedPlatforms = [],
  selectedMetrics = [],
}) => {
  const [expandedSections, setExpandedSections] = useState([]);
  const [expandedPlatforms, setExpandedPlatforms] = useState([]);
   console.log(isBenchmarkSaved, "isbenchmarksaved")
  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Toggle platform expansion
  const togglePlatform = (platformId) => {
    setExpandedPlatforms((prev) =>
      prev.includes(platformId)
        ? prev.filter((id) => id !== platformId)
        : [...prev, platformId]
    );
  };
  useEffect(() => {
  }, [metrics]);
  
  
  // Filter metrics based on selected sections, platforms, and metrics
  const filteredMetrics = metrics.filter((metric) => {
    // const categoryMatch = selectedCategory.length === 0 || selectedCategory.some(catergory => catergory.value === metric.categories.id);
    const sectionMatch = selectedSections.length === 0 || selectedSections.some(section => section.value === metric.section.id);
    const platformMatch = selectedPlatforms.length === 0 || selectedPlatforms.some(platform => platform.value === metric.platform.id);
    const metricMatch = selectedMetrics.length === 0 || selectedMetrics.some(mc => mc.value === metric.metric_id);
    return sectionMatch && platformMatch && metricMatch;
  });

  // Group filtered metrics by section and platform
  const groupedMetrics = filteredMetrics.reduce((acc, metric) => {
    const { section, platform } = metric;
    if (!acc[section.name]) acc[section.name] = {};
    if (!acc[section.name][platform.name]) acc[section.name][platform.name] = [];
    acc[section.name][platform.name].push(metric);
    return acc;
  }, {});

  // Calculate total weight for each section
  const sectionWeights = Object.keys(groupedMetrics).reduce((acc, sectionName) => {
    const sectionWeight = Object.keys(groupedMetrics[sectionName]).reduce((total, platformName) => {
      const platformWeight = groupedMetrics[sectionName][platformName].reduce(
        (sum, item) => sum + (weights[item.metric_id] || 0),
        0
      );
      return total + platformWeight;
    }, 0);
    acc[sectionName] = sectionWeight;
    return acc;
  }, {});

  // Calculate total weight for each platform under each section
  const platformWeights = Object.keys(groupedMetrics).reduce((acc, sectionName) => {
    acc[sectionName] = {};
    Object.keys(groupedMetrics[sectionName]).forEach((platformName) => {
      const platformWeight = groupedMetrics[sectionName][platformName].reduce(
        (sum, item) => sum + (weights[item.metric_id] || 0),
        0
      );
      acc[sectionName][platformName] = platformWeight;
    });
    return acc;
  }, {});

  return (
    <>
    
    <Table responsive striped bordered className="accordion-table">
      <thead>
        <tr>
          <th className="col-3">Section</th>
          <th className="col-2">Platform</th>
          <th className="col-1">Metric List</th>
          <th className="col-1">Weights <span style={{ backgroundColor: 'lightgrey' }} class="badge badge-pill badge-light">{totalWeights.toFixed(2)} </span></th>
          <th className="col-1">
            <div className="checkbox-header">
              <span>Overall</span> 
              <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e, "overall")}
                  className="c-pointer"
                  disabled={isBenchmarkSaved}
              />
            </div>
          </th>
          <th className="col-1">
            
            <div className="checkbox-header">
              <span>Category Based</span> 
              <input
                  type="checkbox"
                  onChange={(e) => handleSelectAll(e, "categoryBased")}
                  className="c-pointer"
                  disabled={isBenchmarkSaved}
              />
            </div>
          </th>
          <th className="col-2">Benchmarks</th>
          <th className="col-1">Add/Remove Metrics</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(groupedMetrics).map((sectionName) => (
          <>
            {/* Section Row */}
            <tr key={sectionName} className="section-row">
              <td>
                <div className="section-header" onClick={() => toggleSection(sectionName)}>
                  <div className="">
                    <b>{sectionName}</b>  <span style={{ backgroundColor: 'lightgrey' }} class="badge badge-pill badge-light">{sectionWeights[sectionName]?.toFixed(2)}</span>
                  </div>
                  <Button variant="link" disabled={isBenchmarkSaved}>
                    {expandedSections.includes(sectionName) ? <AiOutlineMinus /> : <AiOutlinePlus />}
                  </Button>
                </div>
              </td>
              <td colSpan={7}></td>
            </tr>

            {expandedSections.includes(sectionName) && (
              <>
                {Object.keys(groupedMetrics[sectionName]).map((platformName) => (
                  <>
                    <tr key={platformName} className="platform-row">
                      <td></td>
                      <td>
                        <div className="platform-header" onClick={() => togglePlatform(platformName)}>
                          <div className="">
                            <b>{platformName}</b>  <span style={{ backgroundColor: 'lightgrey' }} class="badge badge-pill badge-light">{platformWeights[sectionName][platformName]?.toFixed(2)}</span>
                          </div>
                          <Button variant="link" disabled={isBenchmarkSaved}>
                            {expandedPlatforms.includes(platformName) ? <AiOutlineMinus /> : <AiOutlinePlus />}
                          </Button>
                        </div>
                      </td>
                      <td colSpan={6}></td>
                    </tr>

                    {expandedPlatforms.includes(platformName) &&
                      groupedMetrics[sectionName][platformName].map((item) => (
                        <tr key={item.metric_id} className="metric-row">
                          <td></td>
                          <td></td>
                          <td>{item.metric_name}</td>
                          <td>
                            <input
                              type="number"
                              value={weights[item?.metric_id]}
                              onChange={(e) =>
                                handleWeightChange(item?.metric_id, parseFloat(e.target.value))
                              }
                              min="0"
                              max="100"
                              className={totalWeights > 100 ? "input-error form-input" : "form-input"}
                              style={totalWeights > 100 ? { borderColor: "red" } : {}}
                              disabled={isBenchmarkSaved}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={item.isOverallChecked || false}
                              className="c-pointer"
                              onChange={(e) => handleCheckboxChange(e, item, "overall")}
                              disabled={isBenchmarkSaved}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={item.isCategoryBasedChecked || false}
                              className="c-pointer"
                              onChange={(e) => handleCheckboxChange(e, item, "categoryBased")}
                              disabled={isBenchmarkSaved}
                            />
                          </td>
                          <td>
                          {item.isCategoryBasedChecked ? (
                              <Table responsive>
                                <tbody>
                                  {item.benchmark.map(({ category, value }, index) => (
                                    <tr key={index}>
                                      <td>
                                        <strong>{category}</strong>
                                      </td>
                                      <td>{isNaN(Number(value)) ? "NA" : Number(value).toFixed(2)}</td>
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

                            {/* {item.isCategoryBasedChecked ? (
                              <Table responsive>
                                <tbody>
                                  {isLoading ? (
                                    <tr>
                                      <td colSpan="2">
                                        <div className="loader-container-sm">
                                          <div className="loader-sm"></div>
                                          <span className="loader-text">Loading...</span>
                                        </div>
                                      </td>
                                    </tr>
                                  ) : (
                                    item.benchmark.map(({ category, value }, index) => (
                                      <tr key={index}>
                                        <td>
                                          <strong>{category}</strong>
                                        </td>
                                        <td>{isNaN(Number(value)) ? "NA" : Number(value).toFixed(2)}</td>
                                      </tr>
                                    ))
                                  )}
                                </tbody>
                              </Table>
                            ) : item.isOverallChecked ? (
                              <>
                                {isLoading ? (
                                  <div className="loader-container-sm">
                                    <div className="loader-sm"></div>
                                    <span className="loader-text">Loading...</span>
                                  </div>
                                ) : isNaN(Number(item.benchmark[0]?.value)) ? (
                                  "NA"
                                ) : (
                                  Number(item.benchmark[0]?.value).toFixed(2)
                                )}
                              </>
                            ) : (
                              "NA"
                            )} */}
                          </td>
                          <td>
                            <button disabled={isBenchmarkSaved} className="btn-bg-none">
                              <IoMdRemoveCircleOutline
                                className="action-item-icon"
                                onClick={() => removeMetricsFromDB(item.metric_id, item.metric_name)}
                                title="Remove Metric data"
                                disabled={isBenchmarkSaved}
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </>
                ))}
              </>
            )}
          </>
        ))}
      </tbody>
    </Table>
    </>
  );
};

export default AnalyticsTable;
