"use client";
import React, { useState } from "react";
import { Filter, DashboardHeader } from "../components";
import moment from "moment";
import { funnelViewActions } from "@/redux/slices/dashboardSlice";
import { useSelector, useDispatch } from "react-redux";
import { useCheckViewPermissions } from "@/hooks/dashboards";
import { AllFunnelView, MyFunnelView } from "./components/views";

const FunnelView = () => {
  const { canSeeMyView, canSeeAllView, myView, setMyView } =
    useCheckViewPermissions("FUNNEL VIEW");
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState({});
  const [filter, setFilter] = useState(false);
  const allViewParticularDate = moment(
    useSelector((state) => state.funnelView.allViewParticularDate)
  );
  const myViewParticularDate = moment(
    useSelector((state) => state.funnelView.myViewParticularDate)
  );

  const dispatch = useDispatch();

  const handleDateChange = (newDate) => {
    if (!myView) dispatch(funnelViewActions.setAllViewParticularDate(newDate));
    else dispatch(funnelViewActions.setMyViewParticularDate(newDate));
  };

  return (
    <>
      <DashboardHeader
        dashboard={"Funnel View"}
        setDate={handleDateChange}
        selectedDate={myView ? myViewParticularDate : allViewParticularDate}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        myView={myView}
        setMyView={setMyView}
        filters={filters}
        FilterComponent={Filter}
        viewOptions={[
          ...(canSeeAllView
            ? [{ value: false, label: "All Funnel View" }]
            : []),
          ...(canSeeMyView ? [{ value: true, label: "My Funnel View" }] : []),
        ]}
      />
      {canSeeAllView && !myView && (
        <AllFunnelView
          allViewParticularDate={allViewParticularDate}
          myView={myView}
          canSeeAllView={canSeeAllView}
          refresh={refresh}
          filter={filter}
          filters={filters}
          setFilter={setFilter}
          setRefresh={setRefresh}
        />
      )}
      {canSeeMyView && myView && (
        <MyFunnelView
          myViewParticularDate={myViewParticularDate}
          myView={myView}
          canSeeMyView={canSeeMyView}
          refresh={refresh}
          filter={filter}
          filters={filters}
          setFilter={setFilter}
          setRefresh={setRefresh}
        />
      )}
    </>
  );
};

export default React.memo(FunnelView);
