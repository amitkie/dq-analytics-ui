import React, { useState, useEffect } from "react";
import BarChart from "../../common/BarChart/BarChart";
import "./GraphicalView.scss";

function ScoreCard({ getColor, projectId, normalizedData }) {
  const [chartsData, setChartsData] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);

  const fetchWeightsData = async (projectid) => {
    try {
      processChartsData(normalizedData, currentSection);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeightsData(projectId);
  }, [projectId]);

  const processChartsData = (apiResponseData, sectionName) => {

    const filteredData = apiResponseData
      .filter((metric) => metric.weights !== null)
      .filter((metric) =>
        metric.sectionName === sectionName ||
        (!sectionName && metric.sectionName === "Marketplace")
      );

    const groupedData = filteredData.reduce((acc, item) => {
      const key = `${item.sectionName}-${item.platformname}-${item.metricname}`;
      if (!acc[key]) {
        acc[key] = {
          section: item.sectionName,
          platform: item.platformname,
          metric: item.metricname,
          brands: [],
          weights: item.weights,
        };
      }
      acc[key].brands.push({
        brand: item.brandName,
        actualValue: item.actualValue,
      });
      return acc;
    }, {});

    // Sort by weights and take the top 12 items
    const sortedMetrics = Object.values(groupedData)
      .sort((a, b) => b.weights - a.weights)
      .slice(0, 12);

    const chartData = sortedMetrics.map((metric) => ({
      section: metric.section,
      platform: metric.platform,
      metric: metric.metric,
      brands: metric.brands.map((b) => ({
        brand: b.brand,
        actualValue: b.actualValue,
      })),
    }));

    setChartsData(chartData);
  };

  const handleGraphData = (type) => {
    setCurrentSection(type);
    processChartsData(normalizedData, type);
  };

  const filteredChartsData = currentSection
    ? chartsData.filter((data) => data.section === currentSection)
    : chartsData;
  const emptyCharts = Array.from({ length: 12 - filteredChartsData.length }, () => ({
    platform: "",
    metric: "",
    brands: [{ brand: "", actualValue: 0 }],
  }));

  const displayChartsData = [...filteredChartsData, ...emptyCharts];


  return (
    <div className="row">
      <div className="d-flex gap-2 mt-2 mb-3">
        <button className="new-btn-graphic mkc" onClick={() => handleGraphData('Marketplace')}>
          <span style={{ backgroundColor: getColor('Marketplace'), borderRadius: '50%', marginRight: '5px', width: '10px', height: '10px' }}></span>
          Marketplace
        </button>
        <button className="new-btn-graphic ds" onClick={() => handleGraphData('Digital Spends')}>
          <span style={{ backgroundColor: getColor('Digital Spends'), borderRadius: '50%', marginRight: '5px', width: '10px', height: '10px' }}></span>
          Digital Spends
        </button>
        <button className="new-btn-graphic sc" onClick={() => handleGraphData('Socialwatch')}>
          <span style={{ backgroundColor: getColor('Socialwatch'), borderRadius: '50%', marginRight: '5px', width: '10px', height: '10px' }}></span>
          Socialwatch
        </button>
        <button className="new-btn-graphic op" onClick={() => handleGraphData('Organic Performance')}>
          <span style={{ backgroundColor: getColor('Organic Performance'), borderRadius: '50%', marginRight: '5px', width: '10px', height: '10px' }}></span>
          Organic Performance
        </button>
      </div>
      {displayChartsData?.map((chartData, index) => {

        const seriesData = chartData.brands.map((brand) => ({
          name: brand.brand,
          data: [brand.actualValue?.toFixed(2)],
        }));

        return (
          <div key={`chart-${index}`} className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
            <div className="chart-box">
              <div className="chart-heading">
                <div className="chart-result">
                  <span className="item-title">Platform:</span>
                  {chartData.platform && <span className="item-result">{chartData.platform}</span>}
                </div>
                <div className="chart-result">
                  <span className="item-title">Metric:</span>
                  {chartData.metric && <span className="item-result">{chartData.metric}</span>}
                </div>
              </div>
              <BarChart
                key={index}
                series={seriesData}  // Pass the properly structured series
                categories={chartData.brands.map((brand) => brand.brand)} // Use brand names for categories
                noDataText="No data available"
              />
            </div>
          </div>
        );
      })}






    </div>
  );
}

export default ScoreCard;




