import Chart from "react-apexcharts";

import "./AreaChart.scss";

const options = {
  chart: {
    height: 350,
    type: "area",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  fill: {
    opacity: 1.0,
  },
  title: {
    text: "",
  },
  xaxis: {
    tickAmount: 12,
    type: "category",
    min: 20,
    max: 90,
  },
  yaxis: {
    max: 80,
  },
};

const series = [
  {
    name: "A",
    data: [[30, 10, 5]],
  },
  { name: "B", data: [[30, 15, 5]] },
  { name: "C", data: [[30, 20, 5]] },
  { name: "E", data: [[40, 50, 8]] },
  { name: "F", data: [[30, 20, 7]] },
  { name: "D", data: [[30, 30, 5]] },
  { name: "G", data: [[80, 10, 5]] },
];

export default function App() {
  return (
    <div className="App">
      <Chart options={options} series={series} type="area" />
    </div>
  );
}
