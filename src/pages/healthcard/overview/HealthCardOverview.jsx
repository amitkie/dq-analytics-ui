import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import SideBar from "../../../components/sidebar/SideBar";
import TabComponent from "../../../components/tabs/TabComponent";
import ButtonComponent from "../../../common/button/button";
import BrandParachute from "../../../assets/images/brand-parachute.png";
import { MdBubbleChart } from "react-icons/md";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { MdOutlineShowChart } from "react-icons/md";
import { MdOutlineMultilineChart } from "react-icons/md";
import { GiMultipleTargets } from "react-icons/gi";

import "./HealthCardOverview.scss";

export default function HealthCardOverview() {
  const tabs = [
    {
      label: "Media",
      content: (
        <div className="row">
          <div className="col-2">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">5.0</div>
                <div className="score-title">Bain Media Input Score</div>
              </div>
            </div>
            <div className="overview-box">
              <div className="box-title">
                Ecommerce <small>Part 1 Organic metrics</small>
              </div>
              <div className="score-details">
                <table className="score-table">
                  <tr>
                    <td>
                      <p>Content Score:</p>
                    </td>
                    <td>
                      <span className="score-subscores">95.67%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Average rating:</p>
                    </td>
                    <td>
                      <span className="score-subscores">4.31 </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Reviews: </p>
                    </td>
                    <td>
                      <span className="score-subscores">785</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Net sentiment of reviews: </p>
                    </td>
                    <td>
                      <span className="score-subscores">61.44074%</span>
                    </td>
                  </tr>
                </table>
                {/* <div className="score-name">
                  <p>Reviews: </p>
                  <p>Net sentiment of reviews: </p>
                </div>
                <div className="score-value">
                  <span className="score-subscores">95.67%</span>
                  <span className="score-subscores">4.31 </span>
                  <span className="score-subscores">785</span>
                  <span className="score-subscores">61.44074%</span>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-2 g-0">
            <div className="overview-box">
              <div className="basemedia">
                <div className="brand-title">86%</div>
                <div className="score-title">Availability</div>
              </div>
            </div>
            <div className="overview-box">
              <div className="score-details">
                <table className="score-table">
                  <tr>
                    <td>
                      <p>Blended ROAS: </p>
                    </td>
                    <td>
                      <span className="score-subscores">-0.70%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>On platform Green spends %: </p>
                    </td>
                    <td>
                      <span className="score-subscores">10.80% </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Cust ac rate %: </p>
                    </td>
                    <td>
                      <span className="score-subscores">77.57%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>New Customers : </p>
                    </td>
                    <td>
                      <span className="score-subscores"> </span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="overview-box">
              <div className="score-details">
                <table className="score-table">
                  <tr>
                    <td>
                      <p>Blended ROAS: </p>
                    </td>
                    <td>
                      <span className="score-subscores">-0.70%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>On platform Green spends %: </p>
                    </td>
                    <td>
                      <span className="score-subscores">10.80% </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Cust ac rate %: </p>
                    </td>
                    <td>
                      <span className="score-subscores">77.57%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>New Customers : </p>
                    </td>
                    <td>
                      <span className="score-subscores"> </span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="col-4"></div>
        </div>
      ),
    },
    {
      label: "Pricing",
      content: (
        <div className="row">
          <div className="col-2"></div>
          <div className="col-2"></div>Pricing
        </div>
      ),
    },
    {
      label: "Search",
      content: (
        <div className="row">
          <div className="col-2"></div>
          <div className="col-2"></div>Search
        </div>
      ),
    },
    {
      label: "Output",
      content: (
        <div className="row">
          <div className="col-2"></div>
          <div className="col-2"></div>Output
        </div>
      ),
    },
    {
      label: "SEO",
      content: (
        <div className="row">
          <div className="col-2"></div>
          <div className="col-2"></div>SEO
        </div>
      ),
    },
    {
      label: "Social Media",
      content: (
        <div className="row">
          <div className="col-2"></div>
          <div className="col-2"></div>Social Media
        </div>
      ),
    },
    {
      label: "ORM",
      content: (
        <div className="row">
          <div className="col-2"></div>
          <div className="col-2"></div>ORM
        </div>
      ),
    },
    {
      label: "Influencers",
      content: (
        <div className="row">
          <div className="col-2"></div>
          <div className="col-2"></div>Influencers
        </div>
      ),
    },
    {
      label: "Paid Media",
      content: (
        <div className="row">
          <div className="col-2"></div>
          <div className="col-2"></div>Paid Media
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
