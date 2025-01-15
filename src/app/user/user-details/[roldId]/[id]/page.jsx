"use client";
import React from "react";
import { Grid, Space, theme } from "antd";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";
import { UpdateUserForm } from "../../components/update-user-form";
import { useFetchUserDetails } from "@/hooks/user";

const UserDetails = () => {
  const { id } = useParams();
  const screens = Grid.useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user, loading } = useFetchUserDetails(id);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <FormHeader backButtonText="Back to Users" />
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
        {loading ? <FullScreenLoading /> : <UpdateUserForm user={user} />}
      </Space>
    </div>
  );
};

export default UserDetails;
