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
          offsetX: 35,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 1,
            borderRadiusApplication: "end",
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          },
        },
        grid: {
          show: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: props.categories,
          labels: {
            formatter: (value) => value.toFixed(0), // Formatting x-axis labels
          },
        },
        yaxis: {
          title: {
            text: undefined,
          },
          min: 0,
          max: 100,
        },
      },
    };
  }

  render() {
    const { series } = this.props; // Series data passed as props

    return (
      <div className="bar-chart">
        <Chart options={this.state.options} series={series} type="bar" />
        {series.length === 0 && <div>{this.props.noDataText}</div>} {/* Show no data message */}
      </div>
    );
  }
}

export default BarChart;
