import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SideBar from "../../../components/sidebar/sideBar";

import "./HealthCardOverview.scss";

export default function HealthCardOverview() {
  return (
    <>
      <div className="row g-0">
        <div className="col-1">
          <SideBar />
        </div>
        <div className="col-11">
          <div className="health-container">
            <div className="title-section">
              <h2 className="page-title mt-4 ml-3">Health Card</h2>
              <div className="filter-section">
                <ButtonGroup aria-label="Basic example">
                  <Button className="group-btn" variant="outline-secondary">
                    Monthly
                  </Button>
                  <Button className="group-btn" variant="primary">
                    Quarterly
                  </Button>
                  <Button className="group-btn" variant="outline-secondary">
                    Annually
                  </Button>
                </ButtonGroup>
                <select name="filter" className="filter-input">
                  <option value="Filter">Filter</option>
                  <option value="Alphabet">Alphabet</option>
                  <option value="Number">Number</option>
                  <option value="Percentage">Percentage</option>
                </select>
              </div>
            </div>
            <div className="brand-overview">
              <span className="section-title">Brand Overview</span>
              <div className="brand-dqscores">
                <div className="score-list"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
