import Chart from "react-apexcharts";

import "./AreaChart.scss";
const options = {
  xaxis: {
    show: false,
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
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
    max: 100,
    show: false,
  },
  grid: {
    show: false,
  },
  legend: {
    show: false,
  },
};
const series = [
  {
    name: "series-1",
    data: [
      69.61166879, 58.72804392, 49.34048354, 50.23659889, 64.6882469,
      61.17377378, 69.84681446, 69.36505259,
    ],
  },
  // {
  //   name: "series-2",
  //   data: [23, 12, 54, 61, 32, 56, 81, 19],
  // },
  // {
  //   name: "series-3",
  //   data: [24, 20, 5, 75, 42, 79, 72, 35],
  // },
];
// const options = {
//   chart: {
//     height: 350,
//     type: "area",
//   },
//   dataLabels: {
//     enabled: false,
//   },
//   stroke: {
//     curve: "smooth",
//   },
//   fill: {
//     opacity: 1.0,
//   },
//   title: {
//     text: "",
//   },
//   xaxis: {
//     type: "category",
//     categories: [
//       "Himalaya",
//       "Lux",
//       "Palmolive",
//       "Parachute",
//       "Pears",
//       "Vaseline",
//       "Bajaj",
//       "Dabur",
//     ],
//   },

//   yaxis: {
//     max: 100,
//   },
// };

// const series = [
//   {
//     name: "series1",
//     data: [
//       69.61166879, 58.72804392, 49.34048354, 50.23659889, 64.6882469,
//       61.17377378, 69.84681446, 69.36505259,
//     ],
//   },
// ];

export default function App() {
  return (
    <div className="App">
      <div className="area-chart-filter">
        <select name="Metrics" className="Select-filter-metrics">
          <option value="Select Metrics">Select Metrics</option>
          <option value="haircare">Ecom</option>
          <option value="baby">Social</option>
          <option value="mansGrooming">Paid</option>
        </select>
      </div>
      <Chart options={options} series={series} type="area" />
    </div>
  );
}
