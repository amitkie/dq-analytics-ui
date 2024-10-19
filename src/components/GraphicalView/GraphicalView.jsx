
// import React, { useState, useEffect } from "react";
// import BarChart from "../../common/BarChart/BarChart";
// import { getWeights } from "../../services/projectService";
// import "./GraphicalView.scss";

// function ScoreCard({ getColor, projectId }) {
//   const [weightInfo, setWeightInfo] = useState([]);
//   const [chartsData, setChartsData] = useState([]);
//   const [currentSection, setCurrentSection] = useState(null); // State for current graph section

//   const fetchWeightsData = async (projectid) => {
//     try {
//       const weightData = await getWeights(projectid);
//       console.log(weightData);
//       if (weightData) {
//         setWeightInfo(weightData);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchWeightsData(projectId);
//   }, [projectId]);

//   useEffect(() => {
//     const processChartsData = () => {
//       const sortedMetrics = weightInfo
//         .filter((metric) => metric.weights !== null)
//         .sort((a, b) => b.weights - a.weights)
//         .slice(0, 12)
//         .map((metric) => ({
//           name: metric.metricName,
//           weight: metric.weights !== null ? metric.weights : 0,
//           section: metric.sectionName,
//           platform: metric.platformName,
//         }));

//       setChartsData(sortedMetrics);
//     };

//     if (weightInfo.length > 0) {
//       processChartsData();
//     }
//   }, [weightInfo]);

//   const handleGraphData = (type) => {
//     setCurrentSection(type); // Set the current section based on the button clicked
//   };

//   // Filter chartsData based on the selected section
//   const filteredChartsData = currentSection
//     ? chartsData.filter((data) => data.section === currentSection)
//     : chartsData; // Show all data if no section is selected

//   // Prepare an array of empty charts to ensure 12 are always displayed
//   const emptyCharts = [...Array(12 - filteredChartsData.length)].map((_, index) => ({
//     name: "",
//     weight: 0,
//     section: "",
//     platform: "",
//   }));

//   // Combine filtered data with empty charts to always show 12 charts
//   const displayChartsData = [...filteredChartsData, ...emptyCharts];

//   return (
//     <div className="row">
//       <div className="d-flex gap-2 my-2">
//         <button className="new-btn-mkc" onClick={() => handleGraphData('Marketplace')}>
//           <div>
//             <span
//               style={{
//                 display: 'inline-block',
//                 width: '10px',
//                 height: '10px',
//                 borderRadius: '50%',
//                 backgroundColor: getColor('Marketplace'),
//                 marginRight: '5px',
//               }}
//             ></span>
//             <span>Marketplace</span>
//           </div>
//         </button>
//         <button className="new-btn-ds" onClick={() => handleGraphData('Digital Spends')}>
//           <div>
//             <span
//               style={{
//                 display: 'inline-block',
//                 width: '10px',
//                 height: '10px',
//                 borderRadius: '50%',
//                 backgroundColor: getColor('Digital Spends'),
//                 marginRight: '5px',
//               }}
//             ></span>
//             <span>Digital Spends</span>
//           </div>
//         </button>
//         <button className="new-btn-sc" onClick={() => handleGraphData('Socialwatch')}>
//           <div>
//             <span
//               style={{
//                 display: 'inline-block',
//                 width: '10px',
//                 height: '10px',
//                 borderRadius: '50%',
//                 backgroundColor: getColor('Socialwatch'),
//                 marginRight: '5px',
//               }}
//             ></span>
//             <span>Socialwatch</span>
//           </div>
//         </button>
//         <button className="new-btn-op" onClick={() => handleGraphData('Organic Performance')}>
//           <div>
//             <span
//               style={{
//                 display: 'inline-block',
//                 width: '10px',
//                 height: '10px',
//                 borderRadius: '50%',
//                 backgroundColor: getColor('Organic Performance'),
//                 marginRight: '5px',
//               }}
//             ></span>
//             <span>Organice Performance</span>
//           </div>
//         </button>
//       </div>

