"use client";
import React from "react";
import { Grid, Space, theme } from "antd";
import { UpdateOpportunityForm } from "../components/update-opportunity-form";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";
import { useFetchOpportunityDetails } from "@/hooks/opportunity";

const OpportunityDetails = () => {
  const screens = Grid.useBreakpoint();
  const { id } = useParams();

  const { loading, opportunity } = useFetchOpportunityDetails(id);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
