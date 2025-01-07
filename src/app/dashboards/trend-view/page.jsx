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
import { colorConfig } from "@/config";

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
              backgroundColor: `${colorConfig.primary}`, // Solid Ant Design primary blue
              borderColor: "#0050B3", // Darker blue for border
              // borderWidth: 1,
              borderRadius : 4
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display : false
            },
            title: {
              display: true,
              text: "Trend View Revenue Over Years",
              color : `${colorConfig.textGrayDark}`,
              font : {
                size : 14
              }
            },
          },
          scales: {
            x: {
              ticks : {
                font : {
                  size : 14
                }
              },
              title: {
                display: true,
                text: "Years",
                font : {
                  size : 14
                }
              },
              grid: {
                display: false, // Remove x-axis grid lines
              },
            },
            y: {
              ticks : {
                font : {
                  size : 14
                }
              },
              title: {
                display: true,
                text: "Revenue",
                font : {
                  size : 14
                }
              },
              beginAtZero: true,
              grid: {
                display: true, // Remove y-axis grid lines
              },
            },
          },
        },
      });
    }
  }, [trendViewForChart]);

  return (
    <div style={{ height : "100%" }}>
      <DashboardHeader
        dashboard={"Trend-View"}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
      />

      {/* Chart Section */}
      <div
        style={{
          borderRadius : "8px",
          marginTop: "24px",
          height : "90%",
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
              height: "100%",
              padding : "24px",
              paddingBottom : "8px"
            }}
          >
            <canvas height={100} ref={chartRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendViewPage;
