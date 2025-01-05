"use client";
import React from "react";
import PipeView from "../components/pipe-view";
import { useFetchMyPipeView } from "@/hooks/dashboards";
import moment from "moment";
import { useSelector } from "react-redux";

const MyView = () => {
  const particularDate = moment(
    useSelector((state) => state.pipeView.myViewParticularDate)
  );
  const { loading, setRefresh, opportunities, filters, setFilter, setFilters } =
    useFetchMyPipeView({
      particularDate,
    });
  return (
    <PipeView
      setRefresh={setRefresh}
      opportunities={opportunities}
      filters={filters}
      setFilter={setFilter}
      setFilters={setFilters}
      loading={loading}
      myView={true}
      particularDate={particularDate}
    />
  );
};

export default MyView;
