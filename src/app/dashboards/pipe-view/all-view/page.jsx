"use client";
import React from "react";
import { useFetchPipeView } from "@/hooks/dashboards";
import PipeView from "../components/pipe-view";
import moment from "moment";
import { useSelector } from "react-redux";
const AllView = () => {
  const particularDate = moment(
    useSelector((state) => state.pipeView.particularDate)
  );
  const { loading, setRefresh, opportunities, filters, setFilter, setFilters } =
    useFetchPipeView({ particularDate });
  return (
    <PipeView
      setRefresh={setRefresh}
      opportunities={opportunities}
      filters={filters}
      setFilter={setFilter}
      setFilters={setFilters}
      loading={loading}
      myView={false}
      particularDate={particularDate}
    />
  );
};

export default AllView;
