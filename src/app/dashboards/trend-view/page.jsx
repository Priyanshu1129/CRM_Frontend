"use client";

import React, { useEffect, useRef } from "react";
import { useFetchTrendView } from "@/hooks/dashboards/trendView/useTrendView";
import { DashboardHeader } from "../components";
import { Filter } from "../components";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, Spin } from "antd";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const TrendViewPage = () => {
  const { loading, setRefresh, trendView, filters, setFilter, setFilters } =
    useFetchTrendView();
  const chartRef = useRef(null);

  const trendViewForChart = Object.keys(trendView).map((key) => ({
    year: key,
    revenue: trendView[key]?.revenue || 0,
  }));

  useEffect(() => {
    if (chartRef.current) {
      // Clean up any existing chart instance before creating a new one
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      chartRef.current.chartInstance = new ChartJS(ctx, {
        type: "bar",
        data: {
          labels: trendViewForChart.map((item) => item.year),
          datasets: [
            {
              label: "Revenue",
              data: trendViewForChart.map((item) => item.revenue),
              backgroundColor: "#1890FF", // Solid Ant Design primary blue
              borderColor: "#0050B3", // Darker blue for border
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Trend View Revenue Over Years",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Years",
              },
              grid: {
                display: false, // Remove x-axis grid lines
              },
            },
            y: {
              title: {
                display: true,
                text: "Revenue",
              },
              beginAtZero: true,
              grid: {
                display: false, // Remove y-axis grid lines
              },
            },
          },
        },
      });
    }
  }, [trendViewForChart]);

  return (
    <div style={{ padding: "24px" }}>
      <DashboardHeader
        dashboard={"Trend-View"}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
      />

      {/* Chart Section */}
      <Card
        style={{
          marginTop: "24px",
          padding: "16px",
          backgroundColor: "#fff", // White background
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow
        }}
      >
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "400px",
            }}
          >
            <canvas ref={chartRef} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default TrendViewPage;
