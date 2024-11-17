"use client";
import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels); // Register the plugin

export const ChartComponent = ({ chartData, options, type }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy previous chart instance if it exists
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: type, // Dynamic chart type
      data: chartData,
      options: options,
    });
  }, [chartData, options, type]);

  return <canvas ref={chartRef} />;
};
