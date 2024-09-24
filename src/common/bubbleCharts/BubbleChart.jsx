// import React, { Component } from "react";
// import Chart from "react-apexcharts";
// import "../../assets/mixins/mixins.scss";
// import "./BubbleChart.scss";

// class BubbleChart extends Component {
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
//           show: false,
//         },
//         axisBorder: {
//           show: false,
//         },
//         min: 0,
//         max: 100,
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
//       // console.log(data / 100);
//       return data / 100;
//     }
//     const series = [
//       {
//         name: "Himalaya",
//         data: [[69.61, 69, calculateTheDiameter(69.61)]],
//       },
//       {
//         name: "Lux",
//         data: [[58.72, 58, calculateTheDiameter(58.72)]],
//       },
//       {
//         name: "Palmolive",
//         data: [[49.34, 49, calculateTheDiameter(49.34)]],
//       },
//       {
//         name: "Parachute",
//         data: [[50.23, 50, calculateTheDiameter(69.61)]],
//       },
//       {
//         name: "Pears",
//         data: [[64.68, 64, calculateTheDiameter(58.72)]],
//       },
//       {
//         name: "Vaseline",
//         data: [[61.17, 61, calculateTheDiameter(49.34)]],
//       },
//       {
//         name: "69.84681446",
//         data: [[69.61, 69, calculateTheDiameter(69.61)]],
//       },
//       {
//         name: "Dabur",
//         data: [[69.36, 30, calculateTheDiameter(58.72)]],
//       },
//     ];
//     return (
//       <div className="bubble-chart">
//         <Chart options={options} series={series} type="bubble" />
//       </div>
//     );
//   }
// }

// export default BubbleChart;
import React, { Component } from "react";
import Chart from "react-apexcharts";
import "../../assets/mixins/mixins.scss";
import "./BubbleChart.scss";

class BubbleChart extends Component {
  constructor(props) {
    super(props);

    // Extract brand names and scores based on the selected score type from the API response
    const { insightsDQScoreData, scoreType } = this.props;

    const brandNames = insightsDQScoreData?.brands?.map((brand) => brand.brand_name) || [];
    const overallScores = insightsDQScoreData?.brands?.map((brand) => brand?.dq_score[scoreType] || 0) || [];

    this.state = {
      options: {
        chart: {
          type: "bar",
          height: 450,
        },
        title: {
          text: `${scoreType.replace(/_/g, ' ')} Scores`, // Update title dynamically based on score type
          align: "center",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
          },
        },
        xaxis: {
          categories: brandNames, // X-axis labels (brand names)
          title: {
            text: "Brands",
          },
        },
        yaxis: {
          title: {
            text: "Score",
          },
          min: 0,
          max: 100, // Assuming scores are percentages out of 100
        },
        fill: {
          colors: ["#1E90FF"], // Bar color
        },
        dataLabels: {
          enabled: true,
        },
      },
      series: [
        {
          name: scoreType.replace(/_/g, ' '), // Update series name dynamically based on score type
          data: overallScores, // Y-axis values
        },
      ],
    };
  }

  render() {
    // Check if there are no data points to display
    const { series } = this.state;
    const hasData = series[0].data.length > 0 && series[0].data.some(score => score > 0);

    return (
      <div className="bar-chart">
        {hasData ? (
          <Chart options={this.state.options} series={this.state.series} type="bar" height={450} />
        ) : (
          <div className="empty-chart">
            <p>No data available for {this.state.options.title.text}</p>
          </div>
        )}
      </div>
    );
  }
}

export default BubbleChart;

