import React from "react";

const BrandPerformance = ({ healthCardData }) => {
  return (
    <div className="row justify-content-center g-3">
      {/* <div className="col-3">
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
  );
};

export default BrandPerformance;
