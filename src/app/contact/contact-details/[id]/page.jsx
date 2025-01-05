"use client";
import React from "react";
import { Grid, Space, theme } from "antd";
import { UpdateContactForm } from "../components/update-contact-form";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";
import { useFetchContactDetails } from "@/hooks/contact";
const ContactDetails = () => {
  const screens = Grid.useBreakpoint();
  const { id } = useParams();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { loading, contact } = useFetchContactDetails(id);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <FormHeader backButtonText="Back to Contacts" />
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
        {loading ? (
          <FullScreenLoading />
        ) : (
          <UpdateContactForm contact={contact} />
        )}
      </Space>
    </div>
  );
};
export default ContactDetails;
