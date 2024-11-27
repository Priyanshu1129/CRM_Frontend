import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { ChartComponent } from "../../components";

export const Doughnut = ({ funnelStats }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          // "rgb(255, 205, 105, 0.7)", // Lead
          // "rgba(255, 166, 70, 0.7)", // Prospect
          // "rgba(248, 96, 65, 0.7)",  // Qualification
          // "rgb(211, 37, 39, 0.7)",   // Proposal
          // "rgba(229, 39, 114, 0.7)", // Followup
          // "rgb(110, 8, 63, 0.7)",    // Closing
          // "rgba(255, 87, 51, 0.6)",
          // "rgba(51, 255, 87, 0.6)",
          // "rgba(51, 87, 255, 0.6)",
          // "rgba(255, 51, 161, 0.6)",
          // "rgba(255, 215, 51, 0.6)",
          // "rgba(140, 51, 255, 0.6)",
          "rgb(0, 91, 127, 0.9)",
          "rgb(5,75,168, 0.9)",
          "rgb(24,141,175, 0.9)",
          "rgb(8,154,161, 0.9)",
          "rgb(5,211,155, 0.9)",
          "rgb(36, 160, 96, 0.9)",
        ],
        borderColor: [
          // "rgb(255, 205, 105, 1)", // Lead
          // "rgba(255, 166, 70, 1)", // Prospect
          // "rgba(248, 96, 65, 1)", // Qualification
          // "rgb(211, 37, 39, 1)", // Proposal
          // "rgba(229, 39, 114, 1)", // Followup
          // "rgb(110, 8, 63, 1)", // Closing
          // "rgba(255, 87, 51, 0.8)",
          // "rgba(51, 255, 87, 0.8)",
          // "rgba(51, 87, 255, 0.8)",
          // "rgba(255, 51, 161, 0.8)",
          // "rgba(255, 215, 51, 0.8)",
          // "rgba(140, 51, 255, 0.8)",
          "rgb(0, 64, 89, 1)",
    "rgb(4, 56, 125, 1)",
    "rgb(18, 106, 132, 1)",
    "rgb(6, 115, 121, 1)",
    "rgb(4, 158, 116, 1)",
    "rgb(27, 120, 72, 1)",
        ],
        borderWidth: 1,
      },
    ],
  });

  const [percentages, setPercentages] = useState([]);

  useEffect(() => {
    const labels = Object.keys(funnelStats); // Get the keys as labels
    const data = Object.values(funnelStats); // Get the values as data
    const total = data.reduce((sum, value) => sum + value, 0); // Sum of all data
    const calculatedPercentages = data.map(
      (value) => Math.round((value / total) * 100) // Calculate rounded percentages
    );

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
    setPercentages(calculatedPercentages); // Store calculated percentages
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
      {/* Custom Legends */}
      <div style={{ marginTop: "20px" }}>
        <Row gutter={[5, 5]} justify={"space-around"}>
          {chartData.labels.map((label, index) => (
            <Col key={index} span={8} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor: chartData.datasets[0].backgroundColor[index],
                  borderRadius: "4px", // Rounded square
                  display: "inline-block",
                  marginRight: "8px",
                }}
              />
              <span
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#333", // Dark text color for better readability
                }}
              >
                {percentages[index]}%
              </span>
            </Col>
          ))}
        </Row>
      </div>
    </Card>
  );
};
