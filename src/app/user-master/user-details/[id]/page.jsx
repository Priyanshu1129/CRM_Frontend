"use client";
import React from "react";
import { Grid, Space, theme } from "antd";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";
import { UpdateUserForm } from "../components/update-user-form";
import { useFetchUserDetails } from "@/hooks/user";

const UserDetails = () => {
  const { id } = useParams();
  const screens = Grid.useBreakpoint();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user, loading } = useFetchUserDetails(id);

  return (
    <>
      <FormHeader backButtonText="Back to Users" />
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
        {loading ? <FullScreenLoading /> : <UpdateUserForm user={user} />}
      </Space>
    </>
  );
};

export default UserDetails;
