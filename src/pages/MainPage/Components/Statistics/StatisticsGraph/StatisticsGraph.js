import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const StatisticsGraph = ({ dep_chart, reg_chart, signalGraph }) => {
  useEffect(() => {
    setChartData({
      series: [
        {
          name: "Регистрации",
          data: reg_chart[1],
        },
        {
          name: "Депозиты",
          data: dep_chart[1],
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
        xaxis: {
          categories: dep_chart[0],
        },
      },
    });
  }, [signalGraph]);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Регистрации",
        data: reg_chart[1],
      },
      {
        name: "Депозиты",
        data: dep_chart[1],
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
      xaxis: {
        categories: dep_chart[0],
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
