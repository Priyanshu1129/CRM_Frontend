"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListHeader } from "@/components";
import { BusinessDevelopmentTableView } from "./components";
import { getAllBusinessDevelopments } from "@/redux/actions/businessDevelopmentAction";
import { businessDevelopmentActions } from "@/redux/slices/businessDevelopmentSlice";
import { notification } from "antd";
import { Filter } from "./components/filter";

const BusinessDevelopmentMaster = () => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [filters, setFilters] = useState({});
  const [filter, setFilter] = useState(false);

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
      refresh ||
      (filters && filter)
    ) {
      dispatch(
        getAllBusinessDevelopments({
          page: currentPage,
          limit: pageSize,
          ...filters,
        })
      );
      setFilter(false);
      setRefresh(false);
    }
  }, [
    dispatch,
    businessDevelopments,
    currentPage,
    pageSize,
    data?.page,
    data?.limit,
    refresh,
    filters,
    filter,
  ]);

  useEffect(() => {
    fetchAllBusinessDevelopments();
  }, [fetchAllBusinessDevelopments]);

  useEffect(() => {
    if (filter) {
      fetchAllBusinessDevelopments();
    }
  }, [filter, filters, fetchAllBusinessDevelopments]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
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
  }, [dispatch, status, data?.businessDevelopments, error]);

  const handleFilter = (pagination, tableFilters, sorter) => {
    let { field: currentSortField, order: currentSortOrder } = sorter || {};
    const prevSortField = prevSorterRef.current?.field;
    const prevSortOrder = prevSorterRef.current?.order;

    // Compare sorter by field and order
    const hasSorterChanged =
      currentSortField !== prevSortField || currentSortOrder !== prevSortOrder;

    prevSorterRef.current = {
      field: currentSortField,
      order: currentSortOrder,
    };

    if (hasSorterChanged) {
      // Dispatch the getAllClients action with the applied filters and sorting
      currentSortOrder = currentSortOrder == "descend" ? "-1" : "1";
      setFilters({
        ...filters,
        entryDate: currentSortField == "entryDate" ? currentSortOrder : "",
      });
      setFilter(true);
      fetchAllBusinessDevelopments();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <ListHeader
        toPath={"/mention/add-mention"}
        buttonText={"Add New Mention"}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
      />
      <div
        style={{
          flex: "1", // Takes remaining space below header
          overflow: "hidden", // Prevent overflow
          borderRadius: "8px",
        }}
      >
        <BusinessDevelopmentTableView
          loading={loading}
          data={businessDevelopments}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          total={data?.totalCount}
          handleFilter={handleFilter}
        />
      </div>
    </div>
  );
};

export default BusinessDevelopmentMaster;
