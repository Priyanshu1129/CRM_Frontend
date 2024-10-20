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
    <>
      <FormHeader backButtonText="Back to Contacts" />
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
          <UpdateContactForm contact={contact} />
        )}
      </Space>
    </>
  );
};
export default ContactDetails;
