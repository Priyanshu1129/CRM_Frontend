"use client";
import React from "react";
import { Grid, Space, theme } from "antd";
import { UpdateOpportunityForm } from "../components/update-opportunity-form";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";
import { useFetchOpportunityDetails } from "@/hooks/deal";

const OpportunityDetails = () => {
  const screens = Grid.useBreakpoint();
  const { id } = useParams();

  const { loading, opportunity } = useFetchOpportunityDetails(id);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <FormHeader backButtonText="Back to Deals" />
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
          <UpdateOpportunityForm opportunity={opportunity} />
        )}
      </Space>
    </div>
  );
};
export default OpportunityDetails;
