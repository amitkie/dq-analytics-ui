import React , {useState, useEffect}from "react";
import BubbleChart from "../../common/bubbleCharts/BubbleChart";
import TrendChart from "../../common/TrendChart/TrendChart";
import Form from "react-bootstrap/Form";
import "./ScoreCard.scss";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";

function ScoreCard({dqScoreValue, dqScoreLoading=false}) {

  const [brandDQ, setBrandDQ] = useState([]);
  const [selectedBrandDQ, setSelectedBrandDQ] = useState([]);

  const [categoryDQ, setCategoryDQ] = useState([]);
  const [SelectedCategoryDQ, setSelectedCategoryDQ] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      if (!dqScoreValue) {
        console.log("dqScoreValue is not set yet.");
        return;
      }

      const brandsData = dqScoreValue.map((brand, index) => ({
        value: index, // or use brand.Brand_Name if unique
        label: brand.Brand_Name,
      }));
      setBrandDQ(brandsData);
      console.log("brandsData", brandsData);
    };

    fetchData();
  }, [dqScoreValue]);

  const handleBrandDQChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedBrandDQ(selectedValue);
    console.log("Selected brand index:", selectedValue);
  };

  const selectedBrandData = selectedBrandDQ ? dqScoreValue[selectedBrandDQ] : null;
  
  const handleCategoryDQChange = () => {
    console.log('category')
  }


  return (
    <div className="row">
      <div className="col-12">
        <div className="dq-header">
            <div className="brand-option">
              <div className="brand-select-option">
                {/* <MultiSelectDropdown
                  options={brandDQ}
                  selectedValues={selectedBrandDQ}
                  onChange={handleBrandDQChange}
                  placeholder="Select Brands"
                /> */}
                <select onChange={handleBrandDQChange} value={selectedBrandDQ} className="select-input">
                  <option value="">Select Brand</option>
                  {brandDQ.map((brand) => (
                    <option key={brand.value} value={brand.value}>
                      {brand.label}
                    </option>
                  ))}
                </select>
              </div>
              {selectedBrandData ? (
              <ul className="score-box">
                {/* <li>
                  <span className="scoreTitle">Brand: {selectedBrandData.Brand_Name}</span>
                </li> */}
                <li>
                  <span className="scoreTitle">DQ Score</span>
                  <span className="scoreValue">{selectedBrandData.Overall_Final_Score.toFixed(2)}</span>
                </li>
                <li>
                  <span className="scoreTitle">Marketplace</span>
                  <span className="scoreValue">{selectedBrandData.Marketplace}</span>
                </li>
                <li>
                  <span className="scoreTitle">Socialwatch</span>
                  <span className="scoreValue">{selectedBrandData.Socialwatch}</span>
                </li>
                <li>
                  <span className="scoreTitle">Digital Spends</span>
                  <span className="scoreValue">{selectedBrandData["Digital Spends"]}</span>
                </li>
                <li>
                  <span className="scoreTitle">Organic Performance</span>
                  <span className="scoreValue">{selectedBrandData["Organic Performance"]}</span>
                </li>
              </ul>
            ) : (
              <p>No brand selected</p>
            )}
            </div>
           
          <div className="project-filter">
            <div className="range-filter">
              <span>DQ score Range:</span>
              <Form.Range />
            </div>
            <div className="brand-select-option">
              <MultiSelectDropdown
                options={categoryDQ}
                selectedValues={SelectedCategoryDQ}
                onChange={handleCategoryDQChange}
                placeholder="Select Category"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-6 mb-md-4 mt-md-4">
        <div className="chart-group">
          <div className="chart-list">
            {
            !dqScoreLoading ? 
            <TrendChart dqScoreValue={dqScoreValue} chartType="Ecom" />
            : (<div className="loader-container-sm">
              <div className="loader-sm"></div>
              <span className="loader-text">Loading, Please Wait</span>
            </div>)  
           }
            <span className="graph-title">Ecom DQ Score</span>
          </div>
          <div className="chart-list">
            {
              !dqScoreLoading ? 
              <TrendChart dqScoreValue={dqScoreValue} chartType="Social" />
              : (
                <div className="loader-container-sm">
              <div className="loader-sm"></div>
              <span className="loader-text">Loading, Please Wait</span>
            </div>
              )
            }
            <span className="graph-title">Social DQ Score</span>
          </div>
          <div className="chart-list">
            {
              !dqScoreLoading ? 
              <TrendChart dqScoreValue={dqScoreValue} chartType="Paid" />
              : (
                <div className="loader-container-sm">
                <div className="loader-sm"></div>
                <span className="loader-text">Loading, Please Wait</span>
              </div>
              )
            }
            <span className="graph-title">Paid DQ Score</span>
          </div>
          <div className="chart-list">
            {
              !dqScoreLoading ? 
              <TrendChart dqScoreValue={dqScoreValue} chartType="Brand Perf" />
              : (
                <div className="loader-container-sm">
                <div className="loader-sm"></div>
                <span className="loader-text">Loading, Please Wait</span>
              </div>
              )
            }
            <span className="graph-title">Brand Perf DQ Score</span>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-6 mb-md-4">
        <div className="dq-score-bubble">
          {
            !dqScoreLoading ? 
            <TrendChart dqScoreValue={dqScoreValue} chartType="Overall_Final_Score" />
            : (
              <div className="loader-container-sm">
              <div className="loader-sm"></div>
              <span className="loader-text">Loading, Please Wait</span>
            </div>
            )
          }
          <span className="graph-title">DQ Score</span>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
