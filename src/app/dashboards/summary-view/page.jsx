"use client";
import React, { useState } from "react";
import { Filter, DashboardHeader } from "../components";
import { useFetchSummaryView } from "@/hooks/dashboards";
import { SummaryCards, Heatmap, BubbleChart } from "./components";
import { Row, Col, Space, Card } from "antd";
import dayjs from "dayjs";

const SummaryView = () => {
   const [startDate, setStartDate] = useState("2020-10-10");
   const [endDate, setEndDate] = useState(new Date().toLocaleDateString('en-CA'));

  const {
    loading,
    setRefresh,
    filters,
    setFilter,
    setFilters,
    summaryViewData,
  } = useFetchSummaryView({
    startDate,
    endDate,
  });

  return (
    <>
      <DashboardHeader
        dashboard={"Summary View"}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
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
