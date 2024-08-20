import React, { Component } from "react";
import Chart from "react-apexcharts";
import "../../assets/mixins/mixins.scss";
import "./BubbleChart.scss";

class BubbleChart extends Component {
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
          show: false,
        },
        axisBorder: {
          show: false,
        },
        min: 0,
        max: 100,
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
        data: [[69.61, 69, calculateTheDiameter(69.61)]],
      },
      {
        name: "Lux",
        data: [[58.72, 58, calculateTheDiameter(58.72)]],
      },
      {
        name: "Palmolive",
        data: [[49.34, 49, calculateTheDiameter(49.34)]],
      },
      {
        name: "Parachute",
        data: [[50.23, 50, calculateTheDiameter(69.61)]],
      },
      {
        name: "Pears",
        data: [[64.68, 64, calculateTheDiameter(58.72)]],
      },
      {
        name: "Vaseline",
        data: [[61.17, 61, calculateTheDiameter(49.34)]],
      },
      {
        name: "69.84681446",
        data: [[69.61, 69, calculateTheDiameter(69.61)]],
      },
      {
        name: "Dabur",
        data: [[69.36, 30, calculateTheDiameter(58.72)]],
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
