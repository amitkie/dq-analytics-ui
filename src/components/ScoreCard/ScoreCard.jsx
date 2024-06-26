import React from "react";
import BubbleChart from "../../common/bubbleCharts/BubbleChart";

import "./ScoreCard.scss";

function ScoreCard() {
  return (
    <div className="row">
      <div className="col-md-6 col-sm-12">
        <div className="chart-group">
          <div className="chart-list">
            <BubbleChart />
            <span className="graph-title">Ecom DQ Score</span>
          </div>
          <div className="chart-list">
            <BubbleChart />
            <span className="graph-title">Social DQ Score</span>
          </div>
          <div className="chart-list">
            <BubbleChart />
            <span className="graph-title">Paid DQ Score</span>
          </div>
          <div className="chart-list">
            <BubbleChart />
            <span className="graph-title">Brand Perf DQ Score</span>
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="dq-score-bubble">
          <BubbleChart />
          <span className="graph-title">DQ Score</span>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
