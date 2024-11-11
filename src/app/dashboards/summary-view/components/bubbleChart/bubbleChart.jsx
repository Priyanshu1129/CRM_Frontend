import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from "antd";

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
  const circleRadius = 80; // Adjusted to bring bubbles closer together
  const [hoveredBubble, setHoveredBubble] = useState(null);
  const [bubbles, setBubbles] = useState([]); // Store bubbles in state

  const colors = [
    "#FF5733", // Color for Negotiations
    "#33FF57", // Color for ClosedLost
    "#3357FF", // Color for ClosedWon
    "#FF33A1", // Color for Discovery
    "#FFD733", // Color for Prospecting
    "#8C33FF", // Color for ProposalSent
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = circleRadius + 20;
    const centerY = circleRadius + 20;
    canvas.width = circleRadius * 2 + 40;
    canvas.height = circleRadius * 2 + 40;

    const newBubbles = Object.keys(data).map((key, index) => {
      const minRadius = 15;
      const maxRadius = 25;
      const maxDataValue = Math.max(...Object.values(data));
      const radius =
        minRadius + (data[key] / maxDataValue) * (maxRadius - minRadius);
      return {
        label: key,
        value: data[key],
        radius,
        color: colors[index],
      };
    });

    // Sort the bubbles based on their size so the smallest one can be placed in the center
    newBubbles.sort((a, b) => a.radius - b.radius);

    setBubbles(newBubbles); // Set the bubbles array in state

    const drawBubblesOnCircumference = () => {
      let angle = 0;
      const angleStep = (2 * Math.PI) / (newBubbles.length - 1); // Adjust step based on the number of bubbles (excluding the center one)

      // Place the smallest bubble at the center
      const smallestBubble = newBubbles[0];
      const centerBubbleX = centerX;
      const centerBubbleY = centerY;
      ctx.beginPath();
      ctx.arc(
        centerBubbleX,
        centerBubbleY,
        smallestBubble.radius,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = smallestBubble.color;
      ctx.fill();
      ctx.closePath();

      // Draw the remaining bubbles on the circumference, starting from the next position
      angle = angleStep; // Start the angle after the center bubble
      newBubbles.slice(1).forEach((bubble) => {
        const adjustedRadius = bubble.radius; // No need to adjust radius for now

        const x = centerX + (circleRadius - adjustedRadius) * Math.cos(angle);
        const y = centerY + (circleRadius - adjustedRadius) * Math.sin(angle);

        // Draw the bubble
        ctx.beginPath();
        ctx.arc(x, y, adjustedRadius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.closePath();

        // Increment the angle based on the number of bubbles to ensure they fit tightly
        angle += angleStep;
      });
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      let found = false;

      newBubbles.forEach((bubble, index) => {
        const angle = (2 * Math.PI * index) / newBubbles.length;
        const x = centerX + (circleRadius - bubble.radius) * Math.cos(angle);
        const y = centerY + (circleRadius - bubble.radius) * Math.sin(angle);

        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        if (distance < bubble.radius) {
          setHoveredBubble(index);
          found = true;
        }
      });

      if (!found) setHoveredBubble(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearCanvas();
    drawBubblesOnCircumference();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [data, hoveredBubble]); // Re-run the effect when hoveredBubble changes

  return (
    <div
      style={{
        padding: "20px",
        width: "fit-content",
        margin: "auto",
        borderRadius: "8px",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: "1px solid #ddd",
          display: "block",
        }}
      />
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {Object.keys(data).map((stage, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: "12px",
                height: "12px",
                backgroundColor: colors[index],
                borderRadius: "50%",
                marginRight: "8px",
              }}
            ></div>
            <span style={{ fontSize: "12px", color: "#333" }}>{stage}</span>
          </div>
        ))}
      </div>
      {hoveredBubble !== null && (
        <Tooltip
          title={`${bubbles[hoveredBubble].label}: ${bubbles[hoveredBubble].value}`}
          visible
          placement="top"
        >
          <div style={{ position: "absolute", left: 0, top: 0 }} />
        </Tooltip>
      )}
    </div>
  );
};
