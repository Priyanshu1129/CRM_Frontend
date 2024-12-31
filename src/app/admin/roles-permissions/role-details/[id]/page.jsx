"use client";
import React from "react";
import { Grid, Space, theme } from "antd";
import { UpdateRoleForm, PermissionTable } from "../components";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";
import {
  useFetchAllEntities,
  useFetchRoleDetails,
} from "@/hooks/adminPanel/roles-Permissions";

const RoleDetails = () => {
  const screens = Grid.useBreakpoint();

  const { id } = useParams();
  const { loading: roleLoading, role } = useFetchRoleDetails(id);
  const { loading, permissionEntities } = useFetchAllEntities();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <FormHeader backButtonText="Back to Roles" />
      <Space
        direction="vertical"
        style={{
          marginTop: "24px",
          width: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: screens.xs ? "16px" : "32px",
        }}
      >
        {roleLoading || loading ? (
          <FullScreenLoading />
        ) : (
          <>
            <UpdateRoleForm role={role} />
            <PermissionTable
              role={role}
              permissionEntities={permissionEntities}
            />
          </>
        )}
      </Space>
    </>
  );
};
export default RoleDetails;
