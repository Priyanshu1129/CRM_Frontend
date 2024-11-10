import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export const BubbleChart = () => {
  const chartRef = useRef(null);
  const bubbleChartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && !bubbleChartInstance.current) {
      bubbleChartInstance.current = new Chart(chartRef.current, {
        type: "bubble",
        data: {
          datasets: [
            {
              label: "Negotiations",
              data: [{ x: 30, y: 40, r: 40 }],
              backgroundColor: "rgb(72, 201, 176)",
              borderColor: "rgba(0, 0, 0, 0.2)",
              borderWidth: 1,
            },
            {
              label: "Closed Lost",
              data: [{ x: 50, y: 30, r: 35 }],
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgba(0, 0, 0, 0.2)",
              borderWidth: 1,
            },
            {
              label: "Closed Won",
              data: [{ x: 70, y: 60, r: 45 }],
              backgroundColor: "rgb(54, 162, 235)",
              borderColor: "rgba(0, 0, 0, 0.2)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
              display: true,
              ticks: { display: false },
              grid: { display: false },
            },
            y: {
              beginAtZero: true,
              display: true,
              ticks: { display: false },
              grid: { display: false },
            },
          },
          plugins: {
            legend: {
              display: true,
              position: "bottom",
              labels: {
                color: "#333",
              },
            },
          },
        },
      });
    }

    return () => {
      if (bubbleChartInstance.current) {
        bubbleChartInstance.current.destroy();
        bubbleChartInstance.current = null;
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
      <canvas
        ref={chartRef}
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "rgba(0, 0, 0, 0.05)",
        }}
      />
    </div>
  );
};

// import React from "react";
// import { Bubble } from "react-chartjs-2";
// import { Chart as ChartJS, Tooltip, Legend, PointElement, CategoryScale, LinearScale } from "chart.js";

// ChartJS.register(Tooltip, Legend, PointElement, CategoryScale, LinearScale);

// export const BubbleChart = () => {
//     const data = {
//         datasets: [
//             {
//                 label: "Paid",
//                 data: [{ x: 3, y: 5, r: 15 }],
//                 backgroundColor: "#4BC0C0",
//             },
//             {
//                 label: "Email",
//                 data: [{ x: 6, y: 7, r: 10 }],
//                 backgroundColor: "#FF6384",
//             },
//             {
//                 label: "Organic Search",
//                 data: [{ x: 4, y: 2, r: 20 }],
//                 backgroundColor: "#FFCE56",
//             },
//             {
//                 label: "Social",
//                 data: [{ x: 7, y: 3, r: 12 }],
//                 backgroundColor: "#36A2EB",
//             },
//             {
//                 label: "Referral",
//                 data: [{ x: 5, y: 6, r: 18 }],
//                 backgroundColor: "#9966FF",
//             },
//             // Add more datasets as needed
//         ],
//     };

//     const options = {
//         plugins: {
//             legend: {
//                 display: true,
//                 labels: {
//                     color: "#FFF",
//                 },
//             },
//             tooltip: {
//                 enabled: true,
//                 backgroundColor: "#FFF",
//                 titleColor: "#333",
//                 bodyColor: "#333",
//             },
//         },
//         scales: {
//             x: {
//                 ticks: {
//                     display: false,
//                 },
//                 grid: {
//                     display: false,
//                 },
//             },
//             y: {
//                 ticks: {
//                     display: false,
//                 },
//                 grid: {
//                     display: false,
//                 },
//             },
//         },
//     };

//     return <Bubble data={data} options={options} />;
// };

// import React, { useEffect, useRef } from 'react';
// import { Chart } from 'chart.js/auto';

// export const BubbleChart = () => {
//     const chartRef = useRef(null); // Reference for the chart canvas
//     const bubbleChartInstance = useRef(null); // Reference for the Chart.js instance

//     useEffect(() => {
//         if (chartRef.current && !bubbleChartInstance.current) {
//             bubbleChartInstance.current = new Chart(chartRef.current, {
//                 type: 'bubble',
//                 data: {
//                     datasets: [
//                         {
//                             label: 'Negotiations',
//                             data: [{ x: 10, y: 20, r: 15 }],
//                             backgroundColor: 'rgba(72, 201, 176, 0.6)',
//                         },
//                         {
//                             label: 'Closed Lost',
//                             data: [{ x: 20, y: 10, r: 10 }],
//                             backgroundColor: 'rgba(255, 99, 132, 0.6)',
//                         },
//                         {
//                             label: 'Closed Won',
//                             data: [{ x: 15, y: 15, r: 20 }],
//                             backgroundColor: 'rgba(54, 162, 235, 0.6)',
//                         },
//                         // Add more bubbles as needed
//                     ],
//                 },
//                 options: {
//                     scales: {
//                         x: {
//                             ticks: { display: false },
//                             grid: { display: false },
//                         },
//                         y: {
//                             ticks: { display: false },
//                             grid: { display: false },
//                         },
//                     },
//                     plugins: {
//                         legend: {
//                             display: true,
//                             position: 'bottom',
//                             labels: {
//                                 color: '#fff', // Customize to match dark background
//                             },
//                         },
//                     },
//                 },
//             });
//         }

//         // Cleanup function to destroy the chart instance when the component unmounts
//         return () => {
//             if (bubbleChartInstance.current) {
//                 bubbleChartInstance.current.destroy();
//             }
//         };
//     }, []);

//     return (
//         <div style={{ width: '100%', maxWidth: '500px', margin: '0 auto' }}>
//             <canvas ref={chartRef} />
//         </div>
//     );
// };
