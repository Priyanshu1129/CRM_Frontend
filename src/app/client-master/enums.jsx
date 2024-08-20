"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClassifications,
  getAllIncorporationTypes,
  getAllRelationshipStatus,
} from "@/redux/actions/clientAction";
import { Select, Form } from "antd";

export const ClassificationsSelector = ({ label, name, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.classification.getAllClassifications
  );
  const [classifications, setClassifications] = useState(data?.data);

  const fetchAllClassifications = useCallback(() => {
    if (!classifications) {
      dispatch(getAllClassifications());
    }
  }, [dispatch, classifications]);

  useEffect(() => {
    fetchAllClassifications();
  }, [fetchAllClassifications]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      console.log("success-inside");
      setClassifications(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select
        showSearch
        loading={loading}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {classifications?.map((classification, idx) => (
          <Select.Option key={idx} value={classification._id}>
            {classification.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const IncorporationTypesSelector = ({ label, name, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.incorporationType.getAllIncorporationTypes
  );
  const [incorporationTypes, setIncorporationTypes] = useState(data?.data);

  const fetchAllIncorporationTypes = useCallback(() => {
    if (!incorporationTypes) {
      dispatch(getAllIncorporationTypes());
    }
  }, [dispatch, incorporationTypes]);

  useEffect(() => {
    fetchAllIncorporationTypes();
  }, [fetchAllIncorporationTypes]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      console.log("success-inside");
      setIncorporationTypes(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);
  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select
        loading={loading}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {incorporationTypes?.map((incorporationType, idx) => (
          <Select.Option key={idx} value={incorporationType._id}>
            {incorporationType.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const RelationshipStatusSelector = ({ label, name, rules }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.relationshipStatus.getAllRelationshipStatus
  );
  const [relationshipStatus, setRelationshipStatus] = useState(data?.data);

  const fetchAllRelationshipStatus = useCallback(() => {
    if (!relationshipStatus) {
      dispatch(getAllRelationshipStatus());
    }
  }, [dispatch, relationshipStatus]);

  useEffect(() => {
    fetchAllRelationshipStatus();
  }, [fetchAllRelationshipStatus]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      console.log("success-inside");
      setRelationshipStatus(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select
        loading={loading}
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {relationshipStatus?.map((relationshipStatus, idx) => (
          <Select.Option key={idx} value={relationshipStatus._id}>
            {relationshipStatus.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export const MarketCapSelector = ({ label, name, rules }) => {
  const marketCaps = [
    {
      label: "Rs 200k Cr + (Large)",
    },
    {
      label: "Rs 5k - 20k Cr (Mid)",
    },
    {
      label: "< Rs 5k Cr Small Cap",
    },
    {
      label: "10B $+",
    },
    {
      label: "1 - 10B $ +",
    },
    {
      label: "0.5-1B $ + ",
    },
    {
      label: "100-500M $",
    },
    {
      label: "10-100M $",
    },
  ];

  return (
    <Form.Item label={label} name={name} rules={rules}>
      <Select
        showSearch
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.children?.toLowerCase().includes(input.toLowerCase())
        }
      >
        {marketCaps?.map((marketCap, idx) => (
          <Select.Option key={idx} value={marketCap.label}>
            {marketCap.label}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};
