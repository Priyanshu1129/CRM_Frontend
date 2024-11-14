import React, { useRef, useEffect, useState, useActionState } from "react";
import { Tooltip } from "antd";

const data = {
  Negotiations: 20,
  ClosedLost: 480,
  ClosedWon: 200,
  Discovery: 88,
  Prospecting: 30,
  ProposalSent: 740,
};

export const BubbleChart = () => {
  const canvasRef = useRef(null);
  const [hoveredBubble, setHoveredBubble] = useState(null);
  const [bubbles, setBubbles] = useState([]);
  const [toolTipValue, setToolTipValue] = useState(null);
  const [toolTipPos, setToolTipPos] = useState({x : null, y: null});

  const colors = [
    "rgba(255, 87, 51, 0.5)",
    "rgba(51, 255, 87, 0.5)",
    "rgba(51, 87, 255, 0.5)",
    "rgba(255, 51, 161, 0.5)",
    "rgba(255, 215, 51, 0.5)",
    "rgba(140, 51, 255, 0.5)",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const canvasSize = Math.min(240, window.innerWidth * 0.8);
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
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color;
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
        ctx.stroke();
        ctx.closePath();
      });
    };

    drawBubbles();
  }, [data]);

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
          setToolTipPos({x:e.clientX, y : e.clientY});
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
      {hoveredBubble && (
        <Tooltip
          title={toolTipValue}
          placement="top"
          overlayStyle={{
            position: 'absolute',
            left: `${toolTipPos?.x}px`,
            top: `${toolTipPos?.y - 30}px`,
           
            
          }}
          visible
        />
      )}
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
    </div>
  );
};
