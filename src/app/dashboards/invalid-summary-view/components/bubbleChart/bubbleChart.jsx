import React, { useRef, useEffect, useState, useMemo } from "react";
import { Card, Tooltip } from "antd";

export const BubbleChart = ({ opportunityDistribution }) => {
  // Memoize the data object so that it only changes when opportunityDistribution changes
  const data = useMemo(() => {
    return {
      Lead: opportunityDistribution?.lead,
      Prospect: opportunityDistribution?.prospect,
      Qualification: opportunityDistribution?.qualification,
      Proposal: opportunityDistribution?.proposal,
      followup: opportunityDistribution?.followup,
      Closing : opportunityDistribution?.closing,
    };
  }, [opportunityDistribution]);

  const canvasRef = useRef(null);
  const canvasParentRef = useRef(null);
  const [hoveredBubble, setHoveredBubble] = useState(null);
  const [bubbles, setBubbles] = useState([]);
  const [toolTipValue, setToolTipValue] = useState(null);
  const [toolTipPos, setToolTipPos] = useState({ x: null, y: null });
  const [windowWidth, setWindowWidth] = useState(null);

  const colors = [
    "rgb(0, 91, 127, 0.8)",
    "rgb(5,75,168, 0.8)",
    "rgb(24,141,175, 0.8)",
    "rgb(8,154,161, 0.8)",
    "rgb(5,211,155, 0.8)",
    "rgb(36, 160, 96, 0.8)",
  ];

  const borderColors = [
    "rgb(0, 64, 89, 1)",
    "rgb(4, 56, 125, 1)",
    "rgb(18, 106, 132, 1)",
    "rgb(6, 115, 121, 1)",
    "rgb(4, 158, 116, 1)",
    "rgb(27, 120, 72, 1)",
  ];

  useEffect(() => {
    console.log("recalculate");

    // If data is empty or opportunityDistribution is null, return early
    if (!Object.keys(data).length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const canvasSize = canvasParentRef?.current?.lastChild?.clientWidth;
    const devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = canvasSize * devicePixelRatio;
    canvas.height = canvasSize * devicePixelRatio;
    canvas.style.width = `${canvasSize}px`;
    canvas.style.height = `${canvasSize}px`;

    ctx.scale(devicePixelRatio, devicePixelRatio);

    const padding = 10;
    const effectiveCanvasSize = canvasSize - 2 * padding;
    const centerX = canvasSize / 2;
    const centerY = canvasSize / 2;
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
        borderColor: borderColors[index],
        x: centerX,
        y: centerY,
      };
    });

    newBubbles.sort((a, b) => b.radius - a.radius);
    const centerBubble = newBubbles[0];
    const surroundingBubbles = newBubbles.slice(1);

    setBubbles(newBubbles);

    const angleStep = (2 * Math.PI) / surroundingBubbles.length;

    for (let i = 1; i < newBubbles.length; i++) {
      const bubble = newBubbles[i];
      const angle = i * angleStep;
      const distance = centerBubble.radius + bubble.radius + 10;
      bubble.x = centerX + distance * Math.cos(angle);
      bubble.y = centerY + distance * Math.sin(angle);
    }

    const drawBubbles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      newBubbles.forEach((bubble) => {
        // Draw the bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = bubble.borderColor;
        ctx.stroke();
        ctx.closePath();

        // Draw the value (number) in the center of the bubble
        ctx.font = "bold 14px Arial";  // Make the font bold
        ctx.fillStyle = "white";  // White text color
        ctx.textAlign = "center";  // Center the text horizontally
        ctx.textBaseline = "middle";  // Center the text vertically
        ctx.fillText(bubble.value, bubble.x, bubble.y);  // Draw the value at the center
      });
    };

    drawBubbles();
  }, [data]); // Effect only runs when 'data' changes

  useEffect(() => {
    const canvas = canvasRef.current;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      const mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);

      let found = false;

      for (let i = 0; i < bubbles.length; i++) {
        const bubble = bubbles[i];
        const distance = Math.sqrt(
          Math.pow(mouseX / window.devicePixelRatio - bubble.x, 2) +
          Math.pow(mouseY / window.devicePixelRatio - bubble.y, 2)
        );

        if (distance <= bubble.radius) {
          if (!hoveredBubble || hoveredBubble.label !== bubble.label) {
            setHoveredBubble(bubble);
            setToolTipValue(bubble.label);
          }
          setToolTipPos({ x: e.clientX, y: e.clientY });
          found = true;
          break;
        }
      }

      if (!found) {
        setHoveredBubble(null);
        setToolTipValue(null);
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [bubbles, hoveredBubble]);

  return (
    <Card bodyStyle={{ padding: 0 }} ref={canvasParentRef}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          background: "fff",
          borderRadius: "5px",
        }}
      />
      {/* {hoveredBubble && (
        <Tooltip
          title={toolTipValue}
          placement="top"
          overlayStyle={{
            position: "absolute",
            left: `${toolTipPos?.x}px`,
            top: `${toolTipPos?.y - 30}px`,
          }}
          visible
        />
      )} */}
      <div
        style={{
          marginTop: "20px",
          padding: "20px",
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
    </Card>
  );
};
