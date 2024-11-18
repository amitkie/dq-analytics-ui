import React, { useState, useEffect } from "react";
import TrendChart from "../../common/TrendChart/TrendChart";
import Form from "react-bootstrap/Form";
import MultiSelectDropdown from "../../components/MultiSelectDropdown/MultiSelectDropdown";
import { getAllCategories } from "../../services/userService";
import "./ScoreCard.scss";

// Insights 
function ScoreCard({ dqScoreValue, dqScoreLoading = false }) {
  const [brandDQ, setBrandDQ] = useState([]);
  const [selectedBrandDQ, setSelectedBrandDQ] = useState([]);
  const [categoryDQ, setCategoryDQ] = useState([]);
  const [selectedCategoryDQ, setSelectedCategoryDQ] = useState([]);
  const [scoreRange, setScoreRange] = useState([0, 100]);
  const [filteredDQScoreValue, setFilteredDQScoreValue] = useState([]);


  const handleRangeChange = (e) => {
    const value = Number(e.target.value);
    setScoreRange([0, value]);
  };

  useEffect(() => {
     
    if (dqScoreValue) {
      const brandsData = dqScoreValue.map((brand, index) => ({
        value: index,
        label: brand.Brand_Name,
      }));
      setBrandDQ(brandsData);

      const categoryData = dqScoreValue
        .map((category, index) => ({
          value: index,
          label: category.Category_Name,
        }))
        .filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.label === item.label)
        );

      setCategoryDQ(categoryData);
    }
     
  }, [dqScoreValue]);

  const handleBrandDQChange = (event) => {
    setSelectedBrandDQ(event.target.value);
  };

  const handleCategoryDQ = async (selectedOptions) => {
    setSelectedCategoryDQ(selectedOptions);
  };
    
  const selectedBrandData =
    selectedBrandDQ !== "" && dqScoreValue[selectedBrandDQ]
      ? dqScoreValue[selectedBrandDQ]
      : null;

  const getFilteredData = () => {
    const [ , maxScore] = scoreRange;
    const selectedCategoryLabels = selectedCategoryDQ.map((option) => option.label);
    const rdata = dqScoreValue.filter((data) => {
      return (
        data.Overall_Final_Score <= maxScore ||
        data.Marketplace <= maxScore ||
        data.Socialwatch <= maxScore ||
        data["Digital Spends"] <= maxScore ||
        data["Organic Performance"] <= maxScore
      );
    });

    if(selectedCategoryDQ.length === 0 ){
      return rdata;
    }

    const categorySelectionFilter = rdata.filter((data) => selectedCategoryLabels.includes(data.Category_Name));
    console.log('categorySelectionFilter', categorySelectionFilter)
      return categorySelectionFilter;
  };
  

    useEffect(() => {
      const updatedData = getFilteredData();
      console.log('updatedData', updatedData);
      setFilteredDQScoreValue(updatedData);
    }, [scoreRange, dqScoreValue, selectedCategoryDQ]);
    
    console.log('FilteredDQScoreValue', filteredDQScoreValue)

  const chartTypes = [
    { type: "Marketplace", title: "Marketplace DQ Score", colorFill: "#0d47a0" },
    { type: "Socialwatch", title: "Socialwatch DQ Score", colorFill: "#FF9800"},
    { type: "Digital Spends", title: "Digital Spends DQ Score", colorFill: "#279E70"},
    { type: "Organic Performance", title: "Organic Performance DQ Score", colorFill: "#C82519"},
    { type: "Overall_Final_Score", title: "Overall DQ Score", colorFill: "#BE7CE2"},
  ];

  return (
    <div className="row">
      <div className="col-12">
        <div className="dq-header">
          <div className="brand-option">
            <div className="brand-select-option">
              <select
                onChange={handleBrandDQChange}
                value={selectedBrandDQ}
                className="brand-select-input"
              >
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
                <li>
                  <span className="scoreTitle">DQ Score</span>
                  <span className="scoreValue">
                    {selectedBrandData.Overall_Final_Score?.toFixed(2)}
                  </span>
                </li>
                <li>
                  <span className="scoreTitle">Marketplace</span>
                  <span className="scoreValue">
                    {selectedBrandData.Marketplace?.toFixed(2)}
                  </span>
                </li>
                <li>
                  <span className="scoreTitle">Socialwatch</span>
                  <span className="scoreValue">
                    {selectedBrandData.Socialwatch?.toFixed(2)}
                  </span>
                </li>
                <li>
                  <span className="scoreTitle">Digital Spends</span>
                  <span className="scoreValue">
                    {selectedBrandData["Digital Spends"]?.toFixed(2)}
                  </span>
                </li>
                <li>
                  <span className="scoreTitle">Organic Perf</span>
                  <span className="scoreValue">
                    {selectedBrandData["Organic Performance"]?.toFixed(2)}
                  </span>
                </li>
              </ul>
            ) : (
              <p className="score-box mb-0">
                Select Brand to see DQ scores
              </p>
            )}
          </div>

          <div className="project-filter">
            <div className="range-filter">
              <span>DQ Score Range: {scoreRange[0]} - {scoreRange[1]}</span>
              <Form.Range
                min={0}
                max={100}
                value={scoreRange[1]}
                onChange={handleRangeChange}
              />
            </div>
            <div className="brand-select-option w-160">
              <MultiSelectDropdown
                options={categoryDQ}
                selectedValues={selectedCategoryDQ}
                placeholder="Select Category"
                onChange={handleCategoryDQ}
              />
            </div>
          </div>
        </div>
      </div>


      <div className="col-md-12 col-lg-12 mb-md-4 mt-md-4">
    
        <div className="chart-container">
          <div className="left-side">
            {chartTypes.slice(0, 4).map(({ type, title, colorFill }) => (
              <div className="chart-list" key={type}>
                {dqScoreLoading ? (
                  <div className="loader-container-sm">
                    <div className="loader-sm"></div>
                    <span className="loader-text">Loading, Please Wait</span>
                  </div>
                ) : filteredDQScoreValue.some((data) => data[type] !== undefined) ? (
                  <TrendChart 
                    dqScoreValue={filteredDQScoreValue}
                    chartType={type}
                    scoreRange={scoreRange}
                    colorFill={colorFill}
                  />
                ) : (
                  <span className="no-data-text">No Data Found</span>
                )}
                <span className="graph-title">{title}</span>
              </div>
            ))}
          </div>

          <div className="right-side">
            {chartTypes[4] && (
              <div className="chart-list" key={chartTypes[4].type}>
                {dqScoreLoading ? (
                  <div className="loader-container-sm">
                    <div className="loader-sm"></div>
                    <span className="loader-text">Loading, Please Wait</span>
                  </div>
                ) : filteredDQScoreValue.some((data) => data[chartTypes[4].type] !== undefined) ? (
                  <TrendChart 
                    dqScoreValue={filteredDQScoreValue}
                    chartType={chartTypes[4].type}
                    scoreRange={scoreRange}
                    setScoreRange={setScoreRange}
                    colorFill={chartTypes[4].colorFill}
                  />
                ) : (
                  <span className="no-data-text">No Data Found</span>
                )}
                <span className="graph-title">{chartTypes[4].title}</span>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

export default ScoreCard;






