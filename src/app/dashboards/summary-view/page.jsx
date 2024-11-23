"use client";
import React, { useState } from "react";
import { Filter, DashboardHeader } from "../components";
import { useFetchSummaryView } from "@/hooks/dashboards";
import { SummaryCards, Heatmap, BubbleChart } from "./components";
import { Row, Col, Space, Card } from "antd";
import dayjs from "dayjs";

const SummaryView = () => {
  const [dateRange, setDateRange] = useState([
    dayjs("2020-10-10", "YYYY-MM-DD"),
    dayjs(new Date()),
  ]);

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
