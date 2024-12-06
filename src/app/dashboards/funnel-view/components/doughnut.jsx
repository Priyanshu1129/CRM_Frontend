// import React, { useEffect, useState } from "react";
// import { Card, Row, Col } from "antd";
// import { ChartComponent } from "../../components";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// import { Chart as ChartJS } from "chart.js/auto";
// import { colorConfig } from "@/config";

// ChartJS.register(ChartDataLabels);
// const centerTextPlugin = {
//   id: "centerText",
//   beforeDraw(chart) {
//     const { width } = chart;
//     const { height } = chart;
//     const ctx = chart.ctx;
//     const centerX = width / 2;
//     const centerY = height / 2;

//     const total = chart.data.datasets[0].data.reduce(
//       (sum, val) => sum + val,
//       0
//     );
//     const centerText = `${total}`;

//     ctx.save();
//     ctx.font = "bold 44px Arial";
//     ctx.fillStyle = colorConfig.textGrayDark;
//     ctx.textAlign = "center";
//     ctx.textBaseline = "middle";
//     ctx.fillText(centerText, centerX, centerY);
//     ctx.restore();
//   },
// };

// ChartJS.register(centerTextPlugin);

// export const Doughnut = ({ funnelStats }) => {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         data: [],
//         backgroundColor: [
//           // "rgb(255, 205, 105, 0.7)", // Lead
//           // "rgba(255, 166, 70, 0.7)", // Prospect
//           // "rgba(248, 96, 65, 0.7)",  // Qualification
//           // "rgb(211, 37, 39, 0.7)",   // Proposal
//           // "rgba(229, 39, 114, 0.7)", // Followup
//           // "rgb(110, 8, 63, 0.7)",    // Closing
//           // "rgba(255, 87, 51, 0.6)",
//           // "rgba(51, 255, 87, 0.6)",
//           // "rgba(51, 87, 255, 0.6)",
//           // "rgba(255, 51, 161, 0.6)",
//           // "rgba(255, 215, 51, 0.6)",
//           // "rgba(140, 51, 255, 0.6)",
//           // "rgb(0, 91, 127, 0.9)",
//           // "rgb(5,75,168, 0.9)",
//           // "rgb(24,141,175, 0.9)",
//           // "rgb(8,154,161, 0.9)",
//           // "rgb(5,211,155, 0.9)",
//           // "rgb(36, 160, 96, 0.9)",

//           "rgb(229, 39, 114, 0.8)",
//     "rgb(248, 96, 65, 0.8)",
//     "rgb(255, 166, 70, 0.8)",
//     "rgb(0, 199, 180, 0.8)",
//     "rgb(72, 181, 194, 0.8)",
//     "rgb(0, 124, 166, 0.8)",
//         ],
//         borderColor: [
//           // "rgb(255, 205, 105, 1)", // Lead
//           // "rgba(255, 166, 70, 1)", // Prospect
//           // "rgba(248, 96, 65, 1)", // Qualification
//           // "rgb(211, 37, 39, 1)", // Proposal
//           // "rgba(229, 39, 114, 1)", // Followup
//           // "rgb(110, 8, 63, 1)", // Closing
//           // "rgba(255, 87, 51, 0.8)",
//           // "rgba(51, 255, 87, 0.8)",
//           // "rgba(51, 87, 255, 0.8)",
//           // "rgba(255, 51, 161, 0.8)",
//           // "rgba(255, 215, 51, 0.8)",
//           // "rgba(140, 51, 255, 0.8)",
//           // "rgb(0, 64, 89, 1)",
//           // "rgb(4, 56, 125, 1)",
//           // "rgb(18, 106, 132, 1)",
//           // "rgb(6, 115, 121, 1)",
//           // "rgb(4, 158, 116, 1)",
//           // "rgb(27, 120, 72, 1)",

//           "rgb(229, 39, 114, 1)",
//           "rgb(248, 96, 65, 1)",
//           "rgb(255, 166, 70, 1)",
//           "rgb(0, 199, 180, 1)",
//           "rgb(72, 181, 194, 1)",
//           "rgb(0, 124, 166, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   });

//   const [percentages, setPercentages] = useState([]);

//   useEffect(() => {
//     const labels = Object.keys(funnelStats); // Get the keys as labels
//     const data = Object.values(funnelStats); // Get the values as data
//     const total = data.reduce((sum, value) => sum + value, 0); // Sum of all data
//     const calculatedPercentages = data.map(
//       (value) => Math.round((value / total) * 100) // Calculate rounded percentages
//     );

//     setChartData((prevData) => ({
//       ...prevData,
//       labels: labels,
//       datasets: [
//         {
//           ...prevData.datasets[0],
//           data: data, // Use the data from the server
//         },
//       ],
//     }));
//     setPercentages(calculatedPercentages); // Store calculated percentages
//   }, [funnelStats]);