//       {/* Render 12 BarCharts */}
//       {displayChartsData.map((chartData, index) => (
//         <div key={index} className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
//           <div className="chart-box">
//             <b>Platform</b> {chartData.platform && <h6>{chartData.platform}</h6>} {/* Display platform name */}
//             <b>Metric</b> {chartData.name && <h6>{chartData.name}</h6>} {/* Display platform name */}
//             <BarChart
//               series={[{ name: chartData.name, data: [chartData.weight] }]} // Pass the series correctly
//               categories={[chartData.name]} // Pass categories based on chartData
//               xAxisRange={[0, 100]} // Set x-axis range from 0 to 100
//               noDataText="No data available" // Display when no data is available
//               showDataLabels // New prop to show metric names on bars
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ScoreCard;

import React, { useState, useEffect } from "react";
import BarChart from "../../common/BarChart/BarChart";
import { getWeights } from "../../services/projectService";
import "./GraphicalView.scss";

function ScoreCard({ getColor, projectId }) {
  const [weightInfo, setWeightInfo] = useState([]);
  const [chartsData, setChartsData] = useState([]);
  const [currentSection, setCurrentSection] = useState(null); // State for current graph section

  const fetchWeightsData = async (projectid) => {
    try {
      const weightData = await getWeights(projectid);
      console.log(weightData);
      if (weightData) {
        setWeightInfo(weightData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeightsData(projectId);
  }, [projectId]);

  useEffect(() => {
    const processChartsData = () => {
      const sortedMetrics = weightInfo
        .filter((metric) => metric.weights !== null)
        .sort((a, b) => b.weights - a.weights)
        .slice(0, 12)
        .map((metric) => ({
          name: metric.metricName,
          weight: metric.weights !== null ? metric.weights : 0,
          section: metric.sectionName,
          platform: metric.platformName,
        }));

      setChartsData(sortedMetrics);
    };

    if (weightInfo.length > 0) {
      processChartsData();
    }
  }, [weightInfo]);

  const handleGraphData = (type) => {
    setCurrentSection(type); // Set the current section based on the button clicked
  };

  // Filter chartsData based on the selected section
  const filteredChartsData = currentSection
    ? chartsData.filter((data) => data.section === currentSection)
    : chartsData; // Show all data if no section is selected

  // Prepare an array of empty charts to ensure 12 are always displayed
  const emptyCharts = [...Array(12 - filteredChartsData.length)].map((_, index) => ({
    name: "",
    weight: 0,
    section: "",
    platform: "",
  }));

  // Combine filtered data with empty charts to always show 12 charts
  const displayChartsData = [...filteredChartsData, ...emptyCharts];

  return (
    <div className="row">
      <div className="d-flex gap-2 mt-2 mb-3">
        <button className="new-btn-graphic mkc" onClick={() => handleGraphData('Marketplace')}>
          <div>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: getColor('Marketplace'),
                marginRight: '5px',
              }}
            ></span>
            <span>Marketplace</span>
          </div>
        </button>
        <button className="new-btn-graphic ds" onClick={() => handleGraphData('Digital Spends')}>
          <div>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: getColor('Digital Spends'),
                marginRight: '5px',
              }}
            ></span>
            <span>Digital Spends</span>
          </div>
        </button>
        <button className="new-btn-graphic sc" onClick={() => handleGraphData('Socialwatch')}>
          <div>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: getColor('Socialwatch'),
                marginRight: '5px',
              }}
            ></span>
            <span>Socialwatch</span>
          </div>
        </button>
        <button className="new-btn-graphic op" onClick={() => handleGraphData('Organic Performance')}>
          <div>
            <span
              style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: getColor('Organic Performance'),
                marginRight: '5px',
              }}
            ></span>
            <span>Organic Performance</span>
          </div>
        </button>
      </div>

      {/* Render 12 BarCharts */}
      {displayChartsData?.map((chartData, index) => (
        <div key={index} className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
          <div className="chart-box">
            <div className="chart-heading">
              <div className="chart-result">
                <span className="item-title">Platform:</span>
                {chartData.platform && <span className="item-result">{chartData.platform}</span>}
              </div>
              <div className="chart-result">
                <span className="item-title">Metric:</span>
                {chartData.name &&  <span className="item-result">{chartData.name}</span>}
              </div>  
            </div>
             
              {/* Display metric name */}
            <BarChart
              series={[{ name: chartData.name, data: [chartData.weight] }]} // Pass the series correctly
              categories={[chartData.name]} // Pass categories based on chartData
              xAxisRange={[0, 100]} // Set x-axis range from 0 to 100
              noDataText="No data available" // Display when no data is available
              showDataLabels // New prop to show metric names on bars
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScoreCard;



