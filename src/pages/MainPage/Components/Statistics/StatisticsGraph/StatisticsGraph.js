import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const StatisticsGraph = ({ dep_chart, reg_chart }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Депозиты",
        data: dep_chart[1],
      },
      {
        name: "Регистрации",
        data: reg_chart[1],
      },
    ],
    options: {
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
    },
  });
  const data = [
    { x: "02.04.2023", y: 10 },
    { x: "03.04.2023", y: 11 },
    { x: "04.04.2023", y: 12 },
    // Add more data points with dates as needed
  ];
  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={[{ data: data }]}
        type="area"
        height={350}
      />
    </div>
  );
};

export default StatisticsGraph;
