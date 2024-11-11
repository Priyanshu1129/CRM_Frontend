import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from "antd";

export const BubbleChart = () => {
  const data = {
    Negotiations: 320,
    ClosedLost: 480,
    ClosedWon: 50,
    Discovery: 10,
    Prospecting: 30,
    ProposalSent: 740,
  };

  const canvasRef = useRef(null);
  const [hoveredBubble, setHoveredBubble] = useState(null);
  const [bubbles, setBubbles] = useState([]);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // const colors = [
  //   "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD733", "#8C33FF",
  // ];
  const colors = [
    "rgba(255, 87, 51, 0.5)",   // #FF5733 with 50% opacity
    "rgba(51, 255, 87, 0.5)",   // #33FF57 with 50% opacity
    "rgba(51, 87, 255, 0.5)",   // #3357FF with 50% opacity
    "rgba(255, 51, 161, 0.5)",  // #FF33A1 with 50% opacity
    "rgba(255, 215, 51, 0.5)",  // #FFD733 with 50% opacity
    "rgba(140, 51, 255, 0.5)",  // #8C33FF with 50% opacity
  ];
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const canvasSize = Math.min(400, window.innerWidth * 0.8);
    const padding = 10;
    const effectiveCanvasSize = canvasSize - 2 * padding;

    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const maxRadius = effectiveCanvasSize / 5;

    const newBubbles = Object.keys(data).map((key, index) => {
      const minRadius = maxRadius / 3;
      const maxDataValue = Math.max(...Object.values(data));
      const radius = minRadius + (data[key] / maxDataValue) * (maxRadius - minRadius);
      return {
        label: key,
        value: data[key],
        radius,
        color: colors[index],
      };
    });

    newBubbles.sort((a, b) => b.radius - a.radius);
    const centerBubble = newBubbles[0];
    const surroundingBubbles = newBubbles.slice(1);

    setBubbles(newBubbles);

    const angleStep = (2 * Math.PI) / surroundingBubbles.length;

    const drawBubbles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      surroundingBubbles.forEach((bubble, i) => {
        const isHovered = hoveredBubble === i + 1;
        const scaleFactor = isHovered ? 1.2 : 1; // Enlarge on hover
        const angle = i * angleStep;
        const distance = centerBubble.radius + bubble.radius + 10;

        const x = Math.max(
          padding + bubble.radius,
          Math.min(centerX + distance * Math.cos(angle), canvas.width - padding - bubble.radius)
        );
        const y = Math.max(
          padding + bubble.radius,
          Math.min(centerY + distance * Math.sin(angle), canvas.height - padding - bubble.radius)
        );

        ctx.beginPath();
        ctx.arc(x, y, bubble.radius * scaleFactor, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.stroke();
        ctx.closePath();
      });

      const centerScaleFactor = hoveredBubble === 0 ? 1.2 : 1;
      ctx.beginPath();
      ctx.arc(centerX, centerY, centerBubble.radius * centerScaleFactor, 0, Math.PI * 2);
      ctx.fillStyle = centerBubble.color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.stroke();
      ctx.closePath();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      setTooltipPosition({ x: e.clientX, y: e.clientY });

      let found = false;

      newBubbles.forEach((bubble, index) => {
        let x, y;
        if (index === 0) {
          x = centerX;
          y = centerY;
        } else {
          const angle = (index - 1) * angleStep;
          const distance = centerBubble.radius + bubble.radius + 10;
          x = Math.max(
            padding + bubble.radius,
            Math.min(centerX + distance * Math.cos(angle), canvas.width - padding - bubble.radius)
          );
          y = Math.max(
            padding + bubble.radius,
            Math.min(centerY + distance * Math.sin(angle), canvas.height - padding - bubble.radius)
          );
        }

        const distanceToMouse = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        if (distanceToMouse < bubble.radius) {
          setHoveredBubble(index);
          found = true;
        }
      });

      if (!found) setHoveredBubble(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    drawBubbles();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [data, hoveredBubble]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "450px",
        margin: "auto",
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "10px", fontWeight: "bold" }}>Bubble Chart</h3>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "auto",
          border: "1px solid #ddd",
          display: "block",
          background: "#f0f0f0",
          borderRadius: "12px",
        }}
      />
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          borderTop: "1px solid #ddd",
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
      {hoveredBubble !== null && bubbles[hoveredBubble] && (
        <Tooltip
          title={`${bubbles[hoveredBubble].label}: ${bubbles[hoveredBubble].value}`}
          open
          placement="top"
          overlayStyle={{
            position: 'absolute',
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 30}px`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
};
