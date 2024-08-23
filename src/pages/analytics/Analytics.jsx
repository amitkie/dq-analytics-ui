import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import SideBar from "../../components/sidebar/SideBar";
import TableComponent from "../../components/tableComponent/TableComponent";
import TabComponent from "../../components/tabs/TabComponent";
import GraphicalView from "../../components/GraphicalView/GraphicalView";
import ScoreCard from "../../components/ScoreCard/ScoreCard";
import ButtonComponent from "../../common/button/button";
import PaginationComponent from "../../common/Pagination/PaginationComponent";
import SuperThemes from "../../components/SuperThemes/SuperThemes";
import { getData } from "../../services/q3";
import { getAMData } from "../../services/Quarter-actual-metric-data";
import { getMetricData } from "../../services/metrics";
import { getNormalizedData } from "../../services/quarter-metrics-normalised-data";
import { getSection } from "../../services/section-platform-metrics";
import {
  getProjectDetailsByProjectId,
  getBenchamarkValues,
} from "../../services/projectService";
import { createProject } from "../../services/projectService";
import "./analytics.scss";
import AnalyticsTable from "./AnalyticsTable";
import KPITable from "./KPITable";

export default function Analytics() {
  const [projectId, setProjectId] = useState(1);
  const [projectDetails, setProjectDetails] = useState({});
  const [metrics, setMetrics] = useState([]);
  const data = getData();
  const AMData = getAMData();
  const metricData = getMetricData();
  const normalizedData = getNormalizedData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [checkStates, setCheckStates] = useState({});
  const [weights, setWeights] = useState({});

  const { userInfo, projectInfo } = useSelector((state) => state.user);

  const columns = [
    {
      header: "Quarter",
      accessor: "Quarter",
    },
    { header: "Category", accessor: "Category" },
    { header: "Brands", accessor: "Brands" },
    {
      header: "Digital quotient for brand (DQ)",
      accessor: "Digital quotient for brand (DQ)",
    },
    { header: "Ecom DQ Score", accessor: "Ecom DQ Score" },
    { header: "Social DQ Score", accessor: "Social DQ Score" },
    { header: "Paid Marketing DQ Score", accessor: "Paid Marketing DQ Score" },
    { header: "Organic DQ", accessor: "Organic DQ" },
  ];

  const columnsMetrics = Object.keys(AMData[0] || []).map((key) => ({
    Header: key,
    accessor: key,
  }));
  const keys = Array.from(new Set(AMData.flatMap(Object.keys)));
  const keysToDisplay = keys.slice(2);

  // console.log("tableData", AMData);
  // console.log("tableMetricData", metricData);

  function getColor(value, thresholds) {
    // thresholds is expected to be an array with three elements: [redThreshold, yellowThreshold, greenThreshold]
    if (typeof value === "string") {
      return <span style={{ color: "#252627" }}>{value}</span>;
    } else if (value > thresholds[2]) {
      return <span style={{ color: "#339900" }}>{value}</span>;
    } else if (value > thresholds[1] && value < thresholds[2]) {
      return <span style={{ color: "#ed8b00" }}>{value}</span>;
    } else {
      return <span style={{ color: "#cc3201" }}>{value}</span>;
    }
  }

  const section = getSection();
  // console.log(section);
  let colorCode;
  if (section === "Ecom") {
    colorCode = "blue-color";
  } else if (section === "Paid") {
    colorCode = "purple-color";
  } else if (section === "Brand Perf") {
    colorCode = "orange-color";
  } else if (section === "Social") {
    colorCode = "green-color";
  } else {
    colorCode = "";
  }

  const handleCheckboxChange = async (event, metric, type) => {
    const analysis_type =
      type == "overall" ? "Overall" : projectDetails?.categories;

    console.log("ascsdvefvrgbetynretynrtyntynrtyn", metric);
    const reqPayload = {
      platform: metric?.platform?.name,
      // platform: metric?.platform?.name,
      metrics: metric?.metric_name,
      brand: projectDetails?.brands,
      // brand:"PureSense",
      analysis_type: analysis_type,
      start_date: "2024-04-01",
      end_date: "2024-06-30",
    };

    try {
      const benchmarks = await getBenchamarkValues(reqPayload);
      setMetrics((prev) => {
        return prev.map((ele) => {
          if (type === "overall") {
            if (ele.metric_id === metric.metric_id) {
              ele.isOverallChecked = !ele.isOverallChecked;
              ele.isCategoryBasedChecked = false;
              ele.benchmark = benchmarks.results;
            }
          }
          if (type === "categoryBased") {
            if (ele.metric_id === metric.metric_id) {
              ele.isCategoryBasedChecked = !ele.isCategoryBasedChecked;
              ele.isOverallChecked = false;
              ele.benchmark = benchmarks.results;
            }
          }
          return ele;
        });
      });
    } catch (error) {
      console.error("Error in fetching benchmark values:", error);
    }
  };
  console.log(metrics);

  const handleWeightChange = (metricId, value) => {
    const newWeights = { ...weights, [metricId]: Number(value) };
    setWeights(newWeights);
    validateTotalWeights(newWeights);
  };

  const validateTotalWeights = (newWeights) => {
    const totalWeight = Object.values(newWeights).reduce(
      (acc, curr) => acc + curr,
      0
    );
    if (totalWeight > 100) {
      alert("Total weights exceed 100. Please adjust the values.");
    }
  };

  useEffect(() => {
    async function fetchProjectDetails(id) {
      try {
        const response = await getProjectDetailsByProjectId(id);
        setProjectDetails(response?.project);
        setMetrics(() => {
          return response?.project?.metrics?.map((ele) => {
            ele.isOverallChecked = false;
            ele.isCategoryBasedChecked = false;
            return ele;
          });
        });
        setCheckStates(
          response?.project?.metrics?.reduce((acc, item) => {
            acc[item.id] = { overall: false, categoryBased: false };
            return acc;
          }, {}) || {}
        );
        console.log(response?.project?.metrics);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    }

    if (projectInfo && projectInfo?.project?.length > 0) {
      const lastProject =
        projectInfo?.project[projectInfo?.project?.length - 1];
      setProjectId(lastProject?.id);
      fetchProjectDetails(lastProject?.id);
    }
  }, [projectInfo]);

  const tabs = [
    {
      label: "Weights and Benchmark",
      content: (
        <div>
          {/* <TableComponent data={AMData} columns={columnsMetrics} /> */}
          <AnalyticsTable
            projectDetails={projectDetails}
            checkStates={checkStates}
            metrics={metrics}
            handleCheckboxChange={handleCheckboxChange}
          />
          <div className="row">
            <div className="col12">
              <div className="save-table-btn">
                <ButtonComponent
                  btnClass={"btn-primary"}
                  btnName={"Save Weights"}
                />
              </div>
            </div>
          </div>
        </div>
      ),
    },

    {
      label: "DQ Scores",
      disabled: "disabled",
      content: (
        <div>
          <ScoreCard />
        </div>
      ),
    },
    {
      label: "Graphical view",
      content: (
        <div>
          <GraphicalView />
        </div>
      ),
    },

    // TODO: Overall and Category will checkboxes
    // Either overall checkbox can be clicked or Category
    // If Overall is checked then one Benchmark value will be visible
    // If Category is checked then it will be distributed in multiple columns based on category length and will show benchmark values
    // Benchmark value is not editable
    // Weights section will have input field.

    // Once we save this data then DQ score will be generated and the other views will be displayed.
    // Benchmarks value will be dependent on -> Categories -> then selected brands -> then actual Values
    {
      label: "KPI Scores",
      content: (
        <KPITable
          metrics={metrics}
          projectDetails={projectDetails}
          getColor={getColor}
        />
        // <div>
        //   <Table
        //     responsive
        //     striped
        //     bordered
        //     className="insights-table"
        //     id="wrapper2"
        //   >
        //     <tbody>
        //       {keysToDisplay.map((key, index) => (
        //         <tr key={index}>
        //           <td className={`col-3 ${colorCode}`}>{key}</td>
        //           {AMData.map((data, i) => (
        //             <td key={i}>
        //               <OverlayTrigger
        //                 key="top"
        //                 placement="top"
        //                 overlay={
        //                   <Tooltip id="top">
        //                     {getColor(
        //                       Number(data[key]).toFixed(2),
        //                       [60, 70, 80]
        //                     )}
        //                   </Tooltip>
        //                 }
        //               >
        //                 {getColor(Number(data[key]).toFixed(2), [60, 70, 80])}
        //               </OverlayTrigger>
        //             </td>
        //           ))}
        //         </tr>
        //       ))}
        //     </tbody>
        //   </Table>
        //   <div className="pagination-container">
        //     <PaginationComponent />
        //   </div>
        // </div>
      ),
    },
    {
      label: "Comparison View",
      content: (
        <div>
          <div className="filter-options">
            <select name="Brands" className="Select-input">
              <option value="beauty">Himalaya</option>
              <option value="haircare">Lux</option>
              <option value="baby">Palmolive</option>
              <option value="mansGrooming">Parachute</option>
            </select>
            <select name="category" className="Select-input">
              <option value="beauty">All</option>
              <option value="beauty">Beauty</option>
              <option value="haircare">Hair care</option>
              <option value="baby">Foods</option>
              <option value="mansGrooming">Male Grooming</option>
            </select>
          </div>
          <Table responsive striped bordered className="insights-table">
            <tbody>
              {keysToDisplay.map((key, index) => (
                <tr key={index}>
                  <td className="col-3">{key}</td>
                  {normalizedData.map((data, i) => (
                    <td key={i}>{data[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ),
    },
    {
      label: "Super Themes",
      disabled: "disabled",
      content: (
        <div>
          <SuperThemes />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="row g-0">
        <div className="col-1">
          <SideBar />
        </div>
        <div className="col-11">
          <div className="workspace-container">
            <h2 className="page-title">Analytics</h2>

            <div className="row mb-3">
              <div className="col-12">
                <div className="analytics-filter">
                  <div className="project-details">
                    <p className="mb-0">
                      Project Name:
                      <strong>Digital Assessment-1</strong>
                    </p>
                  </div>

                  <div className="export-btn-container gap-3">
                    <select name="category" className="Select-input">
                      <option value="Select Metrics">All </option>
                      <option value="Beauty">Beauty</option>
                      <option value="Foods">Foods</option>
                      <option value="haircare">Hair Care</option>
                      <option value="malegrooming">Male Grooming</option>
                    </select>
                    <div className="export-btn">
                      <ButtonComponent
                        disabled
                        btnClass={"btn-primary export-excel-btn"}
                        btnName={"Export as Excel"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                {/* <div className="filter-btn">
                  <div className="filter-table-btn">
                    
                  </div>
                </div> */}
                <div className="filter-options mb-3">
                  <select name="category" className="Select-input">
                    <option value="Select Metrics">All </option>
                    <option value="ecom">Ecom</option>
                    <option value="Social">Social</option>
                    <option value="Paid">Paid</option>
                    <option value="brand-perf">Brand Perf</option>
                  </select>
                  <select name="category" className="Select-input">
                    <option value="Select Metrics">All </option>
                    <option value="ecom">Amazon</option>
                    <option value="Social">Amazon - Search Campaigns </option>
                    <option value="Organic">Flipkart PLA Campaigns</option>
                    <option value="Paid">Big Basket Campaigns</option>
                    <option value="Brand Performance">Blinkit Campaigns</option>
                    <option value="Brand Performance">Nykaa Campaigns</option>
                    <option value="Brand Performance">Myntraa Campaigns</option>
                    <option value="Brand Performance">SEO</option>
                    <option value="Brand Performance">
                      Facebook, Twitter, Instagram
                    </option>
                    <option value="Brand Performance">
                      Gadwords, Facebook, DV360
                    </option>
                    <option value="Brand Performance">Google Analytics</option>
                    <option value="Brand Performance">
                      Page Speed Insights
                    </option>
                    <option value="Brand Performance">SEOptimer</option>
                  </select>
                  <select name="category" className="Select-input">
                    <option value="Select Metrics">All</option>
                    <option value="ecom">Ecom</option>
                    <option value="Social">Social</option>
                    <option value="Organic">Organic</option>
                    <option value="Paid">Paid</option>
                    <option value="Brand Performance">Brand Performance</option>
                  </select>
                </div>
              </div>
              <div className="col-12">
                <TabComponent tabs={tabs} className="analytics-tabs" />
              </div>
            </div>

            {/* <div className="project-table-data mt-5">
              <TableComponent />
            </div> */}
            {/* <div className="footer-button">
              <ButtonComponent
                btnClass={"btn-outline-secondary"}
                btnName={"Back"}
              />
              <ButtonComponent
                btnClass={"btn-primary"}
                btnName={"Go to Analytics"}
              />
            </div> */}
          </div>
        </div>
      </div>
      {/* <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        className="modal-height"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Super Themes</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-5">
          <SuperThemes />
        </Modal.Body>
        <Modal.Footer>
          <ButtonComponent
            btnClass={"btn-outline-secondary"}
            btnName={"Cancel"}
            onClick={handleClose}
          />
          <ButtonComponent
            btnClass={"btn-primary px-4"}
            btnName={"Save Project"}
            onClick={handleClose}
          />
        </Modal.Footer>
      </Modal> */}
    </>
  );
}
