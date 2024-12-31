"use client";
import React, { useState } from "react";
import { Grid, notification, Space, theme } from "antd";
import { UpdateRegistrationForm } from "../components/update-registration-form.jsx";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";
import { useFetchRegistrationDetails } from "@/hooks/registration/useFetchRegistrationDetails.js";

const RegistrationDetails = () => {
  const screens = Grid.useBreakpoint();

  const { id } = useParams();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loading, registration } = useFetchRegistrationDetails(id);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <FormHeader backButtonText="Back to Registrations" />
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
          <UpdateRegistrationForm registration={registration} />
        )}
      </Space>
    </div>
  );
};
export default RegistrationDetails;
