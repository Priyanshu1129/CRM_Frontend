"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ListHeader } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { OpportunitiesTableView, OpportunitiesCardView } from "./components";
import { notification } from "antd";
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import { getAllOpportunities } from "@/redux/actions/opportunityAction";

const OpportunityMaster = () => {
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const prevFiltersRef = useRef({});
  const prevSorterRef = useRef({});
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.opportunity.getAllOpportunities
  );
  const [opportunities, setOpportunities] = useState(data?.opportunities);

  const fetchAllOpportunities = useCallback(() => {
    console.log("Fetching opportunities with:", {
      opportunities,
      currentPage,
      pageSize,
      dataPage: data?.page,
      dataLimit: data?.limit,
    });
    if (
      !opportunities ||
      currentPage !== Number(data?.page) ||
      pageSize !== Number(data?.limit) ||
      refresh
    ) {
      dispatch(getAllOpportunities({ page: currentPage, limit: pageSize }));
    }
  }, [
    dispatch,
    opportunities,
    currentPage,
    pageSize,
    data?.page,
    data?.limit,
    refresh,
  ]);

  useEffect(() => {
    fetchAllOpportunities();
  }, [fetchAllOpportunities]);

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
        getAllOpportunities({
          industry,
          subIndustry,
          territory,
          enteredBy,
          entryDate: currentSortField == "entryDate" ? currentSortOrder : "1",
        })
      );
    }
  };

  return (
    <>
      <ListHeader
        toPath={"/opportunity-master/add-opportunity"}
        buttonText={"Add new opportunity"}
        SearchType={"opportunity"}
        setRefresh={setRefresh}
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
