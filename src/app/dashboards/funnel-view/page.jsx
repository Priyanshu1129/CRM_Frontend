"use client";
import React, { useEffect, useState } from "react";
import { Filter, DashboardHeader } from "../components";
import moment from "moment";
import { FullScreenLoading } from "@/components";
import { FunnelChart, ConversionRates, Doughnut } from "./components";
import { Row, Col } from "antd";
import { useFetchFunnelView, useFetchMyFunnelView } from "@/hooks/dashboards";

const FunnelView = () => {
  const [particularDate, setParticularDate] = useState(moment());
  const [myViewParticularDate, setMyViewParticularDate] = useState(moment());

  const [myView, setMyView] = useState(false);
  const [funnelViewData, setFunnelViewData] = useState(null);

  const {
    loading,
    setRefresh,
    filters,
    setFilter,
    setFilters,
    funnelViewData: allViewFunnelViewData,
    conversionStats,
  } = useFetchFunnelView({
    particularDate,
    myView,
  });

  const {
    loading: myViewLoading,
    setRefresh: myViewSetRefresh,
    filters: myViewFilters,
    setFilter: myViewSetFilter,
    setFilters: myViewSetFilters,
    funnelViewData: myViewFunnelViewData,
    conversionStats: myViewConversionStats,
  } = useFetchMyFunnelView({
    myViewParticularDate,
    myView,
  });

  useEffect(() => {
    if (!loading && !myViewLoading)
      setFunnelViewData(myView ? myViewFunnelViewData : allViewFunnelViewData);
  }, [
    myView,
    myViewFunnelViewData,
    allViewFunnelViewData,
    loading,
    myViewLoading,
  ]);

  return (
    <>
      <DashboardHeader
        dashboard={"Funnel View"}
        setDate={myView ? setMyViewParticularDate : setParticularDate}
        setRefresh={myView ? myViewSetRefresh : setRefresh}
        setFilter={myView ? myViewSetFilter : setFilter}
        setFilters={myView ? myViewSetFilters : setFilters}
        myView={myView}
        setMyView={setMyView}
        filters={myView ? myViewFilters : filters}
        FilterComponent={Filter}
      />
      {loading || myViewLoading ? (
        <FullScreenLoading />
      ) : (
        <div style={{ width: "100%", marginTop: "20px" }}>
          <Row gutter={[18, 18]}>
            <Col xs={24} lg={18}>
              <FunnelChart funnelStats={funnelViewData?.funnelStats} />
            </Col>
            <Col xs={24} lg={6}>
              {funnelViewData?.funnelStats && (
                <Doughnut
                  funnelStats={funnelViewData.funnelStats}
                  wonCount={funnelViewData.wonCount}
                />
              )}
            </Col>
          </Row>
          {conversionStats && (
              <ConversionRates
                data={ conversionStats}
              />
            )}
        </div>
      )}
    </>
  );
};

export default React.memo(FunnelView);
