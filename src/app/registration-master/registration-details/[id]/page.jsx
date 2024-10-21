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
    <>
      <FormHeader backButtonText="Back to Registrations" />
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
          <UpdateRegistrationForm registration={registration} />
        )}
      </Space>
    </>
  );
};
export default RegistrationDetails;
