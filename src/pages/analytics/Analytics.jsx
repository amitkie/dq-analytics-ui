import React, { useState } from "react";
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

import "./analytics.scss";

export default function Analytics() {
  const data = getData();
  const AMData = getAMData();
  const metricData = getMetricData();
  const normalizedData = getNormalizedData();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  console.log("tableMetricData", metricData);

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
  console.log(section);
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

  const tabs = [
    {
      label: "Weights and Benchmark",
      content: (
        <div>
          {/* <TableComponent data={AMData} columns={columnsMetrics} /> */}
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th className="col-1">Section</th>
                <th className="col-1">Platform</th>
                <th className="col-4">Metric list</th>
                <th className="col-1">Category</th>
                <th className="col-1">Weights</th>
                <th className="col-1">Overall</th>
                <th className="col-2">Category based</th>
                <th className="col-1">Benchmarks</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(metricData[0]).map((key, i) => (
                <tr key={i}>
                  <td className="col-1">Ecom</td>
                  <td className="col-1">Ecom</td>
                  <td className="col-4">{key}</td>
                  <td className="col-1">{metricData[0].Category}</td>
                  {console.log("category", metricData[0][key].Category)}
                  <td className="col-1">
                    <input
                      type="text"
                      className="form-control weights-input col-1"
                      alt="add Weights"
                      value="5"
                      placeholder="Add Weights"
                    />
                  </td>
                  <td className="col-1">
                    <Form>
                      {["checkbox"].map((type) => (
                        <div key={type} className="mb-3">
                          <Form.Check type={type} id={`check-api-${type}`}>
                            <Form.Check.Input type={type} />
                            <Form.Check.Label>Overall</Form.Check.Label>
                            {/* <Form.Control.Feedback type="valid">
                              You did it!
                            </Form.Control.Feedback> */}
                          </Form.Check>
                        </div>
                      ))}
                    </Form>
                  </td>
                  <td className="col-2">
                    <Form>
                      {["checkbox"].map((type, index) => (
                        <div key={`inline-${type}`} className="mb-3">
                          <Form.Check
                            inline
                            label="Category Based"
                            name={"group1" + index}
                            type={type}
                            id={`inline-${type}-1-${index}`}
                          />
                          {/* <Form.Check
                            inline
                            label="Foods"
                            name={"group1" + index}
                            type={type}
                            id={`inline-${type}-2-${index}`}
                          />
                          <Form.Check
                            inline
                            label="Male Grooming"
                            name={"group3" + index}
                            type={type}
                            id={`inline-${type}-3-${index}`}
                          />
                          <Form.Check
                            inline
                            label="Hair Care"
                            name={"group4" + index}
                            type={type}
                            id={`inline-${type}-3-${index}`}
                          /> */}
                        </div>
                      ))}
                    </Form>
                  </td>
                  <td className="col-1">
                    {typeof metricData[0][key] === "number"
                      ? metricData[0][key].toFixed(2)
                      : metricData[0][key]}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
    {
      label: "KPI Scores",
      content: (
        <div>
          <Table
            responsive
            striped
            bordered
            className="insights-table"
            id="wrapper2"
          >
            <tbody>
              {keysToDisplay.map((key, index) => (
                <tr key={index}>
                  <td className={`col-3 ${colorCode}`}>{key}</td>
                  {AMData.map((data, i) => (
                    <td key={i}>
                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={
                          <Tooltip id="top">
                            {getColor(data[key], [60, 70, 80])}
                          </Tooltip>
                        }
                      >
                        {getColor(data[key], [60, 70, 80])}
                      </OverlayTrigger>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="pagination-container">
            <PaginationComponent />
          </div>
        </div>
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
