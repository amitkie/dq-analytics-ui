// import React, { Component } from "react";
// import Chart from "react-apexcharts";

// import "../../assets/mixins/mixins.scss";
// import "./TrendChart.scss";

// class TrendChart extends Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     const options = {
//       chart: {
//         height: 450,
//         type: "bubble",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       fill: {
//         opacity: 1.0,
//       },
//       title: {
//         text: "",
//       },
//       grid: {
//         show: false,
//       },
//       legend: {
//         show: false,
//       },
//       xaxis: {
//         show: false,
//         labels: {
//           show: true,
//         },
//         axisBorder: {
//           show: false,
//         },
//         min: 0,
//         max: 12,
//         categories: [
//           "Jan",
//           "Feb",
//           "Mar",
//           "Apr",
//           "May",
//           "Jun",
//           "Jul",
//           "Aug",
//           "Sep",
//           "Oct",
//           "nov",
//           "Dec",
//         ],
//       },
//       yaxis: {
//         show: false,
//         labels: {
//           show: false,
//         },
//         axisBorder: {
//           show: false,
//         },
//         axisTicks: {
//           show: false,
//         },
//         crosshairs: {
//           show: false,
//         },
//         tooltip: {
//           enabled: false,
//         },
//         min: 0,
//         max: 100,
//       },
//       tooltip: {
//         followCursor: false,
//         style: {
//           fontSize: "14px",
//         },
//         fixed: {
//           enabled: true,
//           position: "topRight",
//           offsetX: 0,
//           offsetY: 0,
//         },
//       },
//     };

//     function calculateTheDiameter(data) {
//       console.log(data / 100);
//       return data / 100;
//     }
//     const series = [
//       {
//         name: "Himalaya",
//         data: [69.61, 65, 70, 45, 50, 55, 58, 63, 55, 58, 55, 60],
//       },
//       {
//         name: "Lux",
//         data: [58.72, 65, 70, 45, 40, 55, 58, 60, 62, 58, 56, 64],
//       },
//       {
//         name: "Palmolive",
//         data: [49.34, 63, 60, 55, 40, 55, 58, 65, 70, 66, 55, 60],
//       },
//       {
//         name: "Parachute",
//         data: [50.23, 55, 70, 45, 60, 55, 58, 63, 65, 70, 57, 60],
//       },
//       {
//         name: "Pears",
//         data: [64.68, 60, 70, 75, 80, 85, 58, 53, 56, 60, 62, 61],
//       },
//       {
//         name: "Vaseline",
//         data: [61.17, 65, 70, 78, 58, 52, 58, 59, 61, 64, 54, 52],
//       },
//       {
//         name: "69.84681446",
//         data: [69.61, 71, 75, 78, 84, 85, 55, 58, 61, 58, 57, 58],
//       },
//       {
//         name: "Dabur",
//         data: [69.36, 65, 70, 45, 50, 55, 53, 56, 60, 63, 62, 60],
//       },
//     ];

//     return (
//       <div className="bubble-chart">
//         <Chart options={options} series={series} type="line" />
//       </div>
//     );
//   }
// }

// export default TrendChart;

// import React, { Component } from "react";
// import Chart from "react-apexcharts";

// import "../../assets/mixins/mixins.scss";
// import "./TrendChart.scss";

// class TrendChart extends Component {
//   constructor(props) {
//     super(props);

//     const { dqScoreValue, chartType = '' } = props;

//     // Get all unique brands
//     const allBrands = [...new Set(dqScoreValue.map(item => item.Brand_Name))];

//     // Prepare series data for each brand
//     const seriesData = allBrands.map(brand => {
//       const brandData = dqScoreValue.filter(item => item.Brand_Name === brand);

//       console.log(brandData, "brandData");

