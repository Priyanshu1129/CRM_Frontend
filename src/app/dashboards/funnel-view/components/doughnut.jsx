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
          "rgba(0, 102, 255, 0.6)", // Lead (primary color with transparency)
          "rgba(0, 143, 179, 0.6)", // Prospect (teal-like color for variety)
          "rgba(102, 153, 255, 0.6)", // Qualification (lighter primary shade)
          "rgba(255, 194, 102, 0.6)", // Proposal (warm accent for contrast)
          "rgba(153, 204, 255, 0.6)", // Followup (soft blue-gray for subtlety)
          "rgba(255, 132, 102, 0.6)", // Closing (muted coral for energy)
        ],
        borderColor: [
          "rgba(0, 102, 255, 1)", // Lead (primary color)
          "rgba(0, 143, 179, 1)", // Prospect (teal-like color)
          "rgba(102, 153, 255, 1)", // Qualification (lighter primary shade)
          "rgba(255, 194, 102, 1)", // Proposal (warm accent)
          "rgba(153, 204, 255, 1)", // Followup (soft blue-gray)
          "rgba(255, 132, 102, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const colors = [
    "rgba(0, 102, 255, 0.6)", // Lead (primary color with transparency)
    "rgba(0, 143, 179, 0.6)", // Prospect (teal-like color for variety)
    "rgba(102, 153, 255, 0.6)", // Qualification (lighter primary shade)
    "rgba(255, 194, 102, 0.6)", // Proposal (warm accent for contrast)
    "rgba(153, 204, 255, 0.6)", // Followup (soft blue-gray for subtlety)
    "rgba(255, 132, 102, 0.6)", // Closing (muted coral for energy)
  ];

  const borderColors = [
    "rgba(0, 102, 255, 1)", // Lead (primary color)
    "rgba(0, 143, 179, 1)", // Prospect (teal-like color)
    "rgba(102, 153, 255, 1)", // Qualification (lighter primary shade)
    "rgba(255, 194, 102, 1)", // Proposal (warm accent)
    "rgba(153, 204, 255, 1)", // Followup (soft blue-gray)
    "rgba(255, 132, 102, 1)", // Closing (muted coral)
  ];
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
      datalabels: {
        color: "#fff", // Label text color
        font: {
          size: 14, // Font size for the labels
        },
        formatter: (value) => value, // Display raw data as labels
      },
    },
  };

  return (
    <Card bordered={true} style={{ height: "100%" }}>
      <ChartComponent chartData={chartData} options={options} type="pie" />
    </Card>
  );
};
