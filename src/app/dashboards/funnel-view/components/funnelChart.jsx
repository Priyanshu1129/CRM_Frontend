import React, { useEffect, useRef } from 'react';

export const FunnelChart = ({ funnelStats = {
  lead: 0,
  prospect: 0,
  qualification: 0,
  proposal: 0,
  followup: 0,
  closing: 0,
} }) => {
  const canvasRef = useRef(null);

  const drawFunnelChart = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height); // Clear canvas for redraw

    const stages = Object.keys(funnelStats);
    const colors = [
      "#0D47A1", // Dark Blue
      "#1565C0", // Mid-dark Blue
      "#1976D2", // Medium Blue
      "#1E88E5", // Mid-light Blue
      "#42A5F5", // Light Blue
      "#90CAF9"  // Very Light Blue
    ];
    const total = Object.values(funnelStats).reduce((acc, value) => acc + value, 0);

    let xPosition = 0;
    let topHeight = 0;
    let bottomHeight = height - 50;

    stages.forEach((stage, index) => {
      const segmentWidth = (funnelStats[stage] / total) * width;
      const topNext = topHeight + (height - 50) / stages.length / 3;
      const bottomNext = bottomHeight - (height - 50) / stages.length / 3;

      ctx.fillStyle = colors[index];
      ctx.beginPath();
      ctx.moveTo(xPosition, topHeight);
      ctx.lineTo(xPosition + segmentWidth, topNext);
      ctx.lineTo(xPosition + segmentWidth, bottomNext);
      ctx.lineTo(xPosition, bottomHeight);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "white";
      ctx.lineWidth = 5;
      ctx.stroke();

      ctx.fillStyle = "white";
      ctx.font = "14px Arial";
      ctx.fillText(funnelStats[stage], xPosition + segmentWidth / 4, (topHeight + bottomHeight) / 2 + 10);

      xPosition += segmentWidth;
      topHeight = topNext;
      bottomHeight = bottomNext;
    });

    const legendXStart = 20;
    const legendYStart = height - 30;
    const legendSpacing = 120;

    stages.forEach((stage, index) => {
      ctx.fillStyle = colors[index];
      ctx.beginPath();
      ctx.arc(legendXStart + index * legendSpacing, legendYStart, 8, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "black";
      ctx.font = "14px Arial";
      ctx.fillText(stage, legendXStart + index * legendSpacing + 15, legendYStart + 5);
    });
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth; // Set canvas width to parent width
    const height = 250; // Set a fixed height

    canvas.width = width;
    canvas.height = height;

    drawFunnelChart(ctx, width, height);
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [funnelStats, resizeCanvas]);

  return (
    <div style={{ background: "#ffffff", padding: '10px', borderRadius: '10px' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>);
};
