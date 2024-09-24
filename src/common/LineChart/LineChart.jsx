import React, { Component } from "react";
import Chart from "react-apexcharts";
import "../../assets/mixins/mixins.scss";
import "./LineChart.scss";

class LineChart extends Component {
  constructor(props) {
    super(props);

    // Extracting project names and corresponding scores for each project
    const { insightsDQScoreData, scoreType } = this.props;

    // Assuming insightsDQScoreData is an array of multiple project data
    const projects = insightsDQScoreData?.map(project => {
      return {
        name: project?.project_name || 'Unnamed Project',
        brands: project?.brands?.map(brand => ({
          brandName: brand.brand_name,
          score: brand.dq_score[scoreType] || 0,
        }))
      };
    }) || [];

    const series = projects.map((project, index) => ({
      name: project.name, // Project name
      data: project.brands.map(brand => brand.score), // Y-axis values for each brand
    }));

    const brandNames = projects.length > 0 ? projects[0].brands.map(brand => brand.brandName) : [];

    this.state = {
      options: {
        chart: {
          type: "line",
          height: 450,
        },
        title: {
          text: `${scoreType.replace(/_/g, ' ')} Scores Comparison`, // Dynamic title
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
          max: 100, // Assuming scores are out of 100
        },
        colors: ['#1E90FF', '#FF6347', '#32CD32', '#FFA500', '#800080'], // Color for each project
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
      },
      series: series, // Y-axis values for each project
    };
  }

  render() {
    // Check if there are no data points to display
    const { series } = this.state;
    const hasData = series.some(s => s.data.length > 0 && s.data.some(score => score > 0));

    return (
      <div className="line-chart">
        {hasData ? (
          <Chart options={this.state.options} series={this.state.series} type="line" height={450} />
        ) : (
          <div className="empty-chart">
            <p>No data available for {this.state.options.title.text}</p>
          </div>
        )}
      </div>
    );
  }
}

export default LineChart;
