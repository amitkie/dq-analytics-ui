// import React, { Component } from "react";
// import Chart from "react-apexcharts";

// import "../../assets/mixins/mixins.scss";
// import "./TrendChart.scss";

// class TrendChart extends Component {
//   constructor(props) {
//     super(props);

//     const { dqScoreValue, chartType = '' } = props;

//     // Get all unique brands and aggregate data for them
//     const aggregatedData = dqScoreValue.reduce((acc, item) => {
//       const brand = item.Brand_Name;
//       let value;

//       switch (chartType) {
//         case 'Marketplace':
//           value = item.Marketplace;
//           break;
//         case 'Socialwatch':
//           value = item.Socialwatch;
//           break;
//         case 'Digital Spends':
//           value = item['Digital Spends'];
//           break;
//         case 'Organic Performance':
//           value = item['Organic Performance'];
//           break;
//         case 'Overall_Final_Score':
//           value = item.Overall_Final_Score;
//           break;
//         default:
//           value = 0;
//       }

//       // Check if the brand already exists in the accumulator
//       if (acc[brand]) {
//         // Average the values if brand already exists
//         // acc[brand].y = (acc[brand].y + (value)?.toFixed) / 2;
//         acc[brand] = { x: brand, y: (value)?.toFixed(2) };

//       } else {
//         acc[brand] = { x: brand, y: (value)?.toFixed(2) };
//       }

//       return acc;
//     }, {});
//     console.log(aggregatedData, 'aggregatedData')

//     // Convert aggregated data to an array
//     const seriesData = Object.values(aggregatedData);

//     this.state = {
//       options: {
//         chart: {
//           height: 450,
//           type: "bar",
//         },

//         dataLabels: {
//           enabled: true,
//           // formatter: function (val) {
//           //   return val + "%";
//           // },
//           offsetY: -20,
//           style: {
//             fontSize: '12px',
//             colors: ["#304758"]
//           }
//         },
//         // dataLabels: {
//         //   enabled: true,
//         //   offsetY: -10,
//         //   style: {
//         //     fontSize: '12px',
//         //     colors: "#304758",
//         //   }
//         // },
//         plotOptions: {
//           bar: {
//             borderRadius: 2,
//             dataLabels: {
//               position: 'top', // top, center, bottom
//             },
            
//           }
//         },
//         title: {
//           text: "",
//         },
//         grid: {
//           show: false,
//         },
//         legend: {
//           show: false,
//         },
//         xaxis: {
//           type: 'category',
//           labels: {
//             show: true,
//             rotate: -45, 
//           },
//           style: {
//             fontSize: '10px', // Adjust font size if needed
//             colors: ['#000'], // Adjust color if needed
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
//       series: [
//         {
//           name: chartType,
//           data: seriesData,
//         },
//       ],
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

    const { dqScoreValue, chartType = '', colorFill = '', scoreRange = [0, 100] } = props;
    const [minScore, maxScore] = scoreRange;
    
    console.log(scoreRange, "scorerange");

    // Aggregate data for each brand and apply the score range filter
    const aggregatedData = dqScoreValue.reduce((acc, item) => {
      const brand = item.Brand_Name;
      let value;

      // Select the appropriate data field based on chartType
      switch (chartType) {
        case 'Marketplace':
          value = item.Marketplace;
          break;
        case 'Socialwatch':
          value = item.Socialwatch;
          break;
        case 'Digital Spends':
          value = item['Digital Spends'];
          break;
        case 'Organic Performance':
          value = item['Organic Performance'];
          break;
        case 'Overall_Final_Score':
          value = item.Overall_Final_Score;
          break;
        default:
          value = 0;
      }

      // Apply the range filter
      if (value >= minScore && value <= maxScore) {
        acc[brand] = { x: brand, y: parseFloat(value.toFixed(2)) };
      }
      console.log(acc, 'vavavdvd')
      console.log(`Brand: ${brand}, Value: ${value}, Min: ${minScore}, Max: ${maxScore}`);
      return acc;
    }, {});
  
    // Convert aggregated data to an array for ApexCharts
    const seriesData = Object.values(aggregatedData);
 
    this.state = {
      options: {
        chart: {
          height: 450,
          type: "bar",
        },
        fill: {
          colors: [props.colorFill || "#0d47a0"], // use colorFill prop here
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"],
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 2,
            dataLabels: {
              position: 'top',
            },
          }
        },
        title: {
          text: "",
        },
        grid: {
          show: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          type: 'category',
          labels: {
            show: true,
            rotate: -45,
            style: {
              fontSize: '10px',
              colors: ['#000'],
            },
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

  
  componentDidUpdate(prevProps) {
    if (prevProps.colorFill !== this.props.colorFill) {
      this.setState({
        options: {
          ...this.state.options,
          fill: {
            colors: [this.props.colorFill],
          },
        },
      });
    }
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


