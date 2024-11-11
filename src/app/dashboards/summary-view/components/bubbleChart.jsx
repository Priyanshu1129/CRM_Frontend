// import React, { useEffect, useRef } from "react";
// import { Chart } from "chart.js/auto";

// export const BubbleChart = () => {
//   const chartRef = useRef(null);
//   const bubbleChartInstance = useRef(null);

//   let data = [
//     {
//       label: "Negotiations",
//       x: 20,
//       y: 40,
//       value: 60,
//       color: "rgb(72, 201, 176)",
//     },
//     {
//       label: "Closed Lost",
//       x: 50,
//       y: 60,
//       value: 40,
//       color: "rgb(255, 99, 132)",
//     },
//     {
//       label: "Closed Won",
//       x: 70,
//       y: 20,
//       value: 50,
//       color: "rgb(54, 162, 235)",
//     },
//     { label: "Discovery", x: 30, y: 70, value: 30, color: "rgb(255, 159, 64)" },
//     {
//       label: "Prospecting",
//       x: 60,
//       y: 30,
//       value: 45,
//       color: "rgb(153, 102, 255)",
//     },
//     {
//       label: "Proposal Sent",
//       x: 80,
//       y: 50,
//       value: 35,
//       color: "rgb(255, 206, 86)",
//     },
//   ];