//       // Prepare data for Ecom/Brand Perf/Perf/DQ based on chartType
//       let data;
//       switch (chartType) {
//         case 'Ecom':
//           data = brandData.map(item => ({ x: brand, y: item.Ecom }));
//           break;
//         case 'Brand Perf':
//           data = brandData.map(item => ({ x: brand, y: item.Brand_Perf }));
//           break;
//         case 'Perf':
//           data = brandData.map(item => ({ x: brand, y: item.Perf }));
//           break;
//         case 'Overall_Final_Score':
//           data = brandData.map(item => ({ x: brand, y: item.Overall_Final_Score }));
//           break;
//         default:
//           data = [];
//       }

//       console.log(data, "data");

//       return {
//         name: brand,
//         data: data,
//       };
//     });
//     console.log('series', seriesData);

//     this.state = {
//       options: {
//         chart: {
//           height: 450,
//           type: "bar",
//         },
//         dataLabels: {
//           enabled: true,
//         },
//         title: {
//           text: "",
//         },
//         grid: {
//           show: true,
//         },
//         legend: {
//           show: true,
//         },
//         xaxis: {
//           type: 'category',
//           labels: {
//             show: true,
//             rotate: -45, // Optional: Rotate labels if needed
//           },
//         },
//         yaxis: {
//           labels: {
//             show: true,
//           },
//         },
//         tooltip: {
//           followCursor: false,
//           style: {
//             fontSize: "14px",
//           },
//           fixed: {
//             enabled: true,
//             position: "topRight",
//             offsetX: 0,
//             offsetY: 0,
//           },
//         },
//       },
//       series: seriesData,
//     };
//   }

//   render() {
//     return (
//       <div className="bar-chart">
//         {this.state?.series?.length > 0 ? (
//           <Chart options={this.state?.options} series={this.state?.series} type="bar" />
//         ) : (
//           <p>No data available to display.</p>
//         )}
//       </div>
//     );
//   }
// }

// export default TrendChart;

import React, { Component } from "react";
import Chart from "react-apexcharts";

import "../../assets/mixins/mixins.scss";
import "./TrendChart.scss";

class TrendChart extends Component {
  constructor(props) {
    super(props);

    const { dqScoreValue, chartType = '' } = props;

    // Get all unique brands and aggregate data for them
    const aggregatedData = dqScoreValue.reduce((acc, item) => {
      const brand = item.Brand_Name;
      let value;

      switch (chartType) {
        case 'Ecom':
          value = item.Ecom;
          break;
        case 'Brand Perf':
          value = item.Brand_Perf;
          break;
        case 'Perf':
          value = item.Perf;
          break;
        case 'Overall_Final_Score':
          value = item.Overall_Final_Score;
          break;
        default:
          value = 0;
      }

      // Check if the brand already exists in the accumulator
      if (acc[brand]) {
        // Average the values if brand already exists
        acc[brand].y = (acc[brand].y + value) / 2;
      } else {
        acc[brand] = { x: brand, y: value };
      }

      return acc;
    }, {});

    // Convert aggregated data to an array
    const seriesData = Object.values(aggregatedData);

    this.state = {
      options: {
        chart: {
          height: 450,
          type: "bar",
        },
        dataLabels: {
          enabled: true,
        },
        title: {
          text: "",
        },
        grid: {
          show: true,
        },
        legend: {
          show: true,
        },
        xaxis: {
          type: 'category',
          labels: {
            show: true,
            rotate: -45, 
          },
          style: {
            fontSize: '10px', // Adjust font size if needed
            colors: ['#000'], // Adjust color if needed
          },
        },
        yaxis: {
          labels: {
            show: true,
          
          },
       
        },
        tooltip: {
          followCursor: false,
          style: {
            fontSize: "14px",
          },
          fixed: {
            enabled: true,
            position: "topRight",
            offsetX: 0,
            offsetY: 0,
          },
        },
      },
      series: [
        {
          name: chartType,
          data: seriesData,
        },
      ],
    };
  }

  render() {
    return (
      <div className="bar-chart">
        {this.state?.series?.length > 0 ? (
          <Chart options={this.state?.options} series={this.state?.series} type="bar" />
        ) : (
          <p>No data available to display.</p>
        )}
      </div>
    );
  }
}

export default TrendChart;



