"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStages } from "@/redux/actions/tenderAction";
import { Select } from "antd";

export const StageSelector = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.stage.getAllStages
  );
  const [stages, setStages] = useState(data?.data);

  const fetchAllStages = useCallback(() => {
    if (!stages) {
      dispatch(getAllStages());
    }
  }, [dispatch, stages]);

  useEffect(() => {
    fetchAllStages();
  }, [fetchAllStages]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setStages(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Select>
      {stages?.map((stage, idx) => (
        <Select.Option key={idx} value={stage._id}>
          {stage.label}
        </Select.Option>
      ))}
    </Select>
  );
};