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

import "./analytics.scss";

export default function Analytics() {
  const data = getData();

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
  // console.log("tableData", data);

  const tabs = [
    {
      label: "weights and benchmark",
      content: (
        <div>
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>Platform/Section Wise</th>
                <th>Metrics List</th>
                <th>Weights</th>
                <th>
                  Benchmark <small>(Non-category based)</small>
                </th>
                <th colSpan={3}>
                  Benchmark <small>(category based)</small>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ecom</td>
                <td>Content Score (Visual+ Written + Brand Store)</td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
              <tr>
                <td>Ecom</td>
                <td>Average rating (All SKU - Ever Rated)</td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
              <tr>
                <td>Ecom</td>
                <td>Average rating (All SKU - Ever Rated)</td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
            </tbody>
          </Table>
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
          <GraphicalView />
        </div>
      ),
    },
    {
      label: "Comparison View",
      content: (
        <div>
          <TableComponent data={data} columns={columns} />
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
