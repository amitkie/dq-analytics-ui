import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";
import { Table } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdBubbleChart } from "react-icons/md";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { MdOutlineShowChart } from "react-icons/md";
import { MdOutlineMultilineChart } from "react-icons/md";
import { GiMultipleTargets } from "react-icons/gi";
import ButtonComponent from "../../common/button/button";
import TabComponent from "../../components/tabs/TabComponent";
import HealthCardScore from "./HealthCardScore.jsx";
import {getTop5Data, 
  getHealthCardDetails, 
  getBrandData, 
  getBrandImages, 
  getBrandDetailsData, 
  getProjectDetailsByUserId, 
  getCompetitorsData, 
  getCompetitorsReport, 
  getSectionalReport, 
  getPlatformHealthReport, 
  getMetricHealthReport} from "../../services/projectService";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import * as XLSX from "xlsx";
import "./overview/HealthCardOverview.scss";
import "./HealthCardReport.scss";

const HealthCardReport = () => {
  const { brand, projectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { brandDetailData, brandImages, brandCategoryDetails } = location.state || {};

  const [getTop5List, setGetTop5List] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [competitorsData, setCompetitorsData] = useState([]);
  const [competitorsScoresData, setCompetitorsScoresData] = useState([]);
  const [sectionalReportData, setSectionalReportData] = useState([]);
  const [platformReportData, setPlatformReportData] = useState([]);
  const [metricReportData, setMetricReportData] = useState([]);

  const handleCompetitorBrands = (comp) => {
    navigate(`/healthcardOverview/${comp.brand}/${projectId}`);
  };

  const fetchTopFiveListDetails = async () => {
    setLoading(true);
    setError(null);
  
    const requestPayload = {
      project_id: projectId,
      brandname: brand
    };

    try {
      const topFiveList = await getTop5Data(requestPayload);

      if (topFiveList) {
        setGetTop5List(topFiveList);
      } else {
        setError("No Data Found");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setError("Error fetching brand data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCompetitorsDetails = async () => {
    setLoading(true);
    setError(null);
  
    const requestPayload = {
        "project_id": projectId,
        "brand_name": brand
    };

    try {
      const competitorsList = await getCompetitorsData(requestPayload);
      console.log('competitorsList', competitorsList)
      if (competitorsList) {
        setCompetitorsData(competitorsList);
      } else {
        setError("No Data Found");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setError("Error fetching brand data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCompetitorsScoresDetails = async () => {
    setLoading(true);
    setError(null);
  
    const requestPayload = {
        "project_id": projectId,
        "brand_name": brand
    };
     
    try {
      const competitorsScoresList = await getCompetitorsReport(requestPayload);
      console.log('competitorsScoresList', competitorsScoresList);
      if (competitorsScoresList) {
        setCompetitorsScoresData(competitorsScoresList);
      } else {
        setError("No Data Found");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setError("Error fetching brand data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHealthReports = async () => {
    setLoading(true);
    setError(null);
  
    const requestPayload = {
      "project_ids": [projectId],
      "brandname": brand
    };
   
    try {
      const GetSectionalReports = await getSectionalReport(requestPayload)  ;
       
      if (GetSectionalReports) {
        setSectionalReportData(GetSectionalReports);
      } else {
        setError("No Data Found");
      }
  
    } catch (error) {
      console.error("Error during API call:", error);
      setError("Error fetching brand data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPlatformHealthReports = async () => {
    setLoading(true);
    setError(null);
  
    const requestPayload = {
      "project_ids": [projectId],
      "brandname": brand
    };
     
    try {
      const GetPlatformReports = await getPlatformHealthReport(requestPayload)  ;
       
      if (GetPlatformReports) {
        setPlatformReportData(GetPlatformReports);
      } else {
        setError("No Data Found");
      }
  
    } catch (error) {
      console.error("Error during API call:", error);
      setError("Error fetching brand data.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchMetricHealthReports = async () => {
    setLoading(true);
    setError(null);
  
    const requestPayload = {
      "project_ids": [projectId],
      "brandname": brand
    };
     
    try {
      const GetMetricReports = await getMetricHealthReport(requestPayload)  ;
       
      if (GetMetricReports) {
        setMetricReportData(GetMetricReports);
      } else {
        setError("No Data Found");
      }
  
    } catch (error) {
      console.error("Error during API call:", error);
      setError("Error fetching brand data.");
    } finally {
      setLoading(false);
    }
  };
   
  console.log('setSectionalReportData', sectionalReportData)
  console.log('setPlatformReportData', platformReportData)
  console.log('setMetricReportData', metricReportData)

useEffect(() => {
  fetchTopFiveListDetails();
  fetchCompetitorsDetails();
  fetchCompetitorsScoresDetails();
  fetchHealthReports();
  fetchPlatformHealthReports();
  fetchMetricHealthReports();
;},[brand, projectId])

function getColorScore(value, thresholds) {
    if (typeof value === "string") {
      return <span style={{ color: "#252627" }}>{value}</span>;
    } else if (value > thresholds) {
      return <span style={{ color: "#339900" }}>{value}</span>;
    } else if (value < thresholds) {
      return <span style={{ color: "#cc3201" }}>{value}</span>;
    } else {
      return <span style={{ color: "#252627" }}>{value}</span>;
    }
}

const brandScores = () => {
  if(competitorsScoresData && competitorsScoresData.length > 0) {
    competitorsScoresData.map((item) => item.brand_name)
  }
}


// const handleExportData = () => {
//   const workbook = XLSX.utils.book_new();  

//   const addSheet = (sheetName, headers, rows) => {
//     const data = [headers, ...rows];
//     const worksheet = XLSX.utils.aoa_to_sheet(data);
//     XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
//   };

//   const processTable = (label, data, headers) => {
//     const rows = data.map(item => headers.map(header => item[header] || "N/A"));
//     addSheet(label, headers, rows);
//   };

//   if (sectionalReportData?.data) {
//     processTable(
//       "Sectional Summary",
//       sectionalReportData.data,
//       ["sectionname", "weights_sum", "above", "below", "normalized_avg"]
//     );
//   }

//   if (platformReportData?.data) {
//     processTable(
//       "Platform Summary",
//       platformReportData.data,
//       ["sectionname", "platformname", "weights_sum", "above", "below", "normalized_avg"]
//     );
//   }

//   if (metricReportData?.data) {
//     processTable(
//       "Metric Summary",
//       metricReportData.data,
//       [
//         "sectionname",
//         "platformname",
//         "metricname",
//         "weights_sum",
//         "above",
//         "below",
//         "normalized_avg",
//         "benchmark"
//       ]
//     );
//   }

  
//   if (getTop5List?.top_metrics) {
//     processTable(
//       "Best Metrics",
//       getTop5List.top_metrics,
//       ["platformname", "metricname", "weights", "normalized"]
//     );
//   }

  
//   if (getTop5List?.bottom_metrics) {
//     processTable(
//       "Worst Metrics",
//       getTop5List.bottom_metrics,
//       ["platformname", "metricname", "weights", "normalized"]
//     );
//   }

 
//   XLSX.writeFile(workbook, `Brand_Health_Report_project-${projectId}.xlsx`);
// };

const handleExportData = () => {
  const workbook = XLSX.utils.book_new(); // Create a new workbook

  // Helper to add data to a worksheet
  const addSheet = (sheetName, headers, rows) => {
    const data = [headers, ...rows];
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  };

  // Process data for each tab or table
  const processTable = (label, data, headers) => {
    const rows = data.map(item => headers.map(header => item[header] || "N/A"));
    addSheet(label, headers, rows);
  };

  // Example: Sectional Summary
  if (sectionalReportData?.data) {
    processTable(
      "Sectional Summary",
      sectionalReportData.data,
      ["sectionname", "weights_sum", "above", "below", "normalized_avg"]
    );
  }

  // Example: Platform Summary
  if (platformReportData?.data) {
    processTable(
      "Platform Summary",
      platformReportData.data,
      ["sectionname", "platformname", "weights_sum", "above", "below", "normalized_avg"]
    );
  }

  // Example: Metric Summary
  if (metricReportData?.data) {
    processTable(
      "Metric Summary",
      metricReportData.data,
      [
        "sectionname",
        "platformname",
        "metricname",
        "weights_sum",
        "above",
        "below",
        "normalized_avg",
        "benchmark"
      ]
    );
  }

  // Combined Best and Worst Performing Metrics in a single sheet
  if (getTop5List?.top_metrics || getTop5List?.bottom_metrics) {
    const headers = ["platformname", "metricname", "weights", "normalized"];

    // Combine top and bottom metrics into one array
    const bestMetrics = getTop5List.top_metrics ? getTop5List.top_metrics : [];
    const worstMetrics = getTop5List.bottom_metrics ? getTop5List.bottom_metrics : [];

    const combinedMetrics = [
      { label: "Best Performing Metrics", data: bestMetrics },
      { label: "Worst Performing Metrics", data: worstMetrics }
    ];

    // Add Best and Worst Metrics as sections in a single sheet
    combinedMetrics.forEach(({ label, data }) => {
      if (data.length > 0) {
        processTable(label, data, headers);
      }
    });
  }

  // Export to Excel
  XLSX.writeFile(workbook, `Brand_Health_Report_project-id-${projectId}.xlsx`);
};


const brands = [
  { name: 'Puresense', value: 85 },
  { name: 'Livon', value: 87 },
  { name: 'Lakme', value: 65 },
];
const generateTabsData = (metricsList) => {
  const sections = {};

  metricsList.forEach((item) => {
    if (!sections[item.sectionname]) {
      sections[item.sectionname] = [];
    }
    sections[item.sectionname].push(item);
  });

  return Object.keys(sections).map((sectionName) => ({
    label: sectionName,
    content: (
      <Table responsive striped bordered>
        <thead>
          <tr>
            <th>Platform</th>
            <th>Metrics</th>
            <th>Weights</th>
            <th>Normalized</th>
          </tr>
        </thead>
        <tbody>
          {sections[sectionName].map((metric, index) => (
            <tr key={index}>
              <td>{metric.platformname || "N/A"}</td>
              <td>{metric.metricname || "N/A"}</td>
              <td>{metric.weights || "N/A"}</td>
              <td>{metric.normalized || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ),
  }));
};

// Generate tabs data
const topMetricsTabs = getTop5List.top_metrics ? generateTabsData(getTop5List.top_metrics) : [];
const bottomMetricsTabs = getTop5List.bottom_metrics ? generateTabsData(getTop5List.bottom_metrics) : [];
 
const tabsBest = [
  ...topMetricsTabs,
];

   
const tabsWorst = [
  ...bottomMetricsTabs
];
console.log("metricReportData:", metricReportData);
console.log("metricReportData.data:", metricReportData?.data);
const tabsSummary = [
  {
    label: "Sectional Summary",
    content: (
      <Table responsive striped bordered>
        <thead>
            <tr>
                <th>S.No</th>
                <th>Section Name</th>
                <th>total Weight</th>
                <th>Brand</th>
                <th>Brands above you</th>
                <th>Brands below you</th>
                <th>average normalised Score</th>
            </tr>
        </thead>
        <tbody>
        {Array.isArray(sectionalReportData?.data) && sectionalReportData.data.length > 0 ? (
          sectionalReportData.data.map((item, index) => (
            <tr key={item.id || index}>
              <td>{index + 1}</td>  
              <td>{item.sectionname}</td>
              <td>{item.weights_sum}</td>
              <td>{item.brand}</td>
              <td>{item.above}</td>
              <td>{item.below}</td>
              <td>{Number(item.normalized_avg).toFixed(2)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9">No data available</td>
          </tr>
        )}
        </tbody>
    </Table> 
    ),
  },
  {
    label: "Platform Summary ",
    content: (
      <Table responsive striped bordered>
        <thead>
            <tr>
                <th>S.No</th>
                <th>Section Name</th>
                <th>Platform Name</th>
                <th>total Weight</th>
                <th>Brand</th>
                <th>Brands above you</th>
                <th>Brands below you</th>
                <th>average normalised Score</th>
            </tr>
        </thead>
        <tbody>
          {Array.isArray(platformReportData?.data) && platformReportData.data.length > 0 ? (
            platformReportData.data.map((item, index) => (
              <tr key={item.id || index}>
                <td>{index + 1}</td>  
                <td>{item.sectionname}</td>
                <td>{item.platformname}</td>
                <td>{item.weights_sum}</td>
                <td>{item.brand}</td>
                <td>{item.above}</td>
                <td>{item.below}</td>
                <td>{Number(item.normalized_avg).toFixed(2)}</td>
                 
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No data available</td>
            </tr>
          )}
        </tbody>
    </Table>
    ),
  },
  {
    label: "Metric Summary",
    content: (
      <Table responsive striped bordered>
        <thead>
            <tr>
                <th>S.No</th>
                <th>Section Name</th>
                <th>Platform Name</th>
                <th>Metric Name</th>
                <th>total Weight</th>
                <th>Brand</th>
                <th>Brands above you</th>
                <th>Brands below you</th>
                <th>average normalised Score</th>
                <th>Benchmark Value</th>
            </tr>
        </thead>
        <tbody>
        {Array.isArray(metricReportData?.data) && metricReportData.data.length > 0 ? (
          metricReportData.data.map((item, index) => (
            <tr key={item.id || index}>
              <td>{index + 1}</td>  
              <td>{item.sectionname}</td>
              <td>{item.platformname}</td>
              <td>{item.metricname}</td>
              <td>{item.weights_sum}</td>
              <td>{item.brand}</td>
              <td>{item.above}</td>
              <td>{item.below}</td>
              <td>{Number(item.normalized_avg).toFixed(2)}</td>
              <td>{item.benchmarkvalue_x ?? "NA"}</td> 
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9">No data available</td>
          </tr>
        )}

        </tbody>
    </Table>
    ),
  },
  
];

console.log('competitorsScoresData:', competitorsScoresData);
console.log('Type:', typeof competitorsScoresData);


  return (
    <div className="col-12">
        <div className="workspace-container">
            <div className="healthcard-heading">
                <h2 className="page-title ml-3">Brand Report</h2>
            </div>
            <div className="brand-overview">
            {/* <span className="section-title">Brand Overview</span> */}
            <div className="brand-dqscores">
              <div className="score-list">
                <img
                  src={brandImages}
                  className="metric-icon"
                  alt="Brand Logo"
                />
                <div className="score-details">
                  <div className="brand-title">{brandCategoryDetails?.main_brand?.brand}</div>
                  <span className="brand-subtitle">Category: {brandCategoryDetails?.main_brand?.category}</span>
                  <span className="brand-subcategory">Sub Category: <span className="brand-subcategory-list">{brandCategoryDetails?.main_brand?.sub_category}</span></span>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdBubbleChart />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                    {loading ? (
                      <div className="loader-container-sm h-auto">
                        <div className="loader-sm"></div>
                        <span className="loader-text">Loading...</span>
                      </div>
                    ) :(
                      brandDetailData.map(item =>
                        getColorScore((parseFloat(item.Overall_Final_Score) || 0).toFixed(2), 70.3)
                      )
                    )}
                  </div>
                  <span className="brand-subtitle">DQ Score</span>
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                  >
                    <div className="percentile-score">70.3</div>
                  </OverlayTrigger>
                  <div className="score-diff danger-color">
                    <IoIosTrendingDown /> - 2.3
                  </div>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdOutlineStackedLineChart />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                  {loading ? (
                      <div className="loader-container-sm h-auto">
                        <div className="loader-sm"></div>
                        <span className="loader-text">Loading...</span>
                      </div>
                    ) : (
                    brandDetailData.map(item =>
                        getColorScore(
                          item.Marketplace != null && !isNaN(parseFloat(item.Marketplace))
                            ? parseFloat(item.Marketplace).toFixed(2)
                            : 0,
                          40.0
                        )
                      )
                    )
                    
                    }
                  </div>
                  <span className="brand-subtitle">Ecom DQ Score</span>
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                  >
                    <div className="percentile-score">40.0</div>
                  </OverlayTrigger>
                  <div className="score-diff success-color">
                    <IoIosTrendingUp /> + 4.3
                  </div>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdOutlineShowChart />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                  {loading ? (
                      <div className="loader-container-sm h-auto">
                        <div className="loader-sm"></div>
                        <span className="loader-text">Loading...</span>
                      </div>
                    ) :(
                    brandDetailData.map(item =>
                      getColorScore(
                        item.Socialwatch != null && !isNaN(parseFloat(item.Socialwatch))
                          ? parseFloat(item.Socialwatch).toFixed(2)
                          : 0,
                        60.5
                      )
                    )
                    )}
                  </div>
                  <span className="brand-subtitle">Social DQ Score</span>
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                  >
                    <div className="percentile-score">75.3</div>
                  </OverlayTrigger>
                  <div className="score-diff success-color">
                    <IoIosTrendingUp /> + 2.3
                  </div>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdOutlineMultilineChart />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                  {loading ? (
                      <div className="loader-container-sm h-auto">
                        <div className="loader-sm"></div>
                        <span className="loader-text">Loading...</span>
                      </div>
                    ) :(
                    brandDetailData.map(item =>
                      getColorScore(
                        item['Digital Spends'] != null && !isNaN(parseFloat(item['Digital Spends']))
                          ? parseFloat(item['Digital Spends']).toFixed(2)
                          : 0,
                        60.5
                      )
                    )
                    )}
                  </div>
                  <span className="brand-subtitle">Paid DQ Score</span>
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                  >
                    <div className="percentile-score">50.0</div>
                  </OverlayTrigger>
                  <div className="score-diff warning-color">
                    <IoIosTrendingUp /> + 0.3
                  </div>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <GiMultipleTargets />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                    {loading ? (
                      <div className="loader-container-sm h-auto">
                        <div className="loader-sm"></div>
                        <span className="loader-text">Loading...</span>
                      </div>
                    ) : (brandDetailData.map(item =>
                        getColorScore(
                          item['Organic Performance'] != null && !isNaN(parseFloat(item['Organic Performance']))
                            ? parseFloat(item['Organic Performance']).toFixed(2)
                            : 0,
                          60.5
                        )
                      ))
                    }                     
                  </div>
                  <span className="brand-subtitle">Brand Perf DQ Score</span>
                  <OverlayTrigger
                    key="top"
                    placement="top"
                    overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                  >
                    <div className="percentile-score">52.4</div>
                  </OverlayTrigger>
                  <div className="score-diff danger-color">
                    <IoIosTrendingDown /> - 1.3
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="report-container">
            <div className="info-title">
                <div className="info-left">
                <h4>{brandCategoryDetails?.main_brand?.brand}</h4>
                <span className="brand-subtitle">Project Id: {projectId}</span>
                <div className="category-name">
                    <span>Category: <strong>{brandCategoryDetails?.main_brand?.category}</strong></span>
                </div>
                <div className="competitor">
                  <ul className="comptetitor-item">
                    <li className="competitor-title">Competitor List:</li>
                    {brandCategoryDetails?.competitors?.map((comp, index) => (
                      <li key={index}>
                        <span className="brand-list" onClick={() => handleCompetitorBrands(comp)}>{comp.brand}</span>
                        {/* <p>Category: {comp.category}</p>
                        <p>Sub-Category: {comp.sub_category}</p> */}
                      </li>
                    ))}
                  </ul>
                </div>
                </div>
                <ButtonComponent
                    onClick={handleExportData}
                    btnClass={"btn-primary"}
                    btnName={"Export as Excel"}
                />
            </div>
              <div className="dq-scores-tab">
                <div className="main-score-content">
                    <div className="item-category">
                        <h4>DQ Score</h4>
                        <HealthCardScore brands={competitorsScoresData?.dq || []} valueKey="dq" />
                    </div>
                    <div className="item-category">
                        <h4>Ecom DQ Score</h4>
                        <HealthCardScore brands={competitorsScoresData?.ecom_dq || []} valueKey="ecom_dq" />
                    </div>
                    <div className="item-category">
                        <h4>Social DQ Score</h4>
                        <HealthCardScore brands={competitorsScoresData?.social_dq || []} valueKey="social_dq" />
                    </div>
                    <div className="item-category">
                        <h4>Paid DQ Score</h4>
                        <HealthCardScore brands={competitorsScoresData?.paid_dq || []} valueKey="paid_dq" />
                    </div>
                    <div className="item-category">
                        <h4>Brand Perf</h4>
                        <HealthCardScore brands={competitorsScoresData?.brand_perf_dq || []} valueKey="brand_perf_dq"/>
                    </div>
                </div>
                <div className="score-table-percentile">
                  
                    <Table responsive striped bordered>
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>DQ Score</th>
                                <th>Ecom DQ Score</th>
                                <th>Social DQ Score</th>
                                <th>Paid DQ Score</th>
                                <th>Brand Perf</th>
                            </tr>
                        </thead>
                        <tbody>
                          {/* Average Scores Row */}
                          <tr>
                            <td>Avg Scores (Competition Brands)</td>
                            <td>{competitorsScoresData?.statistics?.dq?.average?.toFixed(2) ?? 'N/A'}</td>
                            <td>{competitorsScoresData?.statistics?.ecom_dq?.average?.toFixed(2) ?? 'N/A'}</td>
                            <td>{competitorsScoresData?.statistics?.social_dq?.average?.toFixed(2) ?? 'N/A'}</td>
                            <td>{competitorsScoresData?.statistics?.paid_dq?.average?.toFixed(2) ?? 'N/A'}</td>
                            <td>{competitorsScoresData?.statistics?.brand_perf_dq?.average?.toFixed(2) ?? 'N/A'}</td>
                          </tr>

                          {/* 50th Percentile Row */}
                          <tr>
                            <td>50th Percentile Category Value</td>
                            <td>{competitorsScoresData?.statistics?.dq?.["50th_percentile"]?.toFixed(2) ?? 'N/A'}</td>
                            <td>{competitorsScoresData?.statistics?.ecom_dq?.["50th_percentile"]?.toFixed(2) ?? 'N/A'}</td>
                            <td>{competitorsScoresData?.statistics?.social_dq?.["50th_percentile"]?.toFixed(2) ?? 'N/A'}</td>
                            <td>{competitorsScoresData?.statistics?.paid_dq?.["50th_percentile"]?.toFixed(2) ?? 'N/A'}</td>
                            <td>{competitorsScoresData?.statistics?.brand_perf_dq?.["50th_percentile"]?.toFixed(2) ?? 'N/A'}</td>
                          </tr>

                          {/* 75th Percentile Row */}
                          <tr>
                            <td>75th Percentile Category Value</td>
                            <td>{competitorsScoresData?.statistics?.dq?.["75th_percentile"]?.toFixed(2) ?? 'N/A'}</td>
                            <td>{competitorsScoresData?.statistics?.ecom_dq?.["75th_percentile"]?.toFixed(2) ?? 'N/A'}</td>
                            <td>{competitorsScoresData?.statistics?.social_dq?.["75th_percentile"]?.toFixed(2) ?? 'N/A'}</td>
                            <td>{competitorsScoresData?.statistics?.paid_dq?.["75th_percentile"]?.toFixed(2) ?? 'N/A'}</td>
                            <td>{competitorsScoresData?.statistics?.brand_perf_dq?.["75th_percentile"]?.toFixed(2) ?? 'N/A'}</td>
                          </tr>
                        </tbody>
                    </Table>
                </div>
              </div>
              <div className="metric-performance">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <span className="box-sub-title">Best performing metrics</span>
                         
                        <TabComponent
                            isBenchmarkDataSaved={true}
                            tabs={tabsBest}
                            className="custom-tabs performance-tab"
                        />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <span className="box-sub-title">Worst performing metrics</span>
                        <TabComponent
                             isBenchmarkDataSaved={true}
                            tabs={tabsWorst}
                            className="custom-tabs performance-tab"
                        />
                    </div>
                </div>
              </div>
              <div className="summary-container">
                <span className="section-title mb-3">Reports</span>
                <TabComponent
                  isBenchmarkDataSaved={true}
                  tabs={tabsSummary}
                  className="custom-tabs performance-tab"
                />
                    
              </div>
              
          </div>

        </div>
    </div>
  )
}

export default HealthCardReport