"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, notification, Space, theme } from "antd";
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import { UpdateOpportunityForm } from "../../components/update-opportunity-form";
import { getOpportunity } from "@/redux/actions/opportunityAction";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";

const OpportunityDetails = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const { status, error, data } = useSelector(
    (state) => state.opportunity.getOpportunity
  );
  const { id } = useParams();

  const [opportunity, setOpportunity] = useState(data?.data);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchOpportunityDetails = useCallback(() => {
    if ((!opportunity && id) || id !== String(opportunity?._id)) {
      dispatch(getOpportunity(id));
    }
  }, [dispatch, id, opportunity]);

  useEffect(() => {
    fetchOpportunityDetails();
  }, [fetchOpportunityDetails]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setOpportunity(data?.data);
      setLoading(false);
      dispatch(opportunityActions.clearGetOpportunityStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch opportunity.",
      });
      dispatch(opportunityActions.clearGetOpportunityStatus());
      dispatch(opportunityActions.clearGetOpportunityError());
    }
  }, [status, error, data?.data, dispatch]);

  return (
    <>
      <FormHeader backButtonText="Back to Opportunities" />
      <Space
        direction="vertical"
        style={{
          marginTop: "28px",
          width: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: screens.xs ? "16px" : "32px",
        }}
      >
        {loading ? (
          <FullScreenLoading />
        ) : (
          <UpdateOpportunityForm opportunity={opportunity} />
        )}
      </Space>
    </>
  );
};
export default OpportunityDetails;