//   // const options = {
//   //   responsive: true,
//   //   plugins: {
//   //     legend: {
//   //       display: false,
//   //     },
//   //     tooltip: {
//   //       callbacks: {
//   //         label: function (tooltipItem) {
//   //           return `${tooltipItem.label}: ${tooltipItem.raw} items`; // Display raw data in tooltip
//   //         },
//   //       },
//   //     },
//   //     datalabels: {
//   //       color: "#fff", // Label text color
//   //       font: {
//   //         size: 14, // Font size for the labels
//   //       },
//   //       display: true,
//   //       formatter: (value) => value, // Display raw data as labels
//   //     },
//   //   },
//   // };
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: false, // Disable the legend
//       },
//       tooltip: {
//         callbacks: {
//           label: function (tooltipItem) {
//             if (tooltipItem.raw > 0) {
//               return `${tooltipItem.label}: ${tooltipItem.raw} items`; // Tooltip for non-zero values
//             }
//             return ""; // Suppress tooltip for 0 values
//           },
//         },
//       },
//       datalabels: {
//         color: "#000", // Label text color
//         font: {
//           size: 14, // Font size for the labels
//           // weight: "bold",
//         },
//         display: function (context) {
//           return false; // Only display label if value > 0
//         },
//         formatter: function (value, context) {
//           const total = context.chart.data.datasets[0].data.reduce(
//             (sum, val) => sum + val,
//             0
//           );
//           const percentage = ((value / total) * 100).toFixed(1); // Calculate percentage
//           return value > 0 ? `${percentage}%` : ""; // Show percentage for non-zero values
//         },
//       },
//     },
//   };

//   return (
//     <Card bordered={true} style={{ height: "100%" }}>
//       <ChartComponent chartData={chartData} options={options} type="doughnut" />
//       {/* Custom Legends */}
//       <div style={{ marginTop: "20px" }}>
//         <Row gutter={[5, 5]} justify={"space-around"}>
//           {chartData.labels.map((label, index) => (
//             <Col key={index} span={8} style={{ textAlign: "center" }}>
//               <div
//                 style={{
//                   width: "16px",
//                   height: "16px",
//                   backgroundColor: chartData.datasets[0].backgroundColor[index],
//                   borderRadius: "4px", // Rounded square
//                   display: "inline-block",
//                   marginRight: "8px",
//                 }}
//               />
//               <span
//                 style={{
//                   fontWeight: "500",
//                   fontSize: "14px",
//                   color: "#333", // Dark text color for better readability
//                 }}
//               >
//                 {percentages[index]}%
//               </span>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </Card>
//   );
// };

import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import { ChartComponent } from "../../components";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS } from "chart.js/auto";
import { colorConfig } from "@/config";

ChartJS.register(ChartDataLabels);

// Updated centerTextPlugin to accept dynamic value
const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart, args, options) {
    const { width } = chart;
    const { height } = chart;
    const ctx = chart.ctx;
    const centerX = width / 2;
    const centerY = height / 2;

    const centerText = `win:${options.centerText}` || ""; // Get the dynamic value from options

    ctx.save();
    ctx.font = "bold 25px Arial";
    ctx.fillStyle = colorConfig.textGrayDark;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(centerText, centerX, centerY);
    ctx.restore();
  },
};

ChartJS.register(centerTextPlugin);

export const Doughnut = ({ funnelStats, wonCount }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          "rgb(229, 39, 114, 0.8)",
          "rgb(248, 96, 65, 0.8)",
          "rgb(255, 166, 70, 0.8)",
          "rgb(0, 199, 180, 0.8)",
          "rgb(72, 181, 194, 0.8)",
          "rgb(0, 124, 166, 0.8)",
        ],
        borderColor: [
          "rgb(229, 39, 114, 1)",
          "rgb(248, 96, 65, 1)",
          "rgb(255, 166, 70, 1)",
          "rgb(0, 199, 180, 1)",
          "rgb(72, 181, 194, 1)",
          "rgb(0, 124, 166, 1)",
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
        display: false, // Disable the legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.raw > 0) {
              return `${tooltipItem.label}: ${tooltipItem.raw} items`; // Tooltip for non-zero values
            }
            return ""; // Suppress tooltip for 0 values
          },
        },
      },
      datalabels: {
        color: "#000", // Label text color
        font: {
          size: 14, // Font size for the labels
        },
        display: function (context) {
          return false; // Only display label if value > 0
        },
        formatter: function (value, context) {
          const total = context.chart.data.datasets[0].data.reduce(
            (sum, val) => sum + val,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1); // Calculate percentage
          return value > 0 ? `${percentage}%` : ""; // Show percentage for non-zero values
        },
      },
      centerText: {
        centerText: wonCount || "0", // Pass the wonCount dynamically
      },
    },
  };

  return (
    <Card bordered={true} style={{ height: "100%" }}>
      <ChartComponent chartData={chartData} options={options} type="doughnut" />
      {/* Custom Legends */}
      <div style={{ marginTop: "20px" }}>
        <Row gutter={[5, 5]} justify={"space-around"}>
          {chartData.labels.map((label, index) => (
            <Col key={index} span={8} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  backgroundColor:
                    chartData.datasets[0].backgroundColor[index],
                  borderRadius: "4px", // Rounded square
                  display: "inline-block",
                  marginRight: "8px",
                }}
              />
              <span
                style={{
                  fontWeight: "500",
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
