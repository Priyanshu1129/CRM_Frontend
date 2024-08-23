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
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.businessDevelopment.getAllBusinessDevelopments
  );
  const [businessDevelopments, setBusinessDevelopments] = useState(
    data?.businessDevelopments
  );

  const fetchAllBusinessDevelopments = useCallback(() => {
    if (
      !businessDevelopments ||
      currentPage !== Number(data?.page) ||
      pageSize !== Number(data?.limit) ||
      refresh
    ) {
      dispatch(
        getAllBusinessDevelopments({ page: currentPage, limit: pageSize })
      );
    }
  }, [
    dispatch,
    businessDevelopments,
    currentPage,
    pageSize,
    data?.page,
    data?.limit,
    refresh,
  ]);

  useEffect(() => {
    fetchAllBusinessDevelopments();
  }, [fetchAllBusinessDevelopments]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
      setBusinessDevelopments(data?.businessDevelopments);
      setLoading(false);
      setRefresh(false);
      dispatch(
        businessDevelopmentActions.clearGetAllBusinessDevelopmentsStatus()
      );
    } else if (status == "failed") {
      setLoading(false);
      setRefresh(false);
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
  }, [dispatch, status, data?.businessDevelopments, error]);
  return (
    <>
      <ListHeader
        toPath={"/business-development-master/add-business-development"}
        buttonText={"Add new business development"}
        setRefresh={setRefresh}
      />
      {view == "table" ? (
        <BusinessDevelopmentTableView
          loading={loading}
          data={businessDevelopments}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          total={data?.totalCount}
        />
      ) : (
        <BusinessDevelopmentCardView />
      )}
    </>
  );
};

export default BusinessDevelopmentMaster;
