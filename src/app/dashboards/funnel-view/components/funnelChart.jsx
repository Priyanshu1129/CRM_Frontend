import React, { useEffect, useRef, useState } from "react";
import { Card, Tooltip } from "antd";

export const FunnelChart = ({
  funnelStats = {
    lead: 0,
    prospect: 0,
    qualification: 0,
    proposal: 0,
    followup: 0,
    closing: 0,
  },
}) => {
  const canvasRef = useRef(null);
  const [tooltipData, setTooltipData] = useState({
    visible: false,
    content: "",
    position: { x: 0, y: 0 },
    color: "",
  });

  // const colors = [
  //   "rgba(255, 99, 132, 0.6)", // Lead
  //   "rgba(54, 162, 235, 0.6)", // Prospect
  //   "rgba(255, 206, 86, 0.6)", // Qualification
  //   "rgba(75, 192, 192, 0.6)", // Proposal
  //   "rgba(153, 102, 255, 0.6)", // Followup
  //   "rgba(255, 159, 64, 0.6)", // Closing
  // ];

  // const borderColors = [
  //   "rgba(255, 99, 132, 1)", // Lead
  //   "rgba(54, 162, 235, 1)", // Prospect
  //   "rgba(255, 206, 86, 1)", // Qualification
  //   "rgba(75, 192, 192, 1)", // Proposal
  //   "rgba(153, 102, 255, 1)", // Followup
  //   "rgba(255, 159, 64, 1)", // Closing
  // ];

  const colors = [
    "rgba(0, 102, 255, 0.6)",  // Lead (primary color with transparency)
    "rgba(0, 143, 179, 0.6)",  // Prospect (teal-like color for variety)
    "rgba(102, 153, 255, 0.6)", // Qualification (lighter primary shade)
    "rgba(255, 194, 102, 0.6)", // Proposal (warm accent for contrast)
    "rgba(153, 204, 255, 0.6)", // Followup (soft blue-gray for subtlety)
    "rgba(255, 132, 102, 0.6)", // Closing (muted coral for energy)
  ];

  const borderColors = [
    "rgba(0, 102, 255, 1)",    // Lead (primary color)
    "rgba(0, 143, 179, 1)",    // Prospect (teal-like color)
    "rgba(102, 153, 255, 1)",  // Qualification (lighter primary shade)
    "rgba(255, 194, 102, 1)",  // Proposal (warm accent)
    "rgba(153, 204, 255, 1)",  // Followup (soft blue-gray)
    "rgba(255, 132, 102, 1)",  // Closing (muted coral)
  ];

  // const drawFunnelChart = (ctx, width, height) => {
  //   ctx.clearRect(0, 0, width, height);

  //   const stages = Object.keys(funnelStats);
  //   const total = Object.values(funnelStats).reduce(
  //     (acc, value) => acc + value,
  //     0
  //   );

  //   let xPosition = 0;
  //   let topHeight = 20;
  //   let bottomHeight = height - 20;

  //   stages.forEach((stage, index) => {
  //     const segmentWidth = (funnelStats[stage] / total) * width;
  //     const topNext = topHeight + (height - 40) / stages.length / 3;
  //     const bottomNext = bottomHeight - (height - 40) / stages.length / 3;

  //     ctx.fillStyle = colors[index];
  //     ctx.strokeStyle = borderColors[index];
  //     ctx.lineWidth = 1;

  //     ctx.beginPath();
  //     ctx.moveTo(xPosition, topHeight);
  //     ctx.lineTo(xPosition + segmentWidth, topNext);
  //     ctx.lineTo(xPosition + segmentWidth, bottomNext);
  //     ctx.lineTo(xPosition, bottomHeight);
  //     ctx.closePath();
  //     ctx.fill();
  //     ctx.stroke();

  //     ctx.fillStyle = "white";
  //     ctx.font = "14px Arial";
  //     ctx.fillText(
  //       funnelStats[stage],
  //       xPosition + segmentWidth / 4,
  //       (topHeight + bottomHeight) / 2 + 10
  //     );

  //     // Attach hover areas for each stage
  //     ctx.stageAreas = ctx.stageAreas || [];
  //     ctx.stageAreas.push({
  //       stage,
  //       xStart: xPosition,
  //       xEnd: xPosition + segmentWidth,
  //       yTop: topHeight,
  //       yBottom: bottomHeight,
  //       color: colors[index],
  //     });

  //     xPosition += segmentWidth;
  //     topHeight = topNext;
  //     bottomHeight = bottomNext;
  //   });
  // };

  
  const drawFunnelChart = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);
  
    const stages = Object.keys(funnelStats);
    const total = Object.values(funnelStats).reduce(
      (acc, value) => acc + value,
      0
    );
  
    let xPosition = 0;
    let topHeight = 20;
    let bottomHeight = height - 20;
  
    stages.forEach((stage, index) => {
      const segmentWidth = (funnelStats[stage] / total) * width;
      const topNext = topHeight + (height - 40) / stages.length / 3;
      const bottomNext = bottomHeight - (height - 40) / stages.length / 3;
       
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(0, 0, 0, 0.1)"; // Adjust shadow color and opacity as needed
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;
      ctx.fillStyle = colors[index];
      ctx.strokeStyle = borderColors[index];
      ctx.lineWidth = 1;
       
      ctx.beginPath();
      ctx.moveTo(xPosition, topHeight);
      ctx.lineTo(xPosition + segmentWidth, topNext);
      ctx.lineTo(xPosition + segmentWidth, bottomNext);
      ctx.lineTo(xPosition, bottomHeight);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
  
      // Reset shadow to prevent it from affecting text and other elements
      ctx.shadowBlur = 0;
      ctx.shadowColor = "transparent";
  
      // Draw the label inside each segment
      ctx.fillStyle = "white";
      ctx.font = "14px Arial";
      ctx.fillText(
        funnelStats[stage],
        xPosition + segmentWidth / 4,
        (topHeight + bottomHeight) / 2 + 10
      );
  
      // Attach hover areas for each stage
      ctx.stageAreas = ctx.stageAreas || [];
      ctx.stageAreas.push({
        stage,
        xStart: xPosition,
        xEnd: xPosition + segmentWidth,
        yTop: topHeight,
        yBottom: bottomHeight,
        color: colors[index],
      });
  
      xPosition += segmentWidth;
      topHeight = topNext;
      bottomHeight = bottomNext;
    });
  };
  
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const width = canvas.parentElement.clientWidth;
    const height = 250;

    canvas.width = width;
    canvas.height = height;

    drawFunnelChart(ctx, width, height);
  };

  const handleMouseMove = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const ctx = canvas.getContext("2d");

    let hoveredStage = null;

    // Check if mouse is within any stage area
    for (const area of ctx.stageAreas || []) {
      if (
        x >= area.xStart &&
        x <= area.xEnd &&
        y >= area.yTop &&
        y <= area.yBottom
      ) {
        hoveredStage = area;
        break;
      }
    }

    if (hoveredStage) {
      setTooltipData({
        visible: true,
        content: `${hoveredStage.stage}: ${funnelStats[hoveredStage.stage]}`,
        position: { x: event.pageX, y: event.pageY },
        color: hoveredStage.color,
      });
    } else {
      setTooltipData({
        visible: false,
        content: "",
        position: { x: 0, y: 0 },
        color: "",
      });
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    const canvas = canvasRef.current;
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [funnelStats]);

  const stages = Object.keys(funnelStats);

  return (
    <Card>
      {tooltipData.visible && (
        <div
          style={{
            position: "fixed",
            left: tooltipData.position.x + 10,
            top: tooltipData.position.y + 10,
            pointerEvents: "none",
            padding: "6px 8px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            borderRadius: "4px",
            fontSize: "12px",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {/* Color Indicator */}
          <span
            style={{
              display: "inline-block",
              width: "10px",
              height: "10px",
              backgroundColor: tooltipData.color,
              border: `2px solid ${tooltipData.color}`,
              borderRadius: "2px",
            }}
          ></span>
          {tooltipData.content}
        </div>
      )}
      <div>
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "250px",
            backgroundColor: "white",
            transition: "transform 0.3s ease", // Smooth effect
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {stages.map((stage, index) => (
          <div
            key={stage}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "transform 0.2s ease", // Hover effect for each stage box
              transform: tooltipData.content.includes(stage)
                ? "scale(1.05)"
                : "scale(1)",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "16px",
                backgroundColor: colors[index],
                borderRadius: "4px",
              }}
            ></span>
            <span style={{ fontSize: "14px", color: "#333" }}>{stage}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
