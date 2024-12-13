"use client";
import React, { useState } from "react";
import { Filter, DashboardHeader } from "../components";
import { useFetchSummaryView, useFetchMySummaryView } from "@/hooks/dashboards";
import { SummaryCards, Heatmap, BubbleChart } from "./components";
import { Row, Col, Space, Card } from "antd";
import BubbleShimmer from "./components/bubbleChart/BubbleShimmer";
import { useEffect } from "react";
const SummaryView = () => {
  const [myView, setMyView] = useState(false);
  const [startDate, setStartDate] = useState("2020-10-10");
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [myViewStartDate, setMyViewStartDate] = useState("2020-10-10");
  const [myViewEndDate, setMyViewEndDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [summaryViewData, setSummaryViewData] = useState();

  const {
    loading,
    setRefresh,
    filters,
    setFilter,
    setFilters,
    summaryViewData: allViewSummaryViewData,
  } = useFetchSummaryView({
    startDate,
    endDate,
    myView,
  });

  const {
    loading: myViewLoading,
    setRefresh: setMyViewRefresh,
    filters: myViewFilters,
    setFilter: setMyViewFilter,
    setFilters: setMyViewFilters,
    summaryViewData: myViewSummaryViewData,
  } = useFetchMySummaryView({
    myViewStartDate,
    myViewEndDate,
    myView,
  });

  useEffect(() => {
    if (!loading && !myViewLoading)
      setSummaryViewData(
        myView ? myViewSummaryViewData : allViewSummaryViewData
      );
  }, [
    myView,
    myViewSummaryViewData,
    allViewSummaryViewData,
    loading,
    myViewLoading,
  ]);

  return (
    <>
      <DashboardHeader
        dashboard={"Summary View"}
        setStartDate={myView ? setMyViewStartDate : setStartDate}
        setEndDate={myView ? setMyViewEndDate : setEndDate}
        setRefresh={myView ? setMyViewRefresh : setRefresh}
        setFilter={myView ? setMyViewFilter : setFilter}
        setFilters={myView ? setMyViewFilters : setFilters}
        filters={myView ? myViewFilters : filters}
        myView={myView}
        setMyView={setMyView}
        FilterComponent={Filter}
        myViewButtonText="My Summary View"
      />

      <Space direction="vertical" style={{ width: "100%" }}>
        {/* Summary Cards */}
        <SummaryCards
          loading={loading || myViewLoading}
          data={summaryViewData}
        />

        <Row style={{}} gutter={[18, 18]}>
          {/* Left side - Heatmap */}
          <Col xs={24} lg={12}>
            <Heatmap myView={myView} />
          </Col>

          {/* Right side - Bubble charts */}
          <Col xs={24} sm={12} lg={6}>
            {loading || myViewLoading ? (
              <BubbleShimmer />
            ) : (
              <BubbleChart
                opportunityDistribution={
                  summaryViewData?.opportunityDistribution
                }
                loading={loading || myViewLoading}
              />
            )}
          </Col>
          <Col xs={24} sm={12} lg={6}>
            {loading || myViewLoading ? (
              <BubbleShimmer />
            ) : (
              <BubbleChart
                opportunityDistribution={
                  summaryViewData?.opportunityDistribution
                }
                loading={loading || myViewLoading}
              />
            )}
          </Col>
        </Row>
      </Space>
    </>
  );
};

export default SummaryView;
