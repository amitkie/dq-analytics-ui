import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
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
import MediaEcom from "../../../components/MediaEcom/MediaEcom";
import MediaOffPlatform from "../../../components/MediaOffPlatform/MediaOffPlatform";
import SocialMedia from "../../../components/SocialMedia/SocialMedia";

export default function HealthCardOverview() {
  const tabs = [
    {
      label: "Media - Ecom",
      content: <MediaEcom />,
    },
    {
      label: "Media - Off Platform",
      content: <MediaOffPlatform />,
    },
    {
      label: "Social Media",
      content: <SocialMedia />,
    },
    {
      label: "Brand Performance",
      content: (
        <div className="row justify-content-center g-3">
          <div className="col-3">
            <div className="overview-box">
              <div className="box-title">Website Performance</div>
              <div className="score-details">
                <table className="score-table">
                  <tr>
                    <td>
                      <p>Performance Score - Mobile:</p>
                    </td>
                    <td>
                      <span className="score-subscores">95.67%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Largest Contentful Paint (LCP):</p>
                    </td>
                    <td>
                      <span className="score-subscores">4.31 </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>First Input Display (FID): </p>
                    </td>
                    <td>
                      <span className="score-subscores">785</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Cummulative Layout Shift (CLS): </p>
                    </td>
                    <td>
                      <span className="score-subscores">61.44%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>First Contentful Paint (FCP): </p>
                    </td>
                    <td>
                      <span className="score-subscores">61.44%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Time to Interact (TTI): </p>
                    </td>
                    <td>
                      <span className="score-subscores">61.44%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Total Blocking Time (TBT): </p>
                    </td>
                    <td>
                      <span className="score-subscores">61.44%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Speed Index: </p>
                    </td>
                    <td>
                      <span className="score-subscores">61.44%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Organic Rank: </p>
                    </td>
                    <td>
                      <span className="score-subscores">61.44%</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="overview-box">
              <div className="box-title">SEOptimer Tool Inputs</div>
              <div className="score-details">
                <table className="score-table">
                  <tr>
                    <td>
                      <p>SEOptimer Grade:</p>
                    </td>
                    <td>
                      <span className="score-subscores">95.67%</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Usability Grade:</p>
                    </td>
                    <td>
                      <span className="score-subscores">4.31 </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Performance Grade: </p>
                    </td>
                    <td>
                      <span className="score-subscores">785</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Social Grade: </p>
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
  ];
  function getColorScore(value, thresholds) {
    if (typeof value === "string") {
      return <span style={{ color: "#252627" }}>{value}</span>;
    } else if (value > thresholds) {
      return <span style={{ color: "#339900" }}>{value}</span>;
    } else if (value < thresholds) {
      return <span style={{ color: "#cc3201" }}>{value}</span>;
    } else {
      return <span style={{ color: "#252627" }}>{value}</span>;
    }
  }

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
                <select name="fileName" className="filter-input">
                  <option value="Select File">Select File</option>
                  <option value="Alphabet">DA-2</option>
                  <option value="Number">DA-3</option>
                  <option value="Percentage">DA-4</option>
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
                    <div className="brand-title">
                      {getColorScore(59.2, [70.3])}
                    </div>
                    <span className="brand-subtitle">DQ Score</span>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                    >
                      <div className="percentile-score">70.3</div>
                    </OverlayTrigger>
                    <div className="score-diff danger-color">
                      <IoIosTrendingDown /> - 2.3
                    </div>
                  </div>
                </div>
                <div className="score-list">
                  <div className="metric-icon">
                    <MdOutlineStackedLineChart />
                  </div>
                  <div className="score-details">
                    <div className="brand-title">
                      {getColorScore(50.2, [40.0])}
                    </div>
                    <span className="brand-subtitle">Ecom DQ Score</span>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                    >
                      <div className="percentile-score">40.0</div>
                    </OverlayTrigger>
                    <div className="score-diff success-color">
                      <IoIosTrendingUp /> + 4.3
                    </div>
                  </div>
                </div>
                <div className="score-list">
                  <div className="metric-icon">
                    <MdOutlineShowChart />
                  </div>
                  <div className="score-details">
                    <div className="brand-title">
                      {getColorScore(50.7, [60.5])}
                    </div>
                    <span className="brand-subtitle">Social DQ Score</span>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                    >
                      <div className="percentile-score">75.3</div>
                    </OverlayTrigger>
                    <div className="score-diff success-color">
                      <IoIosTrendingUp /> + 2.3
                    </div>
                  </div>
                </div>
                <div className="score-list">
                  <div className="metric-icon">
                    <MdOutlineMultilineChart />
                  </div>
                  <div className="score-details">
                    <div className="brand-title">
                      {" "}
                      {getColorScore(55.4, [50])}
                    </div>
                    <span className="brand-subtitle">Paid DQ Score</span>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                    >
                      <div className="percentile-score">50.0</div>
                    </OverlayTrigger>
                    <div className="score-diff warning-color">
                      <IoIosTrendingUp /> + 0.3
                    </div>
                  </div>
                </div>
                <div className="score-list">
                  <div className="metric-icon">
                    <GiMultipleTargets />
                  </div>
                  <div className="score-details">
                    <div className="brand-title">
                      {getColorScore(55.4, [50])}
                    </div>
                    <span className="brand-subtitle">Brand Perf DQ Score</span>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={<Tooltip id="top">Percentile Value</Tooltip>}
                    >
                      <div className="percentile-score">52.4</div>
                    </OverlayTrigger>
                    <div className="score-diff danger-color">
                      <IoIosTrendingDown /> - 1.3
                    </div>
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
