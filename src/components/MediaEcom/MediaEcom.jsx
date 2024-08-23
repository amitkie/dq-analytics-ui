import React from "react";

function MediaEcom({ healthCardData }) {
  console.log(healthCardData);

  return (
    <div>
      <div className="row g-3" data-masonry='{"percentPosition": true }'>
        {/* <div className="col-3">
          <div className="overview-box">
            <div className="box-title">
              Ecommerce <small> Organic</small>
            </div>
            <div className="score-details">
              <table className="score-table">
                <tr>
                  <td>
                    <p>Ratings:</p>
                  </td>
                  <td>
                    <span className="score-subscores">95.67%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Reviews:</p>
                  </td>
                  <td>
                    <span className="score-subscores">4.31 </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Net Sentiment: </p>
                  </td>
                  <td>
                    <span className="score-subscores">785</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Availability: </p>
                  </td>
                  <td>
                    <span className="score-subscores">61.44%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Bestseller Rank: </p>
                  </td>
                  <td>
                    <span className="score-subscores">61.44%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Search Visibility: </p>
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
            <div className="box-title">Amazon Performance - SP</div>
            <div className="score-details">
              <table className="score-table">
                <tr>
                  <td>
                    <p>Spends: </p>
                  </td>
                  <td>
                    <span className="score-subscores">35.89 </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Impressions: </p>
                  </td>
                  <td>
                    <span className="score-subscores">49.00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPM:</p>
                  </td>
                  <td>
                    <span className="score-subscores">72.62</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Clicks:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 16.00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CTR: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> 0.33%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPC:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 22.08</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Order Conversion Rate:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 16.93%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Sales:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 47.39</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>ACoS %:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 75.47% </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="overview-box">
            <div className="box-title">Amazon Performance - SB</div>
            <div className="score-details">
              <table className="score-table">
                <tr>
                  <td>
                    <p>Spends: </p>
                  </td>
                  <td>
                    <span className="score-subscores">35.89 </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Impressions: </p>
                  </td>
                  <td>
                    <span className="score-subscores">49.00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPM:</p>
                  </td>
                  <td>
                    <span className="score-subscores">72.62</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Clicks:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 16.00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CTR: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> 0.33%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPC:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 22.08</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Order Conversion Rate:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 16.93%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Sales:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 47.39</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>ACoS %:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 75.47% </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="overview-box">
            <div className="box-title mb-3">Flipkart Performance - PCA</div>
            <div className="score-details">
              <table className="score-table">
                <tr>
                  <td>
                    <p>Spends</p>
                  </td>
                  <td>
                    <span className="score-subscores">-0.70%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Impressions: </p>
                  </td>
                  <td>
                    <span className="score-subscores">10.80% </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPM: </p>
                  </td>
                  <td>
                    <span className="score-subscores">77.57%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Clicks: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CTR: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPC: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Order Conversion Rate: </p>
                  </td>
                  <td>
                    <span className="score-subscores">10.80% </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Sales: </p>
                  </td>
                  <td>
                    <span className="score-subscores">77.57%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>ACoS %: </p>
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
            <div className="box-title mb-3">Flipkart Performance - PLA</div>
            <div className="score-details">
              <table className="score-table">
                <tr>
                  <td>
                    <p>Spends</p>
                  </td>
                  <td>
                    <span className="score-subscores">-0.70%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Impressions: </p>
                  </td>
                  <td>
                    <span className="score-subscores">10.80% </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPM: </p>
                  </td>
                  <td>
                    <span className="score-subscores">77.57%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Clicks: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CTR: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPC: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Order Conversion Rate: </p>
                  </td>
                  <td>
                    <span className="score-subscores">10.80% </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Sales: </p>
                  </td>
                  <td>
                    <span className="score-subscores">77.57%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>ACoS %: </p>
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
            <div className="box-title mb-3">Blinkit Performance</div>
            <div className="score-details">
              <table className="score-table">
                <tr>
                  <td>
                    <p>Spends</p>
                  </td>
                  <td>
                    <span className="score-subscores">-0.70%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Impressions: </p>
                  </td>
                  <td>
                    <span className="score-subscores">10.80% </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPM: </p>
                  </td>
                  <td>
                    <span className="score-subscores">77.57%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Clicks: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CTR: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPC: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Order Conversion Rate: </p>
                  </td>
                  <td>
                    <span className="score-subscores">10.80% </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Sales: </p>
                  </td>
                  <td>
                    <span className="score-subscores">77.57%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>ACoS %: </p>
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
            <div className="box-title mb-3">Myntra Performance</div>
            <div className="score-details">
              <table className="score-table">
                <tr>
                  <td>
                    <p>Spends</p>
                  </td>
                  <td>
                    <span className="score-subscores">-0.70%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Impressions: </p>
                  </td>
                  <td>
                    <span className="score-subscores">10.80% </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPM: </p>
                  </td>
                  <td>
                    <span className="score-subscores">77.57%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Clicks: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CTR: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPC: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Order Conversion Rate: </p>
                  </td>
                  <td>
                    <span className="score-subscores">10.80% </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Sales: </p>
                  </td>
                  <td>
                    <span className="score-subscores">77.57%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>ACoS %: </p>
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
            <div className="box-title mb-3">Nykaa Performance</div>
            <div className="score-details">
              <table className="score-table">
                <tr>
                  <td>
                    <p>Spends</p>
                  </td>
                  <td>
                    <span className="score-subscores">-0.70%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Impressions: </p>
                  </td>
                  <td>
                    <span className="score-subscores">10.80% </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPM: </p>
                  </td>
                  <td>
                    <span className="score-subscores">77.57%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Clicks: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CTR: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPC: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Order Conversion Rate: </p>
                  </td>
                  <td>
                    <span className="score-subscores">10.80% </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Sales: </p>
                  </td>
                  <td>
                    <span className="score-subscores">77.57%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>ACoS %: </p>
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
            <div className="box-title mb-3">Bigbasket Performance</div>
            <div className="score-details">
              <table className="score-table">
                <tr>
                  <td>
                    <p>Spends</p>
                  </td>
                  <td>
                    <span className="score-subscores">-0.70%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Impressions: </p>
                  </td>
                  <td>
                    <span className="score-subscores">10.80% </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPM: </p>
                  </td>
                  <td>
                    <span className="score-subscores">77.57%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Clicks: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CTR: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>CPC: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Order Conversion Rate: </p>
                  </td>
                  <td>
                    <span className="score-subscores">10.80% </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Sales: </p>
                  </td>
                  <td>
                    <span className="score-subscores">77.57%</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>ACoS %: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> </span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div> */}

        {healthCardData &&
          Object.entries(healthCardData).map(([key, value], index) => (
            <div key={index} className="col-3">
              <div className="overview-box">
                <div className="box-title">
                  {key} <small> Organic</small>
                </div>
                <div className="score-details">
                  <table className="score-table">
                    <tbody>
                      {Object.entries(value).map(([metric, score], i) => (
                        <tr key={i}>
                          <td>
                            <p>{metric}:</p>
                          </td>
                          <td>
                            <span className="score-subscores">
                              {isNaN(Number(score))
                                ? "NA"
                                : Number(score).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default MediaEcom;
