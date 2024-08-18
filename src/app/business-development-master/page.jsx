"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListHeader } from "@/components";
import {
  BusinessDevelopmentTableView,
  BusinessDevelopmentCardView,
} from "./components";
import { getAllBusinessDevelopments } from "@/redux/actions/businessDevelopmentAction";
import { businessDevelopmentActions } from "@/redux/slices/businessDevelopmentSlice";
import { notification } from "antd";

const BusinessDevelopmentMaster = () => {
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.businessDevelopment.getAllBusinessDevelopments
  );
  const [businessDevelopments, setBusinessDevelopments] = useState(data?.data);

  const fetchAllBusinessDevelopments = useCallback(() => {
    if (!businessDevelopments) {
      dispatch(getAllBusinessDevelopments());
    }
  }, [dispatch, businessDevelopments]);

  useEffect(() => {
    fetchAllBusinessDevelopments();
  }, [fetchAllBusinessDevelopments]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setBusinessDevelopments(data?.businessDevelopments);
      setLoading(false);
      dispatch(
        businessDevelopmentActions.clearGetAllBusinessDevelopmentsStatus()
      );
    } else if (status == "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch businessDevelopments.",
      });
      dispatch(
        businessDevelopmentActions.clearGetAllBusinessDevelopmentsStatus()
      );
      dispatch(
        businessDevelopmentActions.clearGetAllBusinessDevelopmentsError()
      );
    }
  }, [dispatch, status]);
  return (
    <>
      <ListHeader
        toPath={"/business-development-master/add-business-development"}
        buttonText={"Add New"}
      />
      {view == "table" ? (
        <BusinessDevelopmentTableView
          loading={loading}
          data={businessDevelopments}
        />
      ) : (
        <BusinessDevelopmentCardView />
      )}
    </>
  );
};

export default BusinessDevelopmentMaster;
