import React, { useState } from "react";
import SideBar from "../../components/sidebar/sideBar";
import TableComponent from "../../components/tableComponent/TableComponent";
import ButtonComponent from "../../common/button/button";
import TabComponent from "../../components/tabs/TabComponent";
import GraphicalView from "../../components/GraphicalView/GraphicalView";
import ScoreCard from "../../components/ScoreCard/ScoreCard";

import "./Insights.scss";
import BubbleChart from "../../common/bubbleCharts/BubbleChart";

export default function Analytics() {
  const tabs = [
    {
      label: "Score Comparison",
      content: (
        <div className="row">
          <div className="col-6">
            <div className="scores-charts">
              <span className="chart-title">Ecom DQ Score</span>
              <BubbleChart />
            </div>
          </div>
          <div className="col-6">
            <div className="scores-charts">
              <span className="chart-title">Social DQ Score</span>
              <BubbleChart />
            </div>
          </div>
          <div className="col-6">
            <div className="scores-charts">
              <span className="chart-title">Organic DQ Score</span>
              <BubbleChart />
            </div>
          </div>
          <div className="col-6">
            <div className="scores-charts">
              <span className="chart-title">Paid DQ Score</span>
              <BubbleChart />
            </div>
          </div>
          <div className="col-6">
            <div className="scores-charts">
              <span className="chart-title">DQ Score</span>
              <BubbleChart />
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Tabular Summary",
      content: (
        <div>
          <TableComponent />
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
  ];
  return (
    <>
      <div className="row g-0">
        <div className="col-1">
          <SideBar />
        </div>
        <div className="col-11">
          <div className="workspace-container">
            <h2 className="page-title mt-4 ml-3">Insights</h2>

            <div className="row mb-4">
              <div className="col-12">
                <div className="insights-filter">
                  <span className="subtitle">
                    Select files from saved Projects
                  </span>
                  <div className="project-filter">
                    <select name="frequency" className="Select-input">
                      <option value="beauty">Monthly</option>
                      <option value="haircare">Quarterly</option>
                      <option value="baby">Annually</option>
                    </select>
                    <select name="category" className="Select-input">
                      <option value="beauty">Beauty</option>
                      <option value="haircare">Hair care</option>
                      <option value="baby">Baby</option>
                      <option value="mansGrooming">Men's Grooming</option>
                    </select>
                    <select name="files" className="Select-input">
                      <option value="digitalAssessment-1">
                        Digital Assessment -1
                      </option>
                      <option value="digitalAssessment-2">
                        Digital Assessment -2
                      </option>
                      <option value="digitalAssessment-3">
                        Digital Assessment -3
                      </option>
                      <option value="digitalAssessment-4">
                        Digital Assessment -4
                      </option>
                    </select>
                    <ButtonComponent
                      btnClass={"btn-primary"}
                      btnName={"Submit"}
                    />
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
