"use client";
import React, { useState } from "react";
import { Filter, DashboardHeader } from "../components";
import { useFetchSummaryView } from "@/hooks/dashboards";
import moment from "moment";
import { SummaryCards, Heatmap, BubbleChart } from "./components";
import { Row, Col, Space, Card } from "antd";

const SummaryView = () => {
  const [dateRange, setDateRange] = useState(["2010-01-01", Date.now()]);

  const {
    loading,
    setRefresh,
    filters,
    setFilter,
    setFilters,
    summaryViewData,
  } = useFetchSummaryView({
    startDate: dateRange[0],
    endDate: dateRange[1],
  });

  console.log("date-range-changed", dateRange);

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

      <Space direction="vertical" style={{ width: "100%" }}>
        {/* Summary Cards */}
        <SummaryCards loading={loading} data={summaryViewData} />

        <Row style={{ marginTop: "0px" }} gutter={24}>
          {/* Left side - Heatmap */}
          <Col xs={24} md={12}>
            <Heatmap />
          </Col>

          {/* Right side - Bubble charts */}
          <Col xs={24} md={6}>
            <BubbleChart />
          </Col>
          <Col xs={24} md={6}>
            <BubbleChart />
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default SummaryView;
