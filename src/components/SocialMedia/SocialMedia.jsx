import React from "react";

function SocialMedia({ healthCardData }) {
  return (
    <>
      <div className="row g-3 justify-content-center">
        

        {healthCardData &&
          Object.entries(healthCardData).map(([key, value], index) => (
            <div key={index} className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
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
