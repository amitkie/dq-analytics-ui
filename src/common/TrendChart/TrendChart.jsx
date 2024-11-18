import React, { Component } from "react";
import Chart from "react-apexcharts";
import "../../assets/mixins/mixins.scss";
import "./TrendChart.scss";

class TrendChart extends Component {
  constructor(props) {
    super(props);

    const { dqScoreValue, chartType = '', colorFill = '', scoreRange = [0, 100] } = props;
    const [minScore, maxScore] = scoreRange;
 
    // const aggregatedData = dqScoreValue.reduce((acc, item) => {
    //   const brand = item.Brand_Name;
    //   let value;
  
       
    //   switch (chartType) {
    //     case 'Marketplace':
    //       value = item.Marketplace;
    //       break;
    //     case 'Socialwatch':
    //       value = item.Socialwatch;
    //       break;
    //     case 'Digital Spends':
    //       value = item['Digital Spends'];
    //       break;
    //     case 'Organic Performance':
    //       value = item['Organic Performance'];
    //       break;
    //     case 'Overall_Final_Score':
    //       value = item.Overall_Final_Score;
    //       break;
    //     default:
    //       value = 0;
    //   }
  
       
    //   if (value >= minScore && value <= maxScore) {
    //     acc[brand] = { x: brand, y: parseFloat(value.toFixed(2)) };
    //   }
    //   return acc;
    // }, {});
  
     
    // const seriesData = Object.values(aggregatedData);

    // this.state = {
    //   dqScoreValue: dqScoreValue || [],
    //   chartType,
    //   colorFill,
    //   scoreRange: [minScore, maxScore],
    //   options: {
    //     chart: {
    //       height: 450,
    //       type: "bar",
    //     },
    //     fill: {
    //       colors: [props.colorFill || "#0d47a0"],  
    //     },
    //     dataLabels: {
    //       enabled: true,
    //       offsetY: -20,
    //       style: {
    //         fontSize: '12px',
    //         colors: ["#304758"],
    //       }
    //     },
    //     plotOptions: {
    //       bar: {
    //         borderRadius: 2,
    //         dataLabels: {
    //           position: 'top',
    //         },
    //       }
    //     },
    //     title: {
    //       text: "",
    //     },
    //     grid: {
    //       show: false,
    //     },
    //     legend: {
    //       show: false,
    //     },
    //     xaxis: {
    //       type: 'category',
    //       labels: {
    //         show: true,
    //         rotate: -45,
    //         style: {
    //           fontSize: '10px',
    //           colors: ['#000'],
    //         },
    //       },
    //     },
    //     yaxis: {
    //       labels: {
    //         show: true,
    //       },
    //     },
    //     tooltip: {
    //       followCursor: false,
    //       style: {
    //         fontSize: "14px",
    //       },
    //       fixed: {
    //         enabled: true,
    //         position: "topRight",
    //         offsetX: 0,
    //         offsetY: 0,
    //       },
    //     },
        
    //   },
    //   series: [
    //     {
    //       name: chartType,
          
    //       data: seriesData,
    //     },
    //   ],
    // };
    this.state = {
      dqScoreValue: dqScoreValue || [],
      chartType,
      colorFill,
      scoreRange: [minScore, maxScore],
      options: {
        chart: {
          height: 450,
          type: "bar",
        },
        fill: {
          colors: [colorFill || "#0d47a0"],
        },
        dataLabels: {
          enabled: true,
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"],
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 2,
            dataLabels: {
              position: 'top',
            },
          },
        },
        xaxis: {
          type: 'category',
          labels: {
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
        },
      },
      series: [],
    };
     
  }

 
  // componentDidUpdate(prevProps) {
  //   if (prevProps.colorFill !== this.props.colorFill) {
  //     this.setState({
  //       options: {
  //         ...this.state.options,
  //         fill: {
  //           colors: [this.props.colorFill],
  //         },
  //       },
  //     });
  //   }
  // }

  componentDidMount() {
    this.updateSeriesData();
}

componentDidUpdate(prevProps, prevState) {
    if (prevProps.dqScoreValue !== this.props.dqScoreValue || prevProps.chartType !== this.props.chartType) {
    this.setState({ dqScoreValue: this.props.dqScoreValue, chartType: this.props.chartType }, this.updateSeriesData);
    }

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

    if (prevState.scoreRange !== this.state.scoreRange) {
    this.updateSeriesData();
    }
}

updateSeriesData = () => {
    const { dqScoreValue, chartType, scoreRange } = this.state;
    const [minScore, maxScore] = scoreRange;

    // Aggregate data based on the selected chartType
    const aggregatedData = dqScoreValue.reduce((acc, item) => {
    const brand = item.Brand_Name;
    let value;

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

    // Apply the score range filter
    if (value >= minScore && value <= maxScore) {
        acc[brand] = { x: brand, y: parseFloat(value.toFixed(2)) };
    }
    return acc;
    }, {});

    // Convert aggregated data to an array for ApexCharts
    const newSeriesData = Object.values(aggregatedData);

    // Update the series state
    this.setState({
    series: [
        {
        name: chartType,
        data: newSeriesData,
        },
    ],
    });
};

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


