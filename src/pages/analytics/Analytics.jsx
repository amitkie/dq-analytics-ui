import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import SideBar from "../../components/sidebar/SideBar";
import TableComponent from "../../components/tableComponent/TableComponent";
import TabComponent from "../../components/tabs/TabComponent";
import GraphicalView from "../../components/GraphicalView/GraphicalView";
import ScoreCard from "../../components/ScoreCard/ScoreCard";
import ButtonComponent from "../../common/button/button";
import PaginationComponent from "../../common/Pagination/PaginationComponent";
import { getData } from "../../services/q3";
import { getAMData } from "../../services/Quarter-actual-metric-data";
import { getMetricData } from "../../services/metrics";
import { getNormalizedData } from "../../services/quarter-metrics-normalised-data";

import "./analytics.scss";
import SuperThemes from "../../components/SuperThemes/SuperThemes";

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

  console.log("tableData", AMData);
  console.log("tableMetricData", getMetricData);

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

  const tabs = [
    {
      label: "Weights and Benchmark",
      content: (
        <div>
          {/* <TableComponent data={AMData} columns={columnsMetrics} /> */}
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th className="col-1">Platform/Section Wise</th>
                <th className="col-6">Metric list</th>
                <th className="col-1">Weights</th>
                <th className="col-1">Benchmarks</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(metricData[0]).map((key, i) => (
                <tr key={i}>
                  <td className="col-1">Ecom</td>
                  <td className="col-6">{key}</td>
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
                  disabled
                  btnClass={"btn-primary"}
                  btnName={"Export as Excel"}
                />
                <ButtonComponent
                  onClick={handleShow}
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
      label: "DQ Score View",
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
      label: "DQ Brand Values",
      content: (
        <div>
          <Table responsive striped bordered className="insights-table">
            <tbody>
              {keysToDisplay.map((key, index) => (
                <tr key={index}>
                  <td className="col-3">{key}</td>
                  {AMData.map((data, i) => (
                    <td key={i}>{getColor(data[key], [60, 70, 80])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationComponent />
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
              <option value="beauty">Beauty</option>
              <option value="haircare">Hair care</option>
              <option value="baby">Baby</option>
              <option value="mansGrooming">Men's Grooming</option>
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
  ];

  return (
    <>
      <div className="row g-0">
        <div className="col-1">
          <SideBar />
        </div>
        <div className="col-11">
          <div className="workspace-container">
            <h2 className="page-title mt-4 ml-3">Analytics</h2>

            <div className="row mb-4">
              <div className="col-12">
                <div className="analytics-filter">
                  <div className="project-details">
                    <p className="mb-0">
                      Project Name:
                      <strong>Digital Assessment-1</strong>
                    </p>
                  </div>
                  <div className="project-filter">
                    <div className="range-filter">
                      <span>DQ score Range:</span>
                      <Form.Range />
                    </div>
                    <select name="category" className="Select-input">
                      <option value="beauty">Beauty</option>
                      <option value="haircare">Hair care</option>
                      <option value="baby">Baby</option>
                      <option value="mansGrooming">Male Grooming</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="export-btn">
                  <ButtonComponent
                    disabled
                    btnClass={"btn-primary export-excel-btn"}
                    btnName={"Export as Excel"}
                  />
                </div>
                <TabComponent tabs={tabs} className="analytics-tabs" />
              </div>
            </div>

            {/* <div className="project-table-data mt-5">
              <TableComponent />
            </div> */}
            <div className="footer-button">
              <ButtonComponent
                btnClass={"btn-outline-secondary"}
                btnName={"Back"}
              />
              <ButtonComponent
                btnClass={"btn-primary"}
                btnName={"Go to Analytics"}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
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
      </Modal>
    </>
  );
}
