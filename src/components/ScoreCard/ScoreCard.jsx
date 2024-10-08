import React from "react";
import BubbleChart from "../../common/bubbleCharts/BubbleChart";
import TrendChart from "../../common/TrendChart/TrendChart";
import Form from "react-bootstrap/Form";
import "./ScoreCard.scss";

function ScoreCard({dqScoreValue, dqScoreLoading=false}) {
  return (
    <div className="row">
      <div className="col-12">
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
      <div className="col-md-12 col-lg-6 mb-md-4 mt-md-4">
        <div className="chart-group">
          <div className="chart-list">
            {
            !dqScoreLoading ? 
            <TrendChart dqScoreValue={dqScoreValue} chartType="Ecom" />
            : (<div className="loader-container-sm">
              <div className="loader-sm"></div>
              <span className="loader-text">Loading, Please Wait</span>
            </div>)  
           }
            <span className="graph-title">Ecom DQ Score</span>
          </div>
          <div className="chart-list">
            {
              !dqScoreLoading ? 
              <TrendChart dqScoreValue={dqScoreValue} chartType="Social" />
              : (
                <div className="loader-container-sm">
              <div className="loader-sm"></div>
              <span className="loader-text">Loading, Please Wait</span>
            </div>
              )
            }
            <span className="graph-title">Social DQ Score</span>
          </div>
          <div className="chart-list">
            {
              !dqScoreLoading ? 
              <TrendChart dqScoreValue={dqScoreValue} chartType="Paid" />
              : (
                <div className="loader-container-sm">
                <div className="loader-sm"></div>
                <span className="loader-text">Loading, Please Wait</span>
              </div>
              )
            }
            <span className="graph-title">Paid DQ Score</span>
          </div>
          <div className="chart-list">
            {
              !dqScoreLoading ? 
              <TrendChart dqScoreValue={dqScoreValue} chartType="Brand Perf" />
              : (
                <div className="loader-container-sm">
                <div className="loader-sm"></div>
                <span className="loader-text">Loading, Please Wait</span>
              </div>
              )
            }
            <span className="graph-title">Brand Perf DQ Score</span>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-6 mb-md-4">
        <div className="dq-score-bubble">
          {
            !dqScoreLoading ? 
            <TrendChart dqScoreValue={dqScoreValue} chartType="Overall_Final_Score" />
            : (
              <div className="loader-container-sm">
              <div className="loader-sm"></div>
              <span className="loader-text">Loading, Please Wait</span>
            </div>
            )
          }
          <span className="graph-title">DQ Score</span>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
