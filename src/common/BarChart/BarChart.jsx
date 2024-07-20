import React, { Component } from "react";
import Chart from "react-apexcharts";

import "./BarChart.scss";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "bar",
          redrawOnWindowResize: true,
        },
        plotOptions: {
          bar: {
            borderRadius: 1,
            borderRadiusApplication: "end",
            horizontal: true,
          },
        },
        grid: {
          show: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: [
            "Himalaya",
            "Lux",
            "Palmolive",
            "Parachute",
            "Pears",
            "Vaseline",
            "Bajaj",
            "Dabur",
          ],
        },
        yaxis: {
          title: {
            text: undefined,
          },
          min: 0,
          max: 100,
        },
      },
      series: [
        {
          name: "DQ Scores",
          data: [
            69.61166879, 58.72804392, 49.34048354, 50.23659889, 64.6882469,
            61.17377378, 69.84681446, 69.36505259,
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <select name="Metrics" className="Select-filter-metrics">
              <option value="Select Metrics">Select Metrics</option>
              <option value="haircare">Ecom</option>
              <option value="baby">Social</option>
              <option value="mansGrooming">Paid</option>
            </select>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default BarChart;