//   useEffect(() => {
//     if (chartRef.current && !bubbleChartInstance.current) {
//       bubbleChartInstance.current = new Chart(chartRef.current, {
//         type: "bubble",
//         data: {
//           datasets: data.map((item, index) => ({
//             label: item.label,
//             data: [{ x: item.x, y: item.y, r: item.value }],
//             backgroundColor: item.color,
//             borderColor: "rgba(0, 0, 0, 0.2)",
//             borderWidth: 1,
//           })),
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             x: {
//               display: false,
//               beginAtZero: true,
//             },
//             y: {
//               display: false,
//               beginAtZero: true,
//             },
//           },
//           plugins: {
//             legend: {
//               display: true,
//               position: "bottom",
//               labels: {
//                 color: "#333",
//               },
//             },
//           },
//           layout: {
//             padding: 0, // Remove extra space around the chart
//           },
//         },
//       });
//     }

//     return () => {
//       if (bubbleChartInstance.current) {
//         bubbleChartInstance.current.destroy();
//         bubbleChartInstance.current = null;
//       }
//     };
//   }, [data]);

//   return (
//     <div
//       style={{
//         width: "100%",
//         maxWidth: "500px",
//         height: "400px",
//         margin: "0 auto",
//       }}
//     >
//       <canvas ref={chartRef} />
//     </div>
//   );
// };

// import React, { useRef, useEffect } from "react";

// export const BubbleChart = () => {
//   const canvasRef = useRef(null);

//   // Sample bubble data
//   const data = [
//     {
//       label: "Negotiations",
//       x: 100,
//       y: 100,
//       radius: 30,
//       color: "rgb(72, 201, 176)",
//     },
//     {
//       label: "Closed Lost",
//       x: 200,
//       y: 100,
//       radius: 40,
//       color: "rgb(255, 99, 132)",
//     },
//     {
//       label: "Closed Won",
//       x: 300,
//       y: 100,
//       radius: 35,
//       color: "rgb(54, 162, 235)",
//     },
//     {
//       label: "Discovery",
//       x: 400,
//       y: 200,
//       radius: 25,
//       color: "rgb(255, 159, 64)",
//     },
//     {
//       label: "Prospecting",
//       x: 250,
//       y: 250,
//       radius: 30,
//       color: "rgb(153, 102, 255)",
//     },
//     {
//       label: "Proposal Sent",
//       x: 350,
//       y: 250,
//       radius: 28,
//       color: "rgb(255, 206, 86)",
//     },
//   ];

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
//     canvas.width = 500;
//     canvas.height = 400;

//     // Function to detect and resolve overlap
//     const adjustPositions = () => {
//       const hasOverlap = (bubble1, bubble2) => {
//         const dx = bubble1.x - bubble2.x;
//         const dy = bubble1.y - bubble2.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//         return distance < bubble1.radius + bubble2.radius;
//       };

//       for (let i = 0; i < data.length; i++) {
//         for (let j = i + 1; j < data.length; j++) {
//           if (hasOverlap(data[i], data[j])) {
//             const dx = data[i].x - data[j].x;
//             const dy = data[i].y - data[j].y;
//             const angle = Math.atan2(dy, dx);
//             const distanceToMove =
//               data[i].radius + data[j].radius - Math.sqrt(dx * dx + dy * dy);
//             const moveX = (Math.cos(angle) * distanceToMove) / 2;
//             const moveY = (Math.sin(angle) * distanceToMove) / 2;
//             data[i].x += moveX;
//             data[i].y += moveY;
//             data[j].x -= moveX;
//             data[j].y -= moveY;
//           }
//         }
//       }
//     };

//     // Adjust positions to prevent overlap
//     adjustPositions();

//     // Function to draw each bubble
//     const drawBubble = (bubble) => {
//       ctx.beginPath();
//       ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
//       ctx.fillStyle = bubble.color;
//       ctx.fill();
//       ctx.closePath();

//       // Draw label
//       ctx.fillStyle = "#000";
//       ctx.font = "12px Arial";
//       ctx.textAlign = "center";
//       ctx.fillText(bubble.label, bubble.x, bubble.y + bubble.radius + 12); // label below bubble
//     };

//     // Clear canvas and draw bubbles
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     data.forEach(drawBubble);
//   }, [data]);

//   return (
//     <div style={{ textAlign: "center" }}>
//       <canvas ref={canvasRef} style={{ border: "1px solid #ddd" }} />
//     </div>
//   );
// };

import React, { useRef, useEffect } from "react";

export const BubbleChart = () => {
  const data = {
    Negotiations: 120,
    ClosedLost: 180,
    ClosedWon: 150,
    Discovery: 110,
    Prospecting: 130,
    ProposalSent: 140,
  };

  const canvasRef = useRef(null);
  const circleRadius = 200; // Radius of the parent circle

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = circleRadius + 20; // Center X of the circle in the canvas
    const centerY = circleRadius + 20; // Center Y of the circle in the canvas
    canvas.width = circleRadius * 2 + 40; // Extra padding for boundary
    canvas.height = circleRadius * 2 + 40;

    // Function to calculate bubble radius based on data value
    const calculateRadius = (value) => {
      const minRadius = 20;
      const maxRadius = 50;
      const maxDataValue = Math.max(...Object.values(data).map((d) => d.value));
      return minRadius + (value / maxDataValue) * (maxRadius - minRadius);
    };

    // Function to generate random non-overlapping positions within circle
    const generateBubblePositions = (bubbles) => {
      const positionedBubbles = [];

      bubbles.forEach((bubble, index) => {
        let placed = false;
        let i = 0;
        while (i<20 && !placed) {
          i++;
          console.log(i);
          // Random angle and distance to ensure placement inside the circle
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * (circleRadius - bubble.radius);
          const x = centerX + distance * Math.cos(angle);
          const y = centerY + distance * Math.sin(angle);

          // Check for overlap with other positioned bubbles
          const hasOverlap = positionedBubbles.some((otherBubble) => {
            const dx = x - otherBubble.x;
            const dy = y - otherBubble.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            return dist < bubble.radius + otherBubble.radius;
          });

          // Place bubble if no overlap and within boundaries
          if (
            !hasOverlap &&
            Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) +
              bubble.radius <=
              circleRadius
          ) {
            bubble.x = x;
            bubble.y = y;
            positionedBubbles.push(bubble);
            placed = true;
          }
        }
      });

      return positionedBubbles;
    };

    // Prepare bubble data
    const bubbles = Object.keys(data).map((key) => ({
      label: key,
      value: data[key],
      radius: calculateRadius(data[key]),
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    }));

    // Adjust positions to prevent overlap and fit in the circle
    const positionedBubbles = generateBubblePositions(bubbles);

    // Function to draw each bubble
    const drawBubble = (bubble) => {
      ctx.beginPath();
      ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
      ctx.fillStyle = bubble.color;
      ctx.fill();
      ctx.closePath();

      // Draw label
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(bubble.label, bubble.x, bubble.y + bubble.radius + 12); // label below bubble
    };

    // Clear canvas and draw main circle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    // Draw positioned bubbles
    positionedBubbles.forEach(drawBubble);
  }, [data]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <canvas ref={canvasRef} style={{ border: "1px solid #ddd" }} />
    </div>
  );
};
