import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { List, Avatar } from "antd";
import { parameterToLabelMap } from "../config";
import { colorConfig } from "@/config";
import { TrophyFilled, TrophyOutlined } from "@ant-design/icons";
import { ImTrophy } from "react-icons/im";

// Main App Component
export const ChartView = ({ data, selectedQuarter, sortParameter }) => {
  const chartRefs = useRef([]);
  const activeLabel = parameterToLabelMap[sortParameter];

  const renderChart = (canvas, salesChamp) => {
    const ctx = canvas.getContext("2d");
    const quarterData = salesChamp.entryDetails[selectedQuarter];

    const parameters = Object.keys(parameterToLabelMap); // Use keys from the map
    const entries = parameters.map((key) => quarterData[key]);

    return new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.values(parameterToLabelMap), // Use labels from the map
        datasets: [
          {
            label: `Entries`,
            data: entries, // Entries count
            borderRadius: 9, // Rounded edges
            barThickness: 18, // Thin vertical bars
            backgroundColor: (context) => {
              const index = context.dataIndex;
              const label = context.chart.data.labels[index];
              return label === activeLabel ? "#D4AF37" : "#007CA6"; // Highlight active
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false, // Hide legend
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // Hide gridlines on X-axis
            },
            ticks: {
              color: (context) => {
                console.log("inside color", context.tick.label, activeLabel);
                const label = context.tick.label;
                return label === `${activeLabel}` ? "#D4AF37" : "#000"; // Highlight active label
              },
              font: (context) => {
                console.log("inside font", context.tick.label, activeLabel);
                const label = context.tick.label;
                return {
                  weight: label === `${activeLabel}` ? "bold" : "normal", // Bold font for active label
                  size: 12,
                };
              },
              // callback: function (value, index) {
              //   const label = this.getLabelForValue(index); // Get label for the current tick
              //   return label === activeLabel
              //     ? `${label} ★` // Add a star for active label (optional)
              //     : label; // Return normal label
              // },
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              display: false, // Hide Y-axis labels
            },
            grid: {
              display: false, // Hide Y-axis gridlines
            },
          },
        },
      },
    });
  };

  // Sort data based on selected parameter
  const sortedData = [...data].sort((a, b) => {
    const aValue = a.entryDetails[selectedQuarter][sortParameter];
    const bValue = b.entryDetails[selectedQuarter][sortParameter];
    return bValue - aValue; // Sorting in descending order
  });

  useEffect(() => {
    // Cleanup existing charts
    chartRefs.current.forEach((chart) => chart?.destroy());
    chartRefs.current = [];

    // Render charts for sorted data
    sortedData.forEach((salesChamp, index) => {
      const canvas = document.getElementById(`chart-${index}`);
      if (canvas) {
        const chartInstance = renderChart(canvas, salesChamp);
        chartRefs.current.push(chartInstance);
      }
    });

    return () => {
      // Cleanup on unmount
      chartRefs.current.forEach((chart) => chart?.destroy());
    };
  }, [sortedData, selectedQuarter, sortParameter]); // Re-run the effect whenever dependencies change

  return (
    <div
      style={{
        height: "100%", // Take full height of the available space
        padding: "12px 16px", // Padding for better visuals
        background: "#fff",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "13px",
            fontWeight: "600",
            display: "flex",
            color: colorConfig.textGrayDark,
          }}
        >
          <ImTrophy
            style={{
              fontSize: "16px",
              marginRight: "8px",
              color: "#D4AF37",
            }}
          />

          {`Sales Champions By ${activeLabel}`}
        </div>
      </div>
      <hr style={{ marginTop: "7px", marginBottom: "14px" }} />
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={sortedData} // Use sorted data
        style={{ overflowY: "auto", height: "100%", scrollbarWidth: "none" }}
        renderItem={(item, index) => (
          <List.Item
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #ddd",
              paddingBottom: "20px",
              marginBottom: "35px",
            }}
          >
            {/* left column */}
            <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                #{index + 1} {/* Add 1 to index for ranking */}
              </div>
              <div
                style={{ flex: "1", textAlign: "center", fontWeight: "normal" }}
              >
                {/* Avatar and Name */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <Avatar
                    size={40}
                    src={
                      item.avatarUrl ||
                      "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    } // Use a dummy URL if no avatar provided
                    alt={`${item.firstName} ${item.lastName}`}
                  />
                  <div>
                    {item.firstName} {item.lastName}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flex: "5" }}>
              <canvas id={`chart-${index}`} height="100"></canvas>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};
