"use client";
import React, { useState } from "react";
import { Row, Col } from "antd";
import { colorConfig } from "@/config";
import { useFetchSummaryView } from "@/hooks/dashboards";
import { useDispatch } from "react-redux";

const entities = ["Overall", "Territory", "Industry", "Solution"];

const SummaryView = () => {
  console.log("inside summary view dashboard");
  const dispatch = useDispatch();
  const [year, setYear] = useState(new Date().getFullYear());
  const { loading, summaryViewData, setRefresh } = useFetchSummaryView({
    year,
  });

  const handleYearChange = (value) => {
    setYear(value);
  };
  console.log("summary view", loading, summaryViewData);
  return <></>;
};

export default SummaryView;
