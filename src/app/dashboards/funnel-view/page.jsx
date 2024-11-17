"use client";
import React, { useState } from "react";
import { Filter, DashboardHeader } from "../components";
import { useFetchFunnelView } from "@/hooks/dashboards";
import moment from "moment";
import { FullScreenLoading } from "@/components";
import { FunnelChart, ConversionRates, Doughnut } from "./components";
import { Row, Col } from "antd";

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
           <Row gutter={12}>
            <Col span={18}>
            <FunnelChart funnelStats={funnelViewData?.funnelStats} />
            </Col>
            <Col span={6}>
            {funnelViewData?.funnelStats && (
              <Doughnut funnelStats={funnelViewData.funnelStats} />
            )}
            </Col>
            </Row>
        {conversionStats && <ConversionRates data={conversionStats} />}
      </div>
    </>
  );
};

export default FunnelView;
