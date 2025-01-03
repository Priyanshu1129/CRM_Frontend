"use client";
import React, { useState } from "react";
import { Grid, notification, Space, theme } from "antd";
import { UpdateClientForm } from "../components/update-client-form";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";
import { useFetchClientDetails } from "@/hooks/client";

const ClientDetails = () => {
  const screens = Grid.useBreakpoint();
  const { id } = useParams();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loading, client } = useFetchClientDetails(id);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <FormHeader backButtonText="Back to Clients" />
      <Space
        direction="vertical"
        style={{
          marginTop: "24px",
          width: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: screens.xs ? "16px" : "32px",
          // flex: "1", // Takes remaining space below header
          overflowY: "scroll", // Prevent overflow
          scrollbarWidth: "none",
          borderRadius: "8px",
        }}
      >
        {loading ? <FullScreenLoading /> : <UpdateClientForm client={client} />}
      </Space>
    </div>
  );
};
export default ClientDetails;
