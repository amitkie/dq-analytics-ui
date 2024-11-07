
// import React, { Component } from "react";
// import Chart from "react-apexcharts";
// import "../../assets/mixins/mixins.scss";
// import "./LineChart.scss";

// class LineChart extends Component {
//   constructor(props) {
//     super(props);

//     const { insightsDQScoreData, scoreType } = this.props;

//     // Transforming the data to extract projects with brand names and corresponding scores for the chosen scoreType
//     const projects = insightsDQScoreData?.map(project => ({
//       name: `Project ${project.project_name}`,
//       brands: project.brands.map(brand => ({
//         brandName: brand.brand_name,
//         score: brand.dq_score[scoreType]?.toFixed(2) || 0,
//       }))
//     })) || [];

//     // Construct series data for each project
//     const series = projects.map(project => ({
//       name: project.name, // Project name
//       data: project.brands.map(brand => brand.score), // Scores for each brand
//     }));

//     // Assuming all projects contain the same brands, we use the first project’s brand names for the x-axis
//     const brandNames = projects.length > 0 ? projects[0].brands.map(brand => brand.brandName) : [];

//     this.state = {
//       options: {
//         chart: {
//           type: "line",
//           height: 450,
//         },
//         title: {
//           text: `${scoreType.replace(/_/g, ' ')} Scores Comparison`, // Dynamic title
//           align: "center",
//           style: {
//             fontSize: "16px",
//             fontWeight: "bold",
//           },
//         },
//         xaxis: {
//           categories: brandNames, // X-axis labels (brand names)
//           title: {
//             text: "Brands",
//           },
//         },
//         yaxis: {
//           title: {
//             text: "Score",
//           },
//           min: 0,
//           max: 100, // Assuming scores are out of 100
//         },
//         colors: ['#1E90FF', '#FF6347', '#32CD32', '#FFA500', '#800080'], // Color for each project
//         stroke: {
//           curve: 'smooth',
//         },
//         dataLabels: {
//           enabled: true,
//         },
//         legend: {
//           position: 'top',
//           horizontalAlign: 'right',
//         },
//       },
//       series: series, // Y-axis values for each project
//     };
//   }

//   render() {
//     // Check if there are no data points to display
//     const { series } = this.state;
//     const hasData = series.some(s => s.data.length > 0 && s.data.some(score => score > 0));

//     return (
//       <div className="line-chart">
//         {hasData ? (
//           <Chart options={this.state.options} series={this.state.series} type="line" height={450} />
//         ) : (
//           <div className="empty-chart">
//             <p className="no-data">No data available for {this.state.options.title.text}</p>
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default LineChart;


import React, { Component } from "react";
import Chart from "react-apexcharts";
import "../../assets/mixins/mixins.scss";
import "./LineChart.scss";

class LineChart extends Component {
  constructor(props) {
    super(props);

    const { insightsDQScoreData, scoreType } = this.props;

    // Step 1: Collect unique brand names from all projects
    const allBrandNames = Array.from(new Set(
      insightsDQScoreData.flatMap(project =>
        project.brands.map(brand => brand.brand_name)
      )
    ));

    // Step 2: Transform data to align each project’s scores with the complete list of brand names
    const projects = insightsDQScoreData?.map(project => ({
      name: `Project ${project.project_name}`,
      brands: allBrandNames.map(brandName => {
        // Find the brand's score in the current project
        const brand = project.brands.find(b => b.brand_name === brandName);
        return {
          brandName,
          score: brand ? brand.dq_score[scoreType]?.toFixed(2) || 0 : 0, // Use 0 if the brand is not found
        };
      })
    })) || [];

    // Step 3: Construct series data for each project
    const series = projects.map(project => ({
      name: project.name, // Project name
      data: project.brands.map(brand => brand.score), // Scores for each brand
    }));

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
          categories: allBrandNames, // X-axis labels (all brand names)
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
    const { series } = this.state;
    const hasData = series.some(s => s.data.length > 0 && s.data.some(score => score > 0));

    return (
      <div className="line-chart">
        {hasData ? (
          <Chart options={this.state.options} series={this.state.series} type="line" height={450} />
        ) : (
          <div className="empty-chart">
            <p className="no-data">No data available for {this.state.options.title.text}</p>
          </div>
        )}
      </div>
    );
  }
}

export default LineChart;


