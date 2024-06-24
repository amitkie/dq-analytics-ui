import React, { Component } from "react";
import Chart from "react-apexcharts";

class BubbleChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const options = {
      chart: {
        height: 350,
        type: "bubble",
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1.0,
      },
      title: {
        text: "",
      },
      xaxis: {
        tickAmount: 12,
        type: "category",
        min: 20,
        max: 90,
      },
      yaxis: {
        max: 80,
      },
    };

    function calculateTheDiameter(data){
      console.log(data/100);
      return (data/100);
    }

    const series = [
      // {
      //   name: "A",
      //   data: [[30, 10, 0.2]],
      // },
      // { name: "B", data: [[30, 15, 0.29]] },
      // { name: "C", data: [[30, 20, 0.29]] },
      // { name: "E", data: [[40, 50, 0.45]] },
      // { name: "F", data: [[30, 20, 0.67]] },
      // { name: "D", data: [[30, 30, 0.29]] },
      // { name: "G", data: [[80, 10, 0.83]] },

      {
  
        name: "Himalaya",
        data: [[69.61166879, 15, calculateTheDiameter(69.61166879)]]
        // "Ecom DQ Score": 69.28028546,
        // "Social DQ Score": 69.66248012,
        // "Paid Marketing DQ Score": 75.05304132,
        // "Organic DQ": 44,
      },
      {
      
        name: "Lux",
        data: [[58.72804392, 25, calculateTheDiameter(58.72804392)]],
        // "Ecom DQ Score": 62.00079101,
        // "Social DQ Score": 32.02953563,
        // "Paid Marketing DQ Score": 62.86860453,
        // "Organic DQ": 71,
      },
      {
      
        name: "Palmolive",
        data: [[49.34048354, 35, calculateTheDiameter(49.34048354)]],
        // "Ecom DQ Score": 53.63701638,
        // "Social DQ Score": 32.6341108,
        // "Paid Marketing DQ Score": 51.62416223,
        // "Organic DQ": 45,
      },
    ];
    return (
      <div className="bubble-chart">
        <Chart options={options} series={series} type="bubble" />
      </div>
    );
  }
}

export default BubbleChart;
