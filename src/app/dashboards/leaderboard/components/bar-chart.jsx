// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';  // Import Chart.js

// const BarChart = () => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     // Initialize the chart after the component has mounted
//     const ctx = chartRef.current.getContext('2d');
    
//     // Demo data for the bar chart
//     const data = {
//       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//       datasets: [
//         {
//           label: 'Sales',
//           data: [65, 59, 80, 81, 56, 55, 40],
//           backgroundColor: '#2563eb', // Modern Blue Color
//           borderColor: '#2563eb', // Darker blue for border
//           borderWidth: 1,
//           borderRadius: 12, // Border radius for rounded corners
//           barThickness: 10, // Thin bars
//         },
//       ],
//     };

//     // Options for customizing the chart
//     const options = {
//       responsive: true,
//       plugins: {
//         title: {
//           display: true,
//           text: 'Monthly Sales',
//           font: {
//             size: 18,
//             weight: 'bold',
//           },
//         },
//         legend: {
//           position: 'top',
//           labels: {
//             font: {
//               size: 14,
//             },
//           },
//         },
//         tooltip: {
//           backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background for tooltip
//           titleColor: 'white',
//           bodyColor: 'white',
//         },
//       },
//       scales: {
//         x: {
//           beginAtZero: true,
//           grid: {
//             display: false, // Hide grid lines on the x-axis
//           },
//         },
//         y: {
//           beginAtZero: true,
//           grid: {
//             borderDash: [5, 5], // Dotted grid lines for y-axis
//           },
//         },
//       },
//     };

//     // Create the chart
//     new Chart(ctx, {
//       type: 'bar',
//       data: data,
//       options: options,
//     });

//     // Cleanup function to destroy the chart when the component is unmounted
//     return () => {
//       if (ctx) {
//         Chart.getChart(ctx)?.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div style={{ width: '80%', margin: '0 auto' }}>
//       {/* Create a canvas element for Chart.js */}
//       <canvas ref={chartRef}></canvas>
//     </div>
//   );
// };

// export default BarChart;

