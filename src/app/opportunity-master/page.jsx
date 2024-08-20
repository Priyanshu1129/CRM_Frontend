"use client";
import React, { useState, useEffect, useCallback } from "react";
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
        />
      ) : (
        <OpportunitiesCardView />
      )}
    </>
  );
};

export default OpportunityMaster;
