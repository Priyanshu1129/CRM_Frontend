"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClassifications,
  getAllIncorporationTypes,
  getAllRelationshipStatus,
} from "@/redux/actions/clientAction";
import { Select } from "antd";

export const ClassificationsSelector = () => {
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
    <Select>
      {classifications?.map((classification, idx) => (
        <Select.Option key={idx} value={classification._id}>
          {classification.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export const IncorporationTypesSelector = () => {
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
    <Select>
      {incorporationTypes?.map((incorporationType, idx) => (
        <Select.Option key={idx} value={incorporationType._id}>
          {incorporationType.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export const RelationshipStatusSelector = () => {
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
    <Select>
      {relationshipStatus?.map((relationshipStatus, idx) => (
        <Select.Option key={idx} value={relationshipStatus._id}>
          {relationshipStatus.label}
        </Select.Option>
      ))}
    </Select>
  );
};
