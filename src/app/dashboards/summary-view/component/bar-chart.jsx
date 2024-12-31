// import React, { useEffect, useRef, useState } from "react";
// import { DatePicker } from "antd";
// import { colorConfig } from "@/config";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LinearScale,
//   BarController,
// } from "chart.js";
// import dayjs from "dayjs";

// // Register all necessary Chart.js components
// ChartJS.register(
//   CategoryScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LinearScale,
//   BarController
// );

// const BarChart = ({ entityName }) => {
//   const [year, setYear] = useState(dayjs().year());
//   const [chartData, setChartData] = useState({
//     target: [200, 300, 400, 500], // Dummy target values
//     actual: [180, 250, 380, 450], // Dummy actual values
//   });

//   const chartRef = useRef(null);

//   const handleYearChange = (date) => {
//     const selectedYear = date.year();
//     setYear(selectedYear);

//     // For now, we'll just update chartData with random values to simulate data fetching.
//     setChartData({
//       target: [
//         Math.floor(Math.random() * 500 + 200), // Generate random target data
//         Math.floor(Math.random() * 500 + 200),
//         Math.floor(Math.random() * 500 + 200),
//         Math.floor(Math.random() * 500 + 200),
//       ],
//       actual: [
//         Math.floor(Math.random() * 400 + 180), // Generate random actual data
//         Math.floor(Math.random() * 400 + 180),
//         Math.floor(Math.random() * 400 + 180),
//         Math.floor(Math.random() * 400 + 180),
//       ],
//     });
//   };

//   // Create the chart instance after the component mounts
//   useEffect(() => {
//     const ctx = chartRef.current.getContext("2d");
//     const chartInstance = new ChartJS(ctx, {
//       type: "bar",
//       data: {
//         labels: ["Q1", "Q2", "Q3", "Q4"],
//         datasets: [
//           {
//             label: "Target",
//             backgroundColor: colorConfig.primary,
//             data: chartData.target,
//           },
//           {
//             label: "Actual",
//             backgroundColor: "rgba(75, 192, 192)",
//             data: chartData.actual,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: { display: false },
//           tooltip: { enabled: true },
//         },
//         scales: {
//           x: { grid: { display: false } },
//           y: { grid: { display: false }, beginAtZero: true },
//         },
//       },
//     });

//     return () => chartInstance.destroy();
//   }, [chartData]);

//   return (
//     <div
//       style={{
//         margin: "1rem",
//         padding: "1rem",
//         borderRadius: "4px",
//       }}
//     >
//       {/* Header Row */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "1rem",
//         }}
//       >
//         <h4 style={{ margin: 0 }}>{entityName}</h4>
//         <DatePicker
//           picker="year"
//           style={{ width: "100px" }}
//           value={dayjs().set("year", year)}
//           onChange={handleYearChange}
//         />
//       </div>
//       {/* Chart */}
//       <canvas ref={chartRef}></canvas>
//     </div>
//   );
// };

// export default BarChart;

import React, { useEffect, useRef, useState } from "react";
import { DatePicker, Select } from "antd";
import { colorConfig } from "@/config";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  BarController,
} from "chart.js";
import dayjs from "dayjs";

// Register all necessary Chart.js components
ChartJS.register(
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LinearScale,
  BarController
);

const BarChart = ({ entityName, showSelector }) => {
  const [year, setYear] = useState(dayjs().year());
  const [selectorValue, setSelectorValue] = useState(null); // Track the value of the selector (for B, C, D)
  const [chartData, setChartData] = useState({
    target: [200, 300, 400, 500], // Dummy target values
    actual: [180, 250, 380, 450], // Dummy actual values
  });

  const chartRef = useRef(null);

  const handleYearChange = (date) => {
    const selectedYear = date.year();
    setYear(selectedYear);

    // For now, we'll just update chartData with random values to simulate data fetching.
    setChartData({
      target: [
        Math.floor(Math.random() * 500 + 200), // Generate random target data
        Math.floor(Math.random() * 500 + 200),
        Math.floor(Math.random() * 500 + 200),
        Math.floor(Math.random() * 500 + 200),
      ],
      actual: [
        Math.floor(Math.random() * 400 + 180), // Generate random actual data
        Math.floor(Math.random() * 400 + 180),
        Math.floor(Math.random() * 400 + 180),
        Math.floor(Math.random() * 400 + 180),
      ],
    });
  };

  const handleSelectorChange = (value) => {
    setSelectorValue(value);
    // Here you can implement any logic you want to fetch different data based on the selector value.
    console.log("Selected value:", value);
  };

  // Create the chart instance after the component mounts
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chartInstance = new ChartJS(ctx, {
      type: "bar",
      data: {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
          {
            label: "Target",
            backgroundColor: colorConfig.primary,
            data: chartData.target,
          },
          {
            label: "Actual",
            backgroundColor: "rgba(75, 192, 192)",
            data: chartData.actual,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { display: false }, beginAtZero: true },
        },
      },
    });

    return () => chartInstance.destroy();
  }, [chartData]);

  return (
    <div
      style={{
        margin: "1rem",
        padding: "1rem",
        borderRadius: "4px",
      }}
    >
      {/* Header Row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <div style={{ fontWeight: "600" }}>{entityName}</div>
        <div style={{ display: "flex", gap: "10px" }}>
          {showSelector && (
            <Select
              value={selectorValue}
              onChange={handleSelectorChange}
              style={{ width: "150px", marginLeft: "10px" }}
              placeholder="Select Option"
            >
              <Select.Option value="option1">Option 1</Select.Option>
              <Select.Option value="option2">Option 2</Select.Option>
              <Select.Option value="option3">Option 3</Select.Option>
            </Select>
          )}
          <DatePicker
            picker="year"
            style={{ width: "100px" }}
            value={dayjs().set("year", year)}
            onChange={handleYearChange}
          />
        </div>
      </div>
      {/* Chart */}
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;
