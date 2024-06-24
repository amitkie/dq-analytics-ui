import React from "react";
import BarChart from "../../common/BarChart/BarChart";
import AreaChart from "../../common/AreaChart/AreaChart";

import "./GraphicalView.scss";

function ScoreCard() {
  return (
    <div className="row">
      <div className="col-4">
        <div className="chart-box">
          <BarChart />
        </div>
      </div>
      <div className="col-4">
        <div className="chart-box">
          <AreaChart />
        </div>
      </div>
      <div className="col-4">
        <div className="chart-box">
          <AreaChart />
        </div>
      </div>
      <div className="col-4">
        <div className="chart-box">
          <BarChart />
        </div>
      </div>
      <div className="col-4">
        <div className="chart-box">
          <AreaChart />
        </div>
      </div>
      <div className="col-4">
        <div className="chart-box">
          <AreaChart />
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
