import React from 'react'
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";
import { Table } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { MdBubbleChart } from "react-icons/md";
import { MdOutlineStackedLineChart } from "react-icons/md";
import { MdOutlineShowChart } from "react-icons/md";
import { MdOutlineMultilineChart } from "react-icons/md";
import { GiMultipleTargets } from "react-icons/gi";
import ButtonComponent from "../../common/button/button";
import TabComponent from "../../components/tabs/TabComponent";
import HealthCardScore from "./HealthCardScore.jsx";

import "./overview/HealthCardOverview.scss";
import "./HealthCardReport.scss";

const HealthCardReport = ({brandDetailData, brandImages}) => {


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
    const brands = [
        { name: 'Puresense', value: 85 },
        { name: 'Livon', value: 87 },
        { name: 'Lakme', value: 65 },
      ];
    const tabsBest = [
        
        {
          label: "Ecom",
          content: (
            <Table responsive striped bordered>
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Metrics</th>
                        <th>Weights</th>
                        <th>normalized</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>Amazon</td>
                        <td>Net sentiment</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                    <tr>
                      <td>Amazon</td>
                        <td>Engagement</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                    <tr>
                      <td>Amazon</td>
                        <td>Organic rank</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                    <tr>
                      <td>Amazon</td>
                        <td>Net sentiment</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                    <tr>
                      <td>Amazon</td>
                        <td>Engagement</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                </tbody>
            </Table> 
          ),
        },
        {
          label: "Social ",
          content: (
            <Table responsive striped bordered>
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Metrics</th>
                        <th>Weights</th>
                        <th>normalized</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>Amazon</td>
                        <td>Net sentiment</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                    <tr>
                      <td>Amazon</td>
                        <td>Engagement</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                    <tr>
                      <td>Amazon</td>
                        <td>Organic rank</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                    <tr>
                      <td>Amazon</td>
                        <td>Net sentiment</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                    <tr>
                      <td>Amazon</td>
                        <td>Engagement</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                </tbody>
            </Table> 
          ),
        },
        {
          label: "Paid",
          content: (
            <Table responsive striped bordered>
                <thead>
                    <tr>
                      <th>Platform</th>
                        <th>Metrics</th>
                        <th>Weights</th>
                        <th>normalized</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>Net sentiment</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Engagement</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Organic rank</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Net sentiment</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Engagement</td>
                        <td>76</td>
                        <td>50</td>
                    </tr>
                </tbody>
            </Table> 
          ),
        },
        {
          label: "Brand Perf",
          content: (
            <Table responsive striped bordered>
                <thead>
                    <tr>
                        <th>Section</th>
                        <th>Metrics</th>
                        <th>Weights</th>
                        <th>normalized</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      <td></td>
                      <td>Net sentiment</td>
                      <td>76</td>
                      <td>50</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Engagement</td>
                      <td>76</td>
                      <td>50</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Organic rank</td>
                      <td>76</td>
                      <td>50</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Net sentiment</td>
                      <td>76</td>
                      <td>50</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>Engagement</td>
                      <td>76</td>
                      <td>50</td>
                    </tr>
                </tbody>
            </Table> 
          ),
        },
    ];
    const tabsWorst = [
      {
        label: "Ecom",
        content: (
          <Table responsive striped bordered>
              <thead>
                  <tr>
                      <th>Platform</th>
                      <th>Metrics</th>
                      <th>Weights</th>
                      <th>normalized</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>Amazon</td>
                      <td>Net sentiment</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
                  <tr>
                    <td>Amazon</td>
                      <td>Engagement</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
                  <tr>
                    <td>Amazon</td>
                      <td>Organic rank</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
                  <tr>
                    <td>Amazon</td>
                      <td>Net sentiment</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
                  <tr>
                    <td>Amazon</td>
                      <td>Engagement</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
              </tbody>
          </Table> 
        ),
      },
      {
        label: "Social ",
        content: (
          <Table responsive striped bordered>
              <thead>
                  <tr>
                      <th>Platform</th>
                      <th>Metrics</th>
                      <th>Weights</th>
                      <th>normalized</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>Amazon</td>
                      <td>Net sentiment</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
                  <tr>
                    <td>Amazon</td>
                      <td>Engagement</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
                  <tr>
                    <td>Amazon</td>
                      <td>Organic rank</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
                  <tr>
                    <td>Amazon</td>
                      <td>Net sentiment</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
                  <tr>
                    <td>Amazon</td>
                      <td>Engagement</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
              </tbody>
          </Table> 
        ),
      },
      {
        label: "Paid",
        content: (
          <Table responsive striped bordered>
              <thead>
                  <tr>
                    <th>Platform</th>
                      <th>Metrics</th>
                      <th>Weights</th>
                      <th>normalized</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td></td>
                      <td>Net sentiment</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
                  <tr>
                      <td></td>
                      <td>Engagement</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
                  <tr>
                      <td></td>
                      <td>Organic rank</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
                  <tr>
                      <td></td>
                      <td>Net sentiment</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
                  <tr>
                      <td></td>
                      <td>Engagement</td>
                      <td>76</td>
                      <td>50</td>
                  </tr>
              </tbody>
          </Table> 
        ),
      },
      {
        label: "Brand Perf",
        content: (
          <Table responsive striped bordered>
              <thead>
                  <tr>
                      <th>Section</th>
                      <th>Metrics</th>
                      <th>Weights</th>
                      <th>normalized</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                    <td></td>
                    <td>Net sentiment</td>
                    <td>76</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Engagement</td>
                    <td>76</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Organic rank</td>
                    <td>76</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Net sentiment</td>
                    <td>76</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td></td>
                    <td>Engagement</td>
                    <td>76</td>
                    <td>50</td>
                  </tr>
              </tbody>
          </Table> 
        ),
      },
    ];

    const tabsSummary = [
      {
        label: "Sectional Summary",
        content: (
          <Table responsive striped bordered>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Section Name</th>
                    <th>total Weight</th>
                    <th>Brands above you</th>
                    <th>Brands above you</th>
                    <th>average normalised Score</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Ecom</td>
                    <td>50</td>
                    <td>Livon</td>
                    <td>Lakme</td>
                    <td>75</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Social</td>
                    <td>50</td>
                    <td> </td>
                    <td>Lakme</td>
                    <td>75</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Paid</td>
                    <td>50</td>
                    <td>Wow</td>
                    <td>Lakme</td>
                    <td>75</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Brand Perf</td>
                    <td>50</td>
                    <td>Wow</td>
                    <td>Lakme</td>
                    <td>75</td>
                </tr>
            </tbody>
        </Table> 
        ),
      },
      {
        label: "Platform Summary ",
        content: (
          <Table responsive striped bordered>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Section Name</th>
                    <th>Platform Name</th>
                    <th>total Weight</th>
                    <th>Brands above you</th>
                    <th>Brands above you</th>
                    <th>average normalised Score</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Ecom</td>
                    <td>Amazon</td>
                    <td>50</td>
                    <td>Livon</td>
                    <td>Lakme</td>
                    <td>75</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Social</td>
                    <td>Facebook</td>
                    <td>50</td>
                    <td> </td>
                    <td>Lakme</td>
                    <td>75</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Paid</td>
                    <td>DV360</td>
                    <td>50</td>
                    <td>Wow</td>
                    <td>Lakme</td>
                    <td>75</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Brand Perf</td>
                    <td>Page Speed insights</td>
                    <td>50</td>
                    <td>Wow</td>
                    <td>Lakme</td>
                    <td>75</td>
                </tr>
            </tbody>
        </Table>
        ),
      },
      {
        label: "Metric Summary",
        content: (
          <Table responsive striped bordered>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Section Name</th>
                    <th>Platform Name</th>
                    <th>Metric Name</th>
                    <th>total Weight</th>
                    <th>Brands above you</th>
                    <th>Brands above you</th>
                    <th>average normalised Score</th>
                    <th>Benchmark Value</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <td>1</td>
                  <td>Ecom</td>
                  <td>Amazon</td>
                  <td>Engagement</td>
                  <td>50</td>
                  <td>72.5</td>
                  <td>39.5</td>
                  <td>75</td>
                  <td>75</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Ecom</td>
                  <td>Amazon</td>
                  <td>Impressions</td>
                  <td>39.5</td>
                  <td>75</td>
                  <td>72.5</td>
                  <td>39.5</td>
                  <td>75</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Ecom</td>
                  <td>Amazon</td>
                  <td>Clicks</td>
                  <td>39.5</td>
                  <td>75</td>
                  <td>72.5</td>
                  <td>39.5</td>
                  <td>75</td>
                </tr>
            </tbody>
        </Table>
        ),
      },
      
    ];

  return (
    <div className="col-12">
        <div className="workspace-container">
            <div className="healthcard-heading">
                <h2 className="page-title ml-3">Health Card</h2>
            </div>
            <div className="brand-overview">
            {/* <span className="section-title">Brand Overview</span> */}
            <div className="brand-dqscores">
              <div className="score-list">
                <img
                  src={brandImages}
                  className="metric-icon"
                  alt="Brand Logo"
                />
                <div className="score-details">
                  <div className="brand-title">Livon</div>
                  <span className="brand-subtitle">Tea</span>
                </div>
              </div>
              <div className="score-list">
                <div className="metric-icon">
                  <MdBubbleChart />
                </div>
                <div className="score-details">
                  <div className="brand-title">
                  75
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
                  55
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
                  72
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
                    70
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
                  0
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
          <div className="report-container">
            <div className="info-title">
                <div className="info-left">
                <h4>Puresense - Category scores information</h4>
                <div className="category-name">
                    <span>Category: <strong>Beauty</strong></span>
                </div>
                <div className="category-name">
                    <span>Competitors List: <strong>LIVON, LAKME</strong></span>
                </div>
                </div>
                <ButtonComponent
                    // disabled
                    btnClass={"btn-primary"}
                    btnName={"Export as Excel"}
                />
            </div>
              <div className="dq-scores-tab">
                <div className="main-score-content">
                    <div className="item-category">
                        <h4>DQ Score</h4>
                        <HealthCardScore brands={brands} />
                    </div>
                    <div className="item-category">
                        <h4>Ecom DQ Score</h4>
                        <HealthCardScore brands={brands} />
                    </div>
                    <div className="item-category">
                        <h4>Social DQ Score</h4>
                        <HealthCardScore brands={brands} />
                    </div>
                    <div className="item-category">
                        <h4>Paid DQ Score</h4>
                        <HealthCardScore brands={brands} />
                    </div>
                    <div className="item-category">
                        <h4>Brand Perf</h4>
                        <HealthCardScore brands={brands} />
                    </div>
                </div>
                <div className="score-table-percentile">
                    <Table responsive striped bordered>
                        <thead>
                            <tr>
                                <th>Metric</th>
                                <th>DQ Score</th>
                                <th>Ecom DQ Score</th>
                                <th>Social DQ Score</th>
                                <th>Paid DQ Score</th>
                                <th>Brand Perf</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Avg Scores (Competition Brands)</td>
                                <td>76</td>
                                <td>50</td>
                                <td>72.5</td>
                                <td>39.5</td>
                                <td>75</td>
                            </tr>
                            <tr>
                                <td>50th percentile category value</td>
                                <td>76</td>
                                <td>50</td>
                                <td>72.5</td>
                                <td>39.5</td>
                                <td>75</td>
                            </tr>
                            <tr>
                                <td>75th percentile category value</td>
                                <td>76</td>
                                <td>50</td>
                                <td>72.5</td>
                                <td>39.5</td>
                                <td>75</td>
                            </tr>
                          
                        </tbody>
                    </Table>
                </div>
              </div>
              <div className="metric-performance">
                <div className="row">
                    <div className="col-sm-12 col-md-6">
                        <span className="box-sub-title">Best performing metrics</span>
                        <TabComponent
                             isBenchmarkDataSaved={true}
                            tabs={tabsBest}
                            className="custom-tabs performance-tab"
                        />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <span className="box-sub-title">Worst performing metrics</span>
                        <TabComponent
                             isBenchmarkDataSaved={true}
                            tabs={tabsWorst}
                            className="custom-tabs performance-tab"
                        />
                    </div>
                </div>
              </div>
              <div className="summary-container">
                <span className="section-title mb-3">Reports</span>
                <TabComponent
                  isBenchmarkDataSaved={true}
                  tabs={tabsSummary}
                  className="custom-tabs performance-tab"
                />
                    
              </div>
              
          </div>

        </div>
    </div>
  )
}

export default HealthCardReport