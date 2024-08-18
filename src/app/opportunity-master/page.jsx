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
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.opportunity.getAllOpportunities
  );
  const [opportunities, setOpportunities] = useState(data?.data);

  const fetchAllOpportunities = useCallback(() => {
    if (!opportunities) {
      dispatch(getAllOpportunities());
    }
  }, [dispatch, opportunities]);

  useEffect(() => {
    fetchAllOpportunities();
  }, [fetchAllOpportunities]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setOpportunities(data?.opportunities);
      setLoading(false);
      dispatch(opportunityActions.clearGetAllOpportunitiesStatus());
    } else if (status == "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch opportunities.",
      });
      dispatch(opportunityActions.clearGetAllOpportunitiesStatus());
      dispatch(opportunityActions.clearGetAllOpportunitiesError());
    }
  }, [dispatch, status]);
  return (
    <>
      <ListHeader
        toPath={"/opportunity-master/add-opportunity"}
        buttonText={"Add new opportunity"}
      />
      {view == "table" ? (
        <OpportunitiesTableView data={opportunities} loading={loading} />
      ) : (
        <OpportunitiesCardView />
      )}
    </>
  );
};

export default OpportunityMaster;
