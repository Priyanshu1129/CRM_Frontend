"use client";
import React, { useState } from "react";
import { Filter, DashboardHeader } from "../components";
import { useFetchFunnelView } from "@/hooks/dashboards";
import moment from "moment";
import { FullScreenLoading } from "@/components";
import { FunnelChart, ConversionRates, Doughnut } from "./components";
import { Row, Col } from "antd";
import dayjs from "dayjs";

// const FunnelView = () => {
//   const [startDate, setStartDate] = useState("2020-10-10");
//    const [endDate, setEndDate] = useState(new Date().toLocaleDateString('en-CA'));

//   const {
//     loading,
//     setRefresh,
//     filters,
//     setFilter,
//     setFilters,
//     funnelViewData,
//     conversionStats,
//   } = useFetchFunnelView({
//     startDate,
//     endDate,
//   });

//   if (loading) return <FullScreenLoading />;

//   return (
//     <>
//       <DashboardHeader
//         dashboard={"Funnel View"}
//         setStartDate={setStartDate}
//         setEndDate={setEndDate}
//         setRefresh={setRefresh}
//         setFilter={setFilter}
//         setFilters={setFilters}
//         filters={filters}
//         FilterComponent={Filter}
//       />
//       <div style={{ width: "100%", marginTop: "20px" }}>
//         <Row gutter={12}>
//           <Col span={18}>
//             <FunnelChart funnelStats={funnelViewData?.funnelStats} />
//           </Col>
//           <Col span={6}>
//             {funnelViewData?.funnelStats && (
//               <Doughnut funnelStats={funnelViewData.funnelStats} />
//             )}
//           </Col>
//         </Row>
//         {conversionStats && <ConversionRates data={conversionStats} />}
//       </div>
//     </>
//   );
// };

// export default FunnelView;


const FunnelView = () => {
  // const [startDate, setStartDate] = useState("2020-10-10");
  const [particularDate, setParticularDate] = useState(moment());

  const {
    loading,
    setRefresh,
    filters,
    setFilter,
    setFilters,
    funnelViewData,
    conversionStats,
  } = useFetchFunnelView({
    particularDate
  });


  return (
    <>
      <DashboardHeader
        dashboard={"Funnel View"}
        setDate={setParticularDate}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
      />
       {(loading) ?  <FullScreenLoading /> : 
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
}
    </>
  );
};

export default React.memo(FunnelView);
