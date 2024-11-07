"use client";
import React, { useState, useEffect } from "react";
import { Filter, DashboardHeader } from "../components";
import { useFetchFunnelView } from "@/hooks/dashboards";
import { Text } from "@/components";
import moment from "moment";
import { useRouter } from "next/navigation";
import { FullScreenLoading } from "@/components";
import { FunnelChart, ConversionRates, Doughnut } from "./components";
import { Space } from "antd";

const doughnutData = {
  labels: ["Product A", "Product B", "Product C"],
  datasets: [
    {
      label: "Sales Distribution",
      data: [300, 50, 100],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      hoverOffset: 4,
      // borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
  },
};

const FunnelView = () => {
  const [dateRange, setDateRange] = useState([
    moment(),
    moment("2020-10-10", "YYYY-MM-DD"),
  ]);

  const {
    loading,
    setRefresh,
    filters,
    setFilter,
    setFilters,
    funnelViewData,
    conversionStats,
  } = useFetchFunnelView({
    startDate: dateRange[0],
    endDate: dateRange[1],
  });

  console.log("funnel data", funnelViewData);
  const router = useRouter();

  if (loading) return <FullScreenLoading />;

  return (
    <>
      <DashboardHeader
        dashboard={"Funnel View"}
        setDateRange={setDateRange}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
      />
      <div style={{ width: "100%", marginTop: "20px" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "20px",
          }}
        >
          <div style={{ width: "100%" }}>
            <FunnelChart funnelStats={funnelViewData?.funnelStats} />
          </div>
          <div style={{ width: "300px" }}>
            {funnelViewData?.funnelStats && (
              <Doughnut funnelStats={funnelViewData.funnelStats} />
            )}
          </div>
        </div>
        {conversionStats && <ConversionRates data={conversionStats} />}
      </div>
    </>
  );
};

export default FunnelView;
