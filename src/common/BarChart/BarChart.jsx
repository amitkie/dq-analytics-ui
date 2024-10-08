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
        dataLabels: {
          
          position: 'top',
        },
        plotOptions: {
          bar: {
            borderRadius: 1,
            borderRadiusApplication: "end",
            horizontal: true,
          },
          dataLabels: {
            position: 'top',
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
            69.61, 58.72, 49.34, 50.23, 64.68,
            61.17, 69.84, 69.39,
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
