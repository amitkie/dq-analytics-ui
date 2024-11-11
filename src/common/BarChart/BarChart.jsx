import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./BarChart.scss";

// This component is used for graphical view of Analytics 
const BarChart = ({ series, categories, noDataText }) => {
  const [options, setOptions] = useState({});

  useEffect(() => {
    const actualValues = series.flatMap((item) => item.data); // Flatten all series data

    const maxValue = Math.max(...actualValues);
    const minValue = Math.min(...actualValues);

    // Calculate the appropriate Y-axis scaling
    const yAxisMin = minValue - 50 > 0 ? minValue - 50 : 0;
    const yAxisMax = maxValue + 50;

    setOptions({
      chart: {
        id: "bar",
        redrawOnWindowResize: true,
      },
      dataLabels: {
        enabled: true,
        offsetX: 10,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
        formatter: (val, opts) => {
          // return `${val.toFixed(0)}` 
          return `` 
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          dataLabels: {
            position: "top",
          },
        },
      },
      grid: {
        show: true,
      },
      legend: {
        show: true,  
      },
      xaxis: {
        categories: [''],  // Categories are the brand names
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        title: {
          text: "Actual Value",
        },
        min: yAxisMin,
        max: yAxisMax,
      },
    });
  }, [series, categories]);

  return (
    <div className="bar-chart">
      <Chart options={options} series={series} type="bar" height={350} />
      {series.length === 0 && <div>{noDataText}</div>}
    </div>
  );
};

export default BarChart;
