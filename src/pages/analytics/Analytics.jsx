import React, { useState } from "react";
import SideBar from "../../components/sidebar/sideBar";
import TableComponent from "../../components/tableComponent/TableComponent";
import ButtonComponent from "../../common/button/button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import TabComponent from "../../components/tabs/TabComponent";
import GraphicalView from "../../components/GraphicalView/GraphicalView";
import ScoreCard from "../../components/ScoreCard/ScoreCard";
import { getData } from "../../services/q3";
import { getAMData } from "../../services/Quarter-actual-metric-data";
import { getMetricData } from "../../services/metrics";

import "./analytics.scss";

export default function Analytics() {
  const data = getData();
  const AMData = getAMData();
  const metricData = getMetricData();

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

  const tabs = [
    {
      label: "weights and benchmark",
      content: (
        <div>
          {/* <TableComponent data={AMData} columns={columnsMetrics} /> */}
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th width="8%">Platform/Section Wise</th>
                <th width="52%">Metric list</th>
                <th width="10%">Weights</th>
                <th width="30%">Benchmarks</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(metricData[0]).map((key, i) => (
                <tr key={i}>
                  <td>Ecom</td>
                  <td>{key}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      alt="add Weights"
                      placeholder="Add Weights"
                    />
                  </td>
                  <td>{metricData[0][key]}</td>
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
      label: "Scorecard Summary View",
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
          <span className="graph-title">DQ Scores</span>
          <GraphicalView />
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
          <Table responsive striped bordered>
            <tbody>
              {keysToDisplay.map((key, index) => (
                <tr key={index}>
                  <td className="col-3">{key}</td>
                  {AMData.map((data, i) => (
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
                      <option value="mansGrooming">Men's Grooming</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <TabComponent tabs={tabs} className="custom-tabs" />
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
    </>
  );
}
