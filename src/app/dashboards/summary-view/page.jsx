"use client";
import React, { useState } from "react";
import { Filter, DashboardHeader } from "../components";
import { useFetchSummaryView } from "@/hooks/dashboards";
import moment from "moment";
import { useRouter } from "next/navigation";
import { FullScreenLoading } from "@/components";
import { SummaryCards, Heatmap } from "./components";

const SummaryView = () => {
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
  } = useFetchSummaryView({
    startDate: dateRange[0],
    endDate: dateRange[1],
  });

  const router = useRouter();

  if (loading) return <FullScreenLoading />;

  return (
    <>
      <DashboardHeader
        dashboard={"Summary View"}
        setDateRange={setDateRange}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
      />
      <SummaryCards />
      <Heatmap />
    </>
  );
};

export default SummaryView;
