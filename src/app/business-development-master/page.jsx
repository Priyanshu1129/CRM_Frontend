"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
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
  const prevFiltersRef = useRef({});
  const prevSorterRef = useRef({});
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

  const handleFilter = (pagination, filters, sorter) => {
    let { field: currentSortField, order: currentSortOrder } = sorter || {};
    const prevSortField = prevSorterRef.current?.field;
    const prevSortOrder = prevSorterRef.current?.order;

    // Compare filters
    const hasFiltersChanged =
      JSON.stringify(filters) !== JSON.stringify(prevFiltersRef.current);

    // Compare sorter by field and order
    const hasSorterChanged =
      currentSortField !== prevSortField || currentSortOrder !== prevSortOrder;

    // Update refs with the current filters and sorter
    prevFiltersRef.current = filters;
    prevSorterRef.current = {
      field: currentSortField,
      order: currentSortOrder,
    };

    if (hasFiltersChanged || hasSorterChanged) {
      const industry = filters?.industry || "";
      const subIndustry = filters?.subIndustry || "";
      const territory = filters?.territory || "";
      const enteredBy = filters?.enteredBy || "";

      // Dispatch the getAllClients action with the applied filters and sorting
      currentSortOrder = currentSortOrder == "descend" ? "-1" : "1";
      dispatch(
        getAllBusinessDevelopments({
          industry,
          subIndustry,
          territory,
          enteredBy,
          entryDate: currentSortField == "entryDate" ? currentSortOrder : "",
        })
      );
    }
  };

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
          handleFilter={handleFilter}
        />
      ) : (
        <BusinessDevelopmentCardView />
      )}
    </>
  );
};

export default BusinessDevelopmentMaster;
