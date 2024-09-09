"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ListHeader } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { OpportunitiesTableView, OpportunitiesCardView } from "./components";
import { notification } from "antd";
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import { getAllOpportunities } from "@/redux/actions/opportunityAction";
import { Filter } from "./components/filter";

const OpportunityMaster = () => {
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [filters, setFilters] = useState({});
  const [filter, setFilter] = useState(false);
  const prevSorterRef = useRef({});
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.opportunity.getAllOpportunities
  );
  const [opportunities, setOpportunities] = useState(data?.opportunities);

  const fetchAllOpportunities = useCallback(() => {
    if (
      !opportunities ||
      currentPage !== Number(data?.page) ||
      pageSize !== Number(data?.limit) ||
      refresh ||
      (filters && filter)
    ) {
      dispatch(
        getAllOpportunities({ page: currentPage, limit: pageSize, ...filters })
      );
      setFilter(false);
    }
  }, [
    dispatch,
    opportunities,
    currentPage,
    pageSize,
    data?.page,
    data?.limit,
    refresh,
    filters,
    filter,
  ]);

  useEffect(() => {
    fetchAllOpportunities();
  }, [fetchAllOpportunities]);

  useEffect(() => {
    if (filter) {
      fetchAllOpportunities();
    }
  }, [filter, filters, fetchAllOpportunities]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
      setOpportunities(data?.opportunities);
      setLoading(false);
      setRefresh(false);
      dispatch(opportunityActions.clearGetAllOpportunitiesStatus());
    } else if (status == "failed") {
      setLoading(false);
      setRefresh(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch opportunities.",
      });
      dispatch(opportunityActions.clearGetAllOpportunitiesStatus());
      dispatch(opportunityActions.clearGetAllOpportunitiesError());
    }
  }, [dispatch, status, data?.opportunities, error]);

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
      fetchAllOpportunities();
    }
  };

  return (
    <>
      <ListHeader
        toPath={"/opportunity-master/add-opportunity"}
        buttonText={"Add new opportunity"}
        pageName={"opportunity"}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
      />
      {view == "table" ? (
        <OpportunitiesTableView
          data={opportunities}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          loading={loading}
          total={data?.totalCount}
          handleFilter={handleFilter}
        />
      ) : (
        <OpportunitiesCardView />
      )}
    </>
  );
};

export default OpportunityMaster;
