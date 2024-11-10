// "use client";
// import React, { useState } from "react";
// import { Filter, DashboardHeader } from "../components";
// import { useFetchSummaryView } from "@/hooks/dashboards";
// import moment from "moment";
// import { useRouter } from "next/navigation";
// import { FullScreenLoading } from "@/components";
// import { SummaryCards, Heatmap, BubbleChart } from "./components";

// const SummaryView = () => {
//   const [dateRange, setDateRange] = useState([
//     moment(),
//     moment("2020-10-10", "YYYY-MM-DD"),
//   ]);

//   const {
//     loading,
//     setRefresh,
//     filters,
//     setFilter,
//     setFilters,
//     funnelViewData,
//     conversionStats,
//   } = useFetchSummaryView({
//     startDate: dateRange[0],
//     endDate: dateRange[1],
//   });

//   const router = useRouter();

//   if (loading) return <FullScreenLoading />;

//   return (
//     <>
//       <DashboardHeader
//         dashboard={"Summary View"}
//         setDateRange={setDateRange}
//         setRefresh={setRefresh}
//         setFilter={setFilter}
//         setFilters={setFilters}
//         filters={filters}
//         FilterComponent={Filter}
//       />
//       <SummaryCards />
//       <Heatmap />
//       <BubbleChart />
//       <BubbleChart />
//     </>
//   );
// };

// export default SummaryView;

"use client";
import React, { useState } from "react";
import { Filter, DashboardHeader } from "../components";
import { useFetchSummaryView } from "@/hooks/dashboards";
import moment from "moment";
import { useRouter } from "next/navigation";
import { FullScreenLoading } from "@/components";
import { SummaryCards, Heatmap, BubbleChart } from "./components";
import { Row, Col, Space, Card } from "antd";

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

      <Space direction="vertical" style={{ width: "100%" }}>
        {/* Summary Cards */}
        <SummaryCards />

        <Row style={{ marginTop: "16px" }} gutter={24}>
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
