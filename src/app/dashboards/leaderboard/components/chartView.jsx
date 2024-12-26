import React, { useEffect, useRef, useState } from "react";
import { List, Select } from "antd";
import Chart from "chart.js/auto";

const { Option } = Select;

const LeaderboardDashboard = ({ data }) => {
  const chartRefs = useRef([]);
  const [selectedQuarter, setSelectedQuarter] = useState("currentQuarter");
  const [sortParameter, setSortParameter] = useState("clientEntries"); // Default sort parameter

  const renderChart = (canvas, salesChamp) => {
    const ctx = canvas.getContext("2d");
    const quarterData = salesChamp.entryDetails[selectedQuarter];

    const parameters = [
      "clientEntries",
      "contactEntries",
      "registrationEntries",
      "tenderEntries",
      "mentionEntries",
      "leadEntries",
      "prospectEntries",
      "qualificationEntries",
      "followUpEntries",
      "proposalEntries",
      "closingEntries",
    ];

    const entries = parameters.map((key) => quarterData[key]);

    return new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Client",
          "Contact",
          "Registration",
          "Tender",
          "Mention",
          "Lead",
          "Prospect",
          "Qualification",
          "Follow-Up",
          "Proposal",
          "Closing",
        ],
        datasets: [
          {
            label: `Entries`,
            data: entries, // Entries count
            backgroundColor: "#007CA6", // Uniform bar color
            borderRadius: 12, // Rounded edges
            barThickness: 4, // Thin vertical bars
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
  }, [sortedData, selectedQuarter]); // Re-run the effect whenever sortedData or selectedQuarter changes

  return (
    <div style={{ height: "100vh", overflowY: "scroll", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div> </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <div>
            {/* Sort Order Selector Label */}
            <span style={{ marginRight: "4px" }}>Sort By:</span>
            <Select
              value={sortParameter}
              onChange={(value) => setSortParameter(value)}
              style={{ width: 150 }}
            >
              <Option value="clientEntries">Client Entries</Option>
              <Option value="contactEntries">Contact Entries</Option>
              <Option value="registrationEntries">Registration Entries</Option>
              <Option value="tenderEntries">Tender Entries</Option>
              <Option value="mentionEntries">Mention Entries</Option>
              <Option value="leadEntries">Lead Entries</Option>
              <Option value="prospectEntries">Prospect Entries</Option>
              <Option value="qualificationEntries">
                Qualification Entries
              </Option>
              <Option value="followUpEntries">Follow-Up Entries</Option>
              <Option value="proposalEntries">Proposal Entries</Option>
              <Option value="closingEntries">Closing Entries</Option>
            </Select>
          </div>
          <div>
            {/* Quarter Selector Label */}
            <span style={{ marginRight: "4px" }}>Select Quarter:</span>
            <Select
              value={selectedQuarter}
              onChange={(value) => setSelectedQuarter(value)}
              style={{ width: 150, marginRight: "20px" }}
            >
              <Option value="currentQuarter">4th Quarter</Option>
              <Option value="lastQuarter">3rd Quarter</Option>
              <Option value="last3rdQuarter">2nd Quarter</Option>
              <Option value="last4thQuarter">1st Quarter</Option>
              <Option value="lastYear">Last Year</Option>
            </Select>
          </div>
        </div>
      </div>
      <hr style={{ marginTop: "14px", marginBottom: "18px" }} />
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={sortedData} // Use sorted data
        renderItem={(item, index) => (
          <List.Item
            style={{
              display: "flex",
              alignItems: "center",
              borderBottom: "1px solid #ddd", // Horizontal line between rows
              paddingBottom: "20px", // Add some padding for the line to not overlap content
            }}
          >
            <div
              style={{ flex: "1", textAlign: "center", fontWeight: "normal" }}
            >
              {item.firstName} {item.lastName}
            </div>
            <div style={{ flex: "5" }}>
              <canvas id={`chart-${index}`} height="200"></canvas>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

// Main App Component
export const ChartView = ({ data }) => {
  return (
    <div>
      <LeaderboardDashboard data={data} />
    </div>
  );
};
