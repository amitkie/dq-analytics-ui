import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SideBar from "../../../components/sidebar/SideBar";
import TabComponent from "../../../components/tabs/TabComponent";
import ButtonComponent from "../../../common/button/button";
import Media from "../../../components/Media/Media";
import BrandParachute from "../../../assets/images/brand-parachute.png";
import { MdBubbleChart } from "react-icons/md";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { MdOutlineShowChart } from "react-icons/md";
import { MdOutlineMultilineChart } from "react-icons/md";
import { GiMultipleTargets } from "react-icons/gi";

import "./HealthCardOverview.scss";
import PaidMedia from "../../../components/paidMedia/PaidMedia";

export default function HealthCardOverview() {
  const tabs = [
    {
      label: "Media",
      content: <Media />,
    },
    {
      label: "Pricing",
      content: (
        <div className="row justify-content-center">
          <div className="col-3">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">5.0</div>
                <div className="score-title">Relative pricing adherance</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Search",
      content: (
        <div className="row justify-content-center g-3">
          <div className="col-3">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">4.97%</div>
                <div className="score-title">
                  Search visibility share <small>(Organic)</small>{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">1.40%</div>
                <div className="score-title">
                  Search visibility share <small>(Paid)</small>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Output",
      content: (
        <div className="row justify-content-center g-3">
          <div className="col-3">
            <div className="overview-box">
              <div className="box-title">
                Output <small>(MS, Best seller rank)</small>
              </div>
              <div className="score-details">
                <table className="score-table">
                  <tr>
                    <td>
                      <p>Market Share - Amazon :</p>
                    </td>
                    <td>
                      <span className="score-subscores">95.67%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Market share - FK:</p>
                    </td>
                    <td>
                      <span className="score-subscores">4.31 </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Market share - BB: </p>
                    </td>
                    <td>
                      <span className="score-subscores">785</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Market share - Grofers / Blinkit: </p>
                    </td>
                    <td>
                      <span className="score-subscores">61.44%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Market share - Nykaa: </p>
                    </td>
                    <td>
                      <span className="score-subscores">61.44%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Market share - Myntra: </p>
                    </td>
                    <td>
                      <span className="score-subscores">61.44%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Amazon Best seller rank: </p>
                    </td>
                    <td>
                      <span className="score-subscores">61.44%</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "SEO",
      content: (
        <div className="row justify-content-center g-3">
          <div className="col-3">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">5.21</div>
                <div className="score-title">Organic rank on top keywords</div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">8</div>
                <div className="score-title">
                  SEO <small>(SEO optimer)</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Social Media",
      content: (
        <div className="row justify-content-center g-3">
          <div className="col-2">
            <div className="box-title">All Platform Social Media</div>
          </div>
          <div className="col-2">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">47.30%</div>
                <div className="score-title">Net sentiment</div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">1192</div>
                <div className="score-title">Mentions</div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">31804</div>
                <div className="score-title">Engagement</div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">6.45%</div>
                <div className="score-title">Engagement %</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "ORM",
      content: (
        <div className="row justify-content-center g-3">
          <div className="col-2">
            <div className="box-title">ORM</div>
          </div>
          <div className="col-2">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">47.30%</div>
                <div className="score-title">Number of queries</div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">12</div>
                <div className="score-title">
                  % of queries & negative mentions responded to
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">5</div>
                <div className="score-title">SLA of response time</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Influencers",
      content: (
        <div className="row justify-content-center g-3">
          <div className="col-2">
            <div className="box-title">Influencers</div>
          </div>
          <div className="col-2">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">47.30%</div>
                <div className="score-title">ROI %</div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">1192</div>
                <div className="score-title">Conversion</div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">31804</div>
                <div className="score-title">Engagement</div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">6.45%</div>
                <div className="score-title">CPV </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">45</div>
                <div className="score-title">Views </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "Output & Outcome",
      content: (
        <>
          <div className="row justify-content-center g-3 mb-6">
            <div className="col-2">
              <div className="box-title">Cohorts & look alike</div>
            </div>
            <div className="col-2">
              <div className="overview-box">
                <div className="basemedia">
                  <div className="brand-title">47.30%</div>
                  <div className="score-title">50% of budgets to cohorts</div>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center g-3">
            <div className="col-2">
              <div className="box-title">BLS</div>
            </div>
            <div className="col-2">
              <div className="overview-box">
                <div className="basemedia">
                  <div className="brand-title">47.30%</div>
                  <div className="score-title">BLS FB</div>
                </div>
              </div>
            </div>
            <div className="col-2">
              <div className="overview-box">
                <div className="basemedia">
                  <div className="brand-title">47.30%</div>
                  <div className="score-title">BLS YT/JIO/Hotstar/Airtel</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      label: "Paid Media",
      content: <PaidMedia />,
    },
  ];

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
            <div className="tab-container">
              <TabComponent
                tabs={tabs}
                className="custom-tabs healthcard-tab"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
