import React, { useEffect, useState } from "react";
import { Text } from "@/components";
import { Card, Space } from "antd";
import { ChartComponent } from "../../components";

export const Doughnut = ({ funnelStats }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const labels = Object.keys(funnelStats); // Get the keys as labels
    const data = Object.values(funnelStats); // Get the values as data

    setChartData((prevData) => ({
      ...prevData,
      labels: labels,
      datasets: [
        {
          ...prevData.datasets[0],
          data: data, // Use the data from the server
        },
      ],
    }));
  }, [funnelStats]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} items`; // Display raw data in tooltip
          },
        },
      },
    },
  };

  return (
    <Card style={{ textAlign: "center" }} bordered={true}>
      <ChartComponent chartData={chartData} options={options} type="doughnut" />
      <Space style={{ marginTop: "5px" }}>
        <Text style={{ userSelect: "none" }}>Bubble chart</Text>
      </Space>
    </Card>
  );
};
