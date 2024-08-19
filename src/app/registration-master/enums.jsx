"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRegistrationStatus } from "@/redux/actions/registrationAction";
import { Select, Form } from "antd";

export const RegistrationStatusSelector = ({ label, name, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.registrationStatus.getAllRegistrationStatus
  );
  const [registrationStatus, setRegistrationStatus] = useState(data?.data);

  const fetchAllRegistrationStatus = useCallback(() => {
    if (!registrationStatus) {
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
    <Form.Item label={label} name={name} rules={rules}>
      <Select showSearch loading={loading}>
        {registrationStatus?.map(({ label, _id }, idx) => (
          <Select.Option key={idx} value={_id}>
            {label ?? "Missing Value"}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
