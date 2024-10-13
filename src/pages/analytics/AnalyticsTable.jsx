import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { IoMdRemoveCircleOutline, IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const AnalyticsTable = ({
  metrics = [],
  handleWeightChange,
  handleCheckboxChange,
  projectDetails,
  checkStates,
  weights,
  handleSelectAll,
  totalWeights,
  removeMetricsFromDB,
  selectedSections = [],
  selectedPlatforms = [], 
  selectedMetrics = [],
}) => {
  const [expandedSections, setExpandedSections] = useState([]);
  const [expandedPlatforms, setExpandedPlatforms] = useState([]);

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

  console.log(selectedMetrics, 'selekihihuhguguguguguugu');
  // Filter metrics based on selected sections, platforms, and metrics
  const filteredMetrics = metrics.filter((metric) => {
    console.log(metric, 'chhhhhh')
    const sectionMatch = selectedSections.length === 0 || selectedSections.some(section => section.value === metric.section.id);
    const platformMatch = selectedPlatforms.length === 0 || selectedPlatforms.some(platform => platform.value === metric.platform.id);
    const metricMatch = selectedMetrics.length === 0 || selectedMetrics.some(mc => mc.value === metric.metric_id);
    console.log(metricMatch, 'dyufyufuyf')
    return sectionMatch && platformMatch && metricMatch;
  });

  console.log(filteredMetrics, 'filteredMetrics-----------')

  // Group filtered metrics by section and platform
  const groupedMetrics = filteredMetrics.reduce((acc, metric) => {
    const { section, platform } = metric;
    if (!acc[section.name]) acc[section.name] = {};
    if (!acc[section.name][platform.name]) acc[section.name][platform.name] = [];
    acc[section.name][platform.name].push(metric);
    return acc;
  }, {});


  return (
    <Table responsive striped bordered className="accordion-table">
      <thead>
        <tr>
          <th className="col-3">Section</th>
          <th className="col-2">Platform</th>
          <th className="col-1">Metric List</th>
          <th className="col-1">Weights ({totalWeights})</th>
          <th className="col-1">Overall</th>
          <th className="col-1">Category Based</th>
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
                  <h5>{sectionName}</h5>
                  <Button variant="link">
                    {expandedSections.includes(sectionName) ? <AiOutlineMinus /> : <AiOutlinePlus />}
                  </Button>
                </div>
              </td>
              <td colSpan={7}></td>
            </tr>

            {/* Section Content */}
            {expandedSections.includes(sectionName) && (
              <>
                {Object.keys(groupedMetrics[sectionName]).map((platformName) => (
                  <>
                    {/* Platform Row */}
                    <tr key={platformName} className="platform-row">
                      <td></td>
                      <td>
                        <div className="platform-header" onClick={() => togglePlatform(platformName)}>
                          <h6>{platformName}</h6>
                          <Button variant="link">
                            {expandedPlatforms.includes(platformName) ? <AiOutlineMinus /> : <AiOutlinePlus />}
                          </Button>
                        </div>
                      </td>
                      <td colSpan={6}></td>
                    </tr>

                    {/* Platform Content */}
                    {expandedPlatforms.includes(platformName) &&
                      groupedMetrics[sectionName][platformName].map((item) => (
                        <tr key={item.metric_id} className="metric-row">
                          <td></td>
                          <td></td>
                          <td>{item.metric_name}</td>
                          <td>
                            <input
                              type="number"
                              value={weights[item?.metric_id]?.toFixed(2)}
                              onChange={(e) =>
                                handleWeightChange(item?.metric_id, parseFloat(e.target.value))
                              }
                              min="0"
                              max="100"
                              className={totalWeights > 100 ? "input-error form-input" : "form-input"}
                              style={totalWeights > 100 ? { borderColor: "red" } : {}}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={item.isOverallChecked || false}
                              className="c-pointer"
                              onChange={(e) => handleCheckboxChange(e, item, "overall")}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={item.isCategoryBasedChecked || false}
                              className="c-pointer"
                              onChange={(e) => handleCheckboxChange(e, item, "categoryBased")}
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
                          </td>
                          <td>
                            <IoMdRemoveCircleOutline
                              className="action-item-icon"
                              onClick={() => removeMetricsFromDB(item.metric_id, item.metric_name)}
                              title="Remove Metric data"
                            />
                            <IoMdAddCircleOutline className="action-item-icon" title="Add Metric data" />
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
  );
};

export default AnalyticsTable;



