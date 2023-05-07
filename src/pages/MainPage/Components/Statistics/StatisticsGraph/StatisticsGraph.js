import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const StatisticsGraph = ({ dep_chart, reg_chart }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Депозиты",
        data: dep_chart,
      },
      {
        name: "Регистрации",
        data: reg_chart,
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

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default StatisticsGraph;
