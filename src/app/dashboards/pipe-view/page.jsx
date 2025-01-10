"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { pipeViewActions } from "@/redux/slices/dashboardSlice";
import { Filter, DashboardHeader } from "../components";
import { useCheckViewPermissions } from "@/hooks/dashboards";
import { AllPipeView, MyPipeView } from "./components/views";

const PipeView = () => {
  const { canSeeMyView, canSeeAllView, myView, setMyView } =
    useCheckViewPermissions("PIPE VIEW");
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState({});
  const [filter, setFilter] = useState(false);

  const allViewParticularDate = moment(
    useSelector((state) => state.pipeView.allViewParticularDate)
  );
  const myViewParticularDate = moment(
    useSelector((state) => state.pipeView.myViewParticularDate)
  );
  const dispatch = useDispatch();

  const handleDateChange = (newDate) => {
    if (!myView) dispatch(pipeViewActions.setAllViewParticularDate(newDate));
    else dispatch(pipeViewActions.setMyViewParticularDate(newDate));
  };

  return (
    <>
      <DashboardHeader
        dashboard={"Pipe View"}
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
          ...(canSeeAllView ? [{ value: false, label: "All Pipe View" }] : []),
          ...(canSeeMyView ? [{ value: true, label: "My Pipe View" }] : []),
        ]}
      />
      {!myView && canSeeAllView && (
        <AllPipeView
          myView={myView}
          allViewParticularDate={allViewParticularDate}
          canSeeAllView={canSeeAllView}
          setRefresh={setRefresh}
          filters={filters}
          filter={filter}
          setFilter={setFilter}
          refresh={refresh}
        />
      )}
      {myView && canSeeMyView && (
        <MyPipeView
          myView={myView}
          myViewParticularDate={myViewParticularDate}
          canSeeMyView={canSeeMyView}
          setRefresh={setRefresh}
          filters={filters}
          filter={filter}
          setFilter={setFilter}
          refresh={refresh}
        />
      )}
    </>
  );
};

export default PipeView;
