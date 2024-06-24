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
          </div>
          <div className="chart-list">
            <BubbleChart />
          </div>
          <div className="chart-list">
            <BubbleChart />
          </div>
          <div className="chart-list">
            <BubbleChart />
          </div>
        </div>
      </div>
      <div className="col-md-6 col-sm-12">
        <div className="dq-score-bubble">
          <BubbleChart />
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
