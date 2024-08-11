import React, { Component } from "react";
import Chart from "react-apexcharts";

import "../../assets/mixins/mixins.scss";
import "./TrendChart.scss";

class TrendChart extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const options = {
      chart: {
        height: 450,
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
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        show: false,
        labels: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
        min: 0,
        max: 12,
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "nov",
          "Dec",
        ],
      },
      yaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        min: 0,
        max: 100,
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
    };

    function calculateTheDiameter(data) {
      // console.log(data / 100);
      return data / 100;
    }
    const series = [
      {
        name: "Himalaya",
        data: [69.61166879, 65, 70, 45, 50, 55, 58, 63, 65, 70, 55, 60],
      },
      {
        name: "Lux",
        data: [58.72804392, 65, 70, 45, 40, 55, 58, 63, 65, 70, 55, 60],
      },
      {
        name: "Palmolive",
        data: [49.34048354, 63, 60, 55, 40, 55, 58, 63, 65, 70, 55, 60],
      },
      {
        name: "Parachute",
        data: [50.23659889, 55, 70, 45, 60, 55, 58, 63, 65, 70, 55, 60],
      },
      {
        name: "Pears",
        data: [64.6882469, 60, 70, 75, 80, 85, 58, 63, 65, 70, 55, 60],
      },
      {
        name: "Vaseline",
        data: [61.17377378, 65, 70, 78, 58, 52, 58, 63, 65, 70, 55, 60],
      },
      {
        name: "69.84681446",
        data: [69.61166879, 71, 75, 78, 84, 85, 58, 63, 65, 70, 55, 60],
      },
      {
        name: "Dabur",
        data: [69.36505259, 65, 70, 45, 50, 55, 58, 63, 65, 70, 55, 60],
      },
    ];

    return (
      <div className="bubble-chart">
        <Chart options={options} series={series} type="line" />
      </div>
    );
  }
}

export default TrendChart;
