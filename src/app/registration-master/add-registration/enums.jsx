"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRegistrationStatus } from "@/redux/actions/registrationAction";
import { Select } from "antd";

export const RegistrationStatusSelector = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.registrationStatus.getAllRegistrationStatus
  );
  const [registrationStatus, setRegistrationStatus] = useState(
    data?.data || []
  );

  const fetchAllRegistrationStatus = useCallback(() => {
    if (!registrationStatus.length) {
      dispatch(getAllRegistrationStatus());
    }
  }, [dispatch, registrationStatus]);

  useEffect(() => {
    fetchAllRegistrationStatus();
  }, [fetchAllRegistrationStatus]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      console.log("success-inside");
      setRegistrationStatus(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Select>
      {registrationStatus.map((item, idx) => (
        <Select.Option key={idx} value={item._id}>
          {item.label}
        </Select.Option>
      ))}
    </Select>
  );
};
