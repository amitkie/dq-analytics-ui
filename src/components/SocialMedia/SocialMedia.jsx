import React from "react";

function SocialMedia({ healthCardData }) {
  return (
    <>
      <div className="row g-3 justify-content-center">
        {/* <div className="col-3">
          <div className="overview-box">
            <div className="box-title">Facebook</div>
            <div className="score-details">
              <table className="score-table">
                <tr>
                  <td>
                    <p>Mentions: </p>
                  </td>
                  <td>
                    <span className="score-subscores">3570006.89 </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Engagement: </p>
                  </td>
                  <td>
                    <span className="score-subscores">49159000.00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Net Sentiment:</p>
                  </td>
                  <td>
                    <span className="score-subscores">72.62</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Engagement %:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 161658.00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Followers: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> 0.33%</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="overview-box">
            <div className="box-title">Twitter</div>
            <div className="score-details">
              <table className="score-table">
                <tr>
                  <td>
                    <p>Mentions: </p>
                  </td>
                  <td>
                    <span className="score-subscores">3570006.89 </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Engagement: </p>
                  </td>
                  <td>
                    <span className="score-subscores">49159000.00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Net Sentiment:</p>
                  </td>
                  <td>
                    <span className="score-subscores">72.62</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Engagement %:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 161658.00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Followers: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> 0.33%</span>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="overview-box">
            <div className="box-title">Instagram</div>
            <div className="score-details">
              <table className="score-table">
                <tr>
                  <td>
                    <p>Mentions: </p>
                  </td>
                  <td>
                    <span className="score-subscores">3570006.89 </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Engagement: </p>
                  </td>
                  <td>
                    <span className="score-subscores">49159000.00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Net Sentiment:</p>
                  </td>
                  <td>
                    <span className="score-subscores">72.62</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Engagement %:</p>
                  </td>
                  <td>
                    <span className="score-subscores"> 161658.00</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Followers: </p>
                  </td>
                  <td>
                    <span className="score-subscores"> 0.33%</span>
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
    </>
  );
}

export default SocialMedia;
