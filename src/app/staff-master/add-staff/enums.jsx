"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllArcheTypes,
  getAllRelationshipDegrees,
} from "@/redux/actions/contactAction";
import { Select } from "antd";

export const ArcheTypeSelector = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.archeType.getAllArcheTypes
  );
  const [archeTypes, setArcheTypes] = useState(data?.data);

  const fetchAllArcheTypes = useCallback(() => {
    if (!archeTypes) {
      dispatch(getAllArcheTypes());
    }
  }, [dispatch, archeTypes]);

  useEffect(() => {
    fetchAllArcheTypes();
  }, [fetchAllArcheTypes]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      console.log("success-inside");
      setArcheTypes(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Select>
      {archeTypes?.map((archeType, idx) => (
        <Select.Option key={idx} value={archeType._id}>
          {archeType.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export const RelationshipDegreeSelector = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.relationshipDegree.getAllRelationshipDegrees
  );
  const [relationshipDegrees, setRelationshipDegrees] = useState(data?.data);

  const fetchAllRelationshipDegrees = useCallback(() => {
    if (!relationshipDegrees) {
      dispatch(getAllRelationshipDegrees());
    }
  }, [dispatch, relationshipDegrees]);

  useEffect(() => {
    fetchAllRelationshipDegrees();
  }, [fetchAllRelationshipDegrees]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setRelationshipDegrees(data?.data);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [status, data]);

  return (
    <Select>
      {relationshipDegrees?.map((relationshipDegree, idx) => (
        <Select.Option key={idx} value={relationshipDegree._id}>
          {relationshipDegree.label}
        </Select.Option>
      ))}
    </Select>
  );
};
