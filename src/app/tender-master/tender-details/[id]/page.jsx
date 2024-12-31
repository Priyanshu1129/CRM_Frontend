"use client";
import React from "react";
import { Grid, Space, theme } from "antd";
import { UpdateTenderForm } from "../components/update-tender-form";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";
import { useFetchTenderDetails } from "@/hooks/tender";

const TenderDetails = () => {
  const screens = Grid.useBreakpoint();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { id } = useParams();
  const { loading, tender } = useFetchTenderDetails(id);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <FormHeader backButtonText="Back to Tenders" />
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
        {loading ? <FullScreenLoading /> : <UpdateTenderForm tender={tender} />}
      </Space>
    </div>
  );
};
export default TenderDetails;
