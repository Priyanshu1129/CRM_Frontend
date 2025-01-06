"use client";
import React, { useEffect, useState } from "react";
import { Filter, DashboardHeader } from "../components";
import moment from "moment";
import { FullScreenLoading } from "@/components";
import { FunnelChart, ConversionRates, Doughnut } from "./components";
import { Row, Col } from "antd";
import { useFetchFunnelView, useFetchMyFunnelView } from "@/hooks/dashboards";
import { funnelViewActions } from "@/redux/slices/dashboardSlice";
import { useSelector, useDispatch } from "react-redux";
import { useCheckDashboardViewPermission } from "../hooks/useCheckViewPermission";
const FunnelView = () => {
  const { hasAllView, disabledViewButton } =
    useCheckDashboardViewPermission("FUNNEL VIEW");
  const [myView, setMyView] = useState(!hasAllView);
  const particularDate = moment(
    useSelector((state) => state.funnelView.particularDate)
  );
  const myViewParticularDate = moment(
    useSelector((state) => state.funnelView.myViewParticularDate)
  );

  const [funnelViewData, setFunnelViewData] = useState(null);

  const dispatch = useDispatch();

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

  const handleDateChange = (newDate) => {
    if (!myView) dispatch(funnelViewActions.setParticularDate(newDate));
    else dispatch(funnelViewActions.setMyViewParticularDate(newDate));
  };

  return (
    <>
      <DashboardHeader
        dashboard={"Funnel View"}
        setDate={handleDateChange}
        selectedDate={myView ? myViewParticularDate : particularDate}
        setRefresh={myView ? myViewSetRefresh : setRefresh}
        setFilter={myView ? myViewSetFilter : setFilter}
        setFilters={myView ? myViewSetFilters : setFilters}
        myView={myView}
        disabledViewButton={disabledViewButton}
        setMyView={setMyView}
        filters={myView ? myViewFilters : filters}
        FilterComponent={Filter}
        myViewButtonText="My Funnel View"
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
          {conversionStats && <ConversionRates data={conversionStats} />}
        </div>
      )}
    </>
  );
};

export default React.memo(FunnelView);
