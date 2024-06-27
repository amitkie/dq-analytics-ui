import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SideBar from "../../../components/sidebar/sideBar";
import ButtonComponent from "../../../common/button/button";
import BrandParachute from "../../../assets/images/brand-parachute.png";
import { MdBubbleChart } from "react-icons/md";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { MdOutlineShowChart } from "react-icons/md";
import { MdOutlineMultilineChart } from "react-icons/md";
import { GiMultipleTargets } from "react-icons/gi";

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
                <ButtonComponent
                  disabled
                  btnClass={"btn-primary"}
                  btnName={"Export as Excel"}
                />
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
                <div className="score-list">
                  <img
                    src={BrandParachute}
                    className="metric-icon"
                    alt="Brand Logo"
                  />
                  <div className="score-details">
                    <div className="brand-title">Parachute</div>
                    <span className="brand-subtitle">Advanced body lotion</span>
                  </div>
                </div>
                <div className="score-list">
                  <div className="metric-icon">
                    <MdBubbleChart />
                  </div>
                  <div className="score-details">
                    <div className="brand-title">59.2</div>
                    <span className="brand-subtitle">DQ Score</span>
                  </div>
                </div>
                <div className="score-list">
                  <div className="metric-icon">
                    <MdOutlineStackedLineChart />
                  </div>
                  <div className="score-details">
                    <div className="brand-title">50.2</div>
                    <span className="brand-subtitle">Ecom DQ Score</span>
                  </div>
                </div>
                <div className="score-list">
                  <div className="metric-icon">
                    <MdOutlineShowChart />
                  </div>
                  <div className="score-details">
                    <div className="brand-title">50.7</div>
                    <span className="brand-subtitle">Social DQ Score</span>
                  </div>
                </div>
                <div className="score-list">
                  <div className="metric-icon">
                    <MdOutlineMultilineChart />
                  </div>
                  <div className="score-details">
                    <div className="brand-title">55.4</div>
                    <span className="brand-subtitle">Paid DQ Score</span>
                  </div>
                </div>
                <div className="score-list">
                  <div className="metric-icon">
                    <GiMultipleTargets />
                  </div>
                  <div className="score-details">
                    <div className="brand-title">55.4</div>
                    <span className="brand-subtitle">Brand Perf DQ Score</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
