// import React, { Component } from "react";
// import Chart from "react-apexcharts";
// import "../../assets/mixins/mixins.scss";
// import "./LineChart.scss";

// class LineChart extends Component {
//   constructor(props) {
//     super(props);

//     const { insightsDQScoreData, scoreType } = this.props;

//     const allBrandNames = Array.from(new Set(
//       insightsDQScoreData.flatMap(project =>
//         project.brands.map(brand => brand.brand_name)
//       )
//     ));

//     const projects = insightsDQScoreData?.map(project => ({
//       name: `Project ${project.project_name}`,
//       brands: allBrandNames.map(brandName => {
//         const brand = project.brands.find(b => b.brand_name === brandName);
//         return {
//           brandName,
//           score: brand ? brand.dq_score[scoreType]?.toFixed(2) || 0 : 0, 
//         };
//       })
//     })) || [];

//     const series = projects.map(project => ({
//       name: project.name, // Project name
//       data: project.brands.map(brand => brand.score), // Scores for each brand
//     }));

//     this.state = {
//       options: {
//         chart: {
//           type: "line",
//           height: 450,
//         },
//         title: {
//           text: `${scoreType.replace(/_/g, ' ')} Scores Comparison`, // Dynamic title
//           align: "center",
//           style: {
//             fontSize: "16px",
//             fontWeight: "bold",
//           },
//         },
//         xaxis: {
//           categories: allBrandNames, // X-axis labels (all brand names)
//           title: {
//             text: "Brands",
//           },
//         },
//         yaxis: {
//           title: {
//             text: "Score",
//           },
//           min: 0,
//           max: 100, // Assuming scores are out of 100
//         },
//         colors: ['#1E90FF', '#FF6347', '#32CD32', '#FFA500', '#800080'], // Color for each project
//         stroke: {
//           curve: 'smooth',
//         },
//         dataLabels: {
//           enabled: true,
//         },
//         legend: {
//           position: 'top',
//           horizontalAlign: 'right',
//         },
//       },
//       series: series, // Y-axis values for each project
//     };
//   }

//   render() {
//     const { series } = this.state;
//     const hasData = series.some(s => s.data.length > 0 && s.data.some(score => score > 0));

//     return (
//       <div className="line-chart">
//         {hasData ? (
//           <Chart options={this.state.options} series={this.state.series} type="line" height={450} />
//         ) : (
//           <div className="empty-chart">
//             <p className="no-data">No data available for {this.state.options.title.text}</p>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default LineChart;


import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "../../assets/mixins/mixins.scss";
import "./LineChart.scss";

const LineChart = ({ insightsDQScoreData, scoreType, filteredBrands }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({
    chart: {
      type: "line",
      height: 450,
    },
    title: {
      text: "",
      align: "center",
      style: {
        fontSize: "16px",
        fontWeight: "bold",
      },
    },
    grid: {
      xaxis: {
          lines: {
              show: false
          }
      },   
      yaxis: {
          lines: {
              show: false
          }
      },
    },
    xaxis: {
      categories: [], // This will be dynamically set
      title: {
        text: "Brands",
      },
    },
    yaxis: {
      title: {
        text: "Score",
      },
      min: 0,
      max: 100,
    },
    colors: ['#1E90FF', '#FF6347', '#32CD32', '#FFA500', '#800080'],
    stroke: {
      curve: 'smooth',
    },
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
    },
  });

  useEffect(() => {
    const allBrandNames = Array.from(new Set(
      insightsDQScoreData.flatMap(project =>
        project.brands.map(brand => brand.brand_name)
      )
    ));

    // Use filteredBrands if available, otherwise use all brands
    const brandNamesToDisplay = filteredBrands.length > 0 ? filteredBrands : allBrandNames;

    // Prepare the projects and series data
    const projects = insightsDQScoreData?.map(project => ({
      name: `Project ${project.project_name}`,
      brands: brandNamesToDisplay.map(brandName => {
        const brand = project.brands.find(b => b.brand_name === brandName);
        return {
          brandName,
          score: brand ? brand.dq_score[scoreType]?.toFixed(2) || 0 : 0,
        };
      })
    })) || [];

    const updatedSeries = projects.map(project => ({
      name: project.name,
      data: project.brands.map(brand => brand.score),
    }));

    // Update chart options dynamically
    setOptions(prevOptions => ({
      ...prevOptions,
      title: {
        ...prevOptions.title,
        text: `${scoreType.replace(/_/g, ' ')} Scores Comparison`,
      },
      xaxis: {
        ...prevOptions.xaxis,
        categories: brandNamesToDisplay,
      },
    }));

    // Set series data for the chart
    setSeries(updatedSeries);
  }, [insightsDQScoreData, scoreType, filteredBrands]);

  // Check if there is any data to display
  const hasData = series.some(s => s.data.length > 0 && s.data.some(score => score > 0));

  return (
    <div className="line-chart">
      {hasData ? (
        <Chart options={options} series={series} type="line" height={450} />
      ) : (
        <div className="empty-chart">
          <p className="no-data">No data available for {options.title.text}</p>
        </div>
      )}
    </div>
  );
};

export default LineChart;
