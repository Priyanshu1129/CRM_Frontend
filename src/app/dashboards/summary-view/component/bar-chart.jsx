import React, { useEffect, useRef } from "react";
import ChartJS from "chart.js/auto"; // Import Chart.js

const ChartComponent = ({ chartData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy the previous chart before creating a new one
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
      const barWidth = 30; // Fixed bar width
      const barSpacing = 30; // Fixed space between bars
      const totalBars = chartData.labels.length; // Number of bars
      const canvasWidth = totalBars * barWidth + (totalBars - 1) * barSpacing;

      chartRef.current.width = canvasWidth; // Set the canvas width dynamically

      // Create the chart
      const chart = new ChartJS(chartRef.current, {
        type: "bar",
        data: chartData,
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || "";
                  label += `: ${context.raw}`;
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              title: {
                display: false,
                text: "Entities",
              },
              ticks: {
                font: {
                  size: 11, // Change the font size here
                  family: "Arial", // You can also change the font family
                },
                color: "#333",
              },
              grid: {
                drawOnChartArea: false, // Hide vertical grid lines
              },
            },
            y: {
              stacked: true,
              title: {
                display: true,
                text: "Revenue",
              },
              grid: {
                drawOnChartArea: true,
              },

              beginAtZero: true,
            },
          },
        },
      });

      chartRef.current.chart = chart; // Attach the chart instance to the ref
    }

    return () => {
      if (chartRef.current?.chart) {
        chartRef.current.chart.destroy(); // Clean up chart on unmount
      }
    };
  }, [chartData]); // Re-render the chart when chartData changes

  return (
    <div
      style={{
        overflowX: "auto",
        scrollbarWidth: "thin",
        maxWidth: "100%",
        padding: "10px",
      }}
    >
      <canvas style={{ minWidth: "100%" }} height="300" ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponent;

// import React, { useEffect, useRef } from "react";
// import ChartJS from "chart.js/auto";

// function roundOffToUpperBound(value) {
//   let partition = 10000; // Start with the base partition size
//   let factor = 1;

//   // Find the appropriate partition size
//   while (value / factor >= partition) {
//     factor *= 10; // Increase the scale by a factor of 10
//     partition *= 2; // Double the partition size
//   }

//   // Calculate the upper bound
//   const upperBound = Math.ceil(value / partition) * partition;
//   return upperBound;
// }

// const ChartComponent = ({ chartData }) => {
//   const chartRef = useRef(null);
//   const yAxisChartRef = useRef(null);

// useEffect(() => {
//   const calculateYAxisRange = () => {
//     const allDataPoints = chartData.datasets.flatMap((dataset) => {
//       return dataset.data;
//     });

//     const maxRange = Math.max(
//       ...chartData.datasets[0].data.map(
//         (d1, idx) => d1 + chartData.datasets[1].data[idx]
//       )
//     );
//     console.log(" maxRange", maxRange);
//     const upperValueForY = roundOffToUpperBound(maxRange);
//     console.log(" upperValueForY : ", upperValueForY);

//     const min = Math.min(...allDataPoints);
//     const max = Math.max(...allDataPoints);
//     return { min: Math.floor(min), max: Math.ceil(max) };
//   };

//   const { min, max } = calculateYAxisRange();
//   console.log("max", max);

// Function to create the main chart

//     const barWidth = 30; // Fixed bar width
//     const barSpacing = 30; // Fixed space between bars
//     const totalBars = chartData.labels.length; // Number of bars
//     const canvasWidth = totalBars * barWidth + (totalBars - 1) * barSpacing;
//     const createMainChart = () => {
//       if (chartRef.current) {
//         if (chartRef.current.chart) {
//           chartRef.current.chart.destroy();
//         }

//         chartRef.current.width = canvasWidth; // Set the canvas width dynamically

//         // Create the chart
//         const chart = new ChartJS(chartRef.current, {
//           type: "bar",
//           data: chartData,
//           options: {
//             responsive: false,
//             plugins: {
//               legend: {
//                 display: false,
//               },
//               tooltip: {
//                 callbacks: {
//                   label: (context) => {
//                     let label = context.dataset.label || "";
//                     label += `: ${context.raw}`;
//                     return label;
//                   },
//                 },
//               },
//             },
//             scales: {
//               x: {
//                 stacked: true,
//                 ticks: {
//                   font: {
//                     size: 11, // Change the font size here
//                     family: "Arial", // You can also change the font family
//                   },
//                   color: "#333",
//                 },
//                 grid: {
//                   drawOnChartArea: false, // Hide vertical grid lines
//                 },
//               },
//               y: {
//                 display: true, // Hide the Y-axis here
//                 ticks: {
//                   font: {
//                     size: 11, // Optional: Customize Y-axis labels
//                   },
//                   color: "transparent",
//                 },
//               },
//             },
//           },
//         });

//         chartRef.current.chart = chart;
//       }
//     };

//     // Function to create the fixed Y-axis chart
//     const createYAxisChart = () => {
//       if (yAxisChartRef.current) {
//         if (yAxisChartRef.current.chart) {
//           yAxisChartRef.current.chart.destroy();
//         }

//         yAxisChartRef.current.width = canvasWidth; // Set the canvas width dynamically

//         // Create the Y-axis-only chart
//         const yAxisChart = new ChartJS(yAxisChartRef.current, {
//           type: "bar",
//           data: chartData,
//           options: {
//             elements: {
//               bar: {
//                 backgroundColor: (context) => {
//                   // Dynamically set transparency based on dataset index
//                   const colors = [
//                     "rgba(75, 192, 192, 0)", // Transparent color for dataset 1
//                     "rgba(255, 99, 132, 0)", // Transparent color for dataset 2
//                   ];
//                   return colors[context.datasetIndex]; // Assign color by dataset
//                 },
//               },
//             },
//             responsive: false,
//             plugins: {
//               legend: {
//                 display: false,
//               },
//             },
//             scales: {
//               x: {
//                 stacked: true,
//                 ticks: {
//                   font: {
//                     size: 11, // Change the font size here
//                     family: "Arial", // You can also change the font family
//                   },
//                   color: "transparent",
//                 },
//                 grid: {
//                   drawOnChartArea: false, // Hide vertical grid lines
//                 },
//               },
//               y: {
//                 display: true,
//                 stacked: true,
//                 ticks: {
//                   font: {
//                     size: 11, // Optional: Customize Y-axis labels
//                   },
//                 },
//                 title: {
//                   display: false,
//                   text: "Revenue",
//                 },
//                 grid: {
//                   drawOnChartArea: false, // Hide horizontal grid lines
//                 },
//                 beginAtZero: true,
//                 // min: min, // Set Y-axis minimum value
//                 // max: max, // Set Y-axis maximum value
//               },
//             },
//           },
//         });

//         yAxisChartRef.current.chart = yAxisChart;
//       }
//     };

//     createMainChart();
//     createYAxisChart();

//     return () => {
//       if (chartRef.current?.chart) {
//         chartRef.current.chart.destroy();
//       }
//       if (yAxisChartRef.current?.chart) {
//         yAxisChartRef.current.chart.destroy();
//       }
//     };
//   }, [chartData]);

//   return (
//     <div style={{ position: "relative" }}>
//       {/* Fixed Y-axis chart */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           // left: 0,
//           // height: "100%",
//           // width: "100%",
//           // zIndex: 1,
//           // background: "white", // Optional to hide overlapping content
//           overflowX: "auto",
//           scrollbarWidth: "none",
//           maxWidth: "100%",
//           padding: "10px",
//         }}
//       >
//         <canvas style={{ minWidth: "100%" }} ref={yAxisChartRef} height="300" />
//       </div>
//       {/* Main scrollable chart */}
//       <div
//         style={{
//           overflowX: "auto",
//           scrollbarWidth: "none",
//           maxWidth: "100%",
//           padding: "10px",
//         }}
//       >
//         <canvas style={{ minWidth: "100%" }} height="300" ref={chartRef} />
//       </div>
//     </div>
//   );
// };

// export default ChartComponent;
