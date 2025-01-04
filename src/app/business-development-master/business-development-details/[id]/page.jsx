"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, notification, Space, theme } from "antd";
import { businessDevelopmentActions } from "@/redux/slices/businessDevelopmentSlice";
import { UpdateBusinessDevelopmentForm } from "../../components/update-business-development";
import { getBusinessDevelopment } from "@/redux/actions/businessDevelopmentAction";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";

const BusinessDevelopmentDetails = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const { status, error, data } = useSelector(
    (state) => state.businessDevelopment.getBusinessDevelopment
  );
  const { id } = useParams();

  const [businessDevelopment, setBusinessDevelopment] = useState(data?.data);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchBusinessDevelopmentDetails = useCallback(() => {
    if (
      (!businessDevelopment && id) ||
      id !== String(businessDevelopment?._id)
    ) {
      dispatch(getBusinessDevelopment(id));
    }
  }, [dispatch, id, businessDevelopment]);

  useEffect(() => {
    fetchBusinessDevelopmentDetails();
  }, [fetchBusinessDevelopmentDetails]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setBusinessDevelopment(null);
      setLoading(false);
      dispatch(businessDevelopmentActions.clearGetBusinessDevelopmentStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch businessDevelopment.",
      });
      dispatch(businessDevelopmentActions.clearGetBusinessDevelopmentStatus());
      dispatch(businessDevelopmentActions.clearGetBusinessDevelopmentError());
    }
  }, [status, error, data?.data, dispatch]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <FormHeader backButtonText="Back to BusinessDevelopments" />
      <Space
        direction="vertical"
        style={{
          marginTop: "24px",
          width: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: screens.xs ? "16px" : "32px",
          // flex: "1", // Takes remaining space below header
          overflow: "scroll", // Prevent overflow
          scrollbarWidth: "none",
        }}
      >
        {loading ? (
          <FullScreenLoading />
        ) : (
          <UpdateBusinessDevelopmentForm
            businessDevelopment={businessDevelopment}
          />
        )}
      </Space>
    </div>
  );
};
export default BusinessDevelopmentDetails;
