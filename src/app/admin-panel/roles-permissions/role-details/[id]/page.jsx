"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, notification, Space, theme } from "antd";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { UpdateRoleForm, PermissionTable } from "../components";
import {
  getRole,
  getAllPermissionEntities,
} from "@/redux/actions/roleAndPermissionAction";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";

const RoleDetails = () => {
  const [loading, setLoading] = useState(false);
  const [permissionEntitiesLoading, setPermissionEntitiesLoading] =
    useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const { status, error, data } = useSelector((state) => state.role.getRole);

  const {
    status: permissionEntitiesStatus,
    error: permissionEntitiesError,
    data: permissionEntitiesData,
  } = useSelector((state) => state.role.getAllPermissionEntities);

  const { id } = useParams();

  const [role, setRole] = useState(data?.data);
  const [permissionEntities, setPermissionEntities] = useState(
    permissionEntitiesData?.data
  );

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchRoleDetails = useCallback(() => {
    if ((!role && id) || id !== String(role?._id)) {
      dispatch(getRole(id));
    }
  }, [dispatch, id, role]);

  const fetchPermissionEntities = useCallback(() => {
    if (!permissionEntities) {
      console.log("fetching permission entities");
      dispatch(getAllPermissionEntities());
    } else {
      console.log("permissionEntities already available");
    }
  }, [dispatch, permissionEntities]);

  useEffect(() => {
    fetchRoleDetails();
    fetchPermissionEntities();
  }, [fetchRoleDetails, fetchPermissionEntities]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setRole(data?.data);
      setLoading(false);
      dispatch(roleActions.clearGetRoleStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch role.",
      });
      dispatch(roleActions.clearGetRoleStatus());
      dispatch(roleActions.clearGetRoleError());
    }
  }, [status, error, data?.data, dispatch]);

  useEffect(() => {
    if (permissionEntitiesStatus === "pending") {
      setPermissionEntitiesLoading(true);
    } else if (permissionEntitiesStatus === "success") {
      setPermissionEntities(permissionEntitiesData);
      setPermissionEntitiesLoading(false);
      dispatch(roleActions.clearGetAllPermissionEntitiesStatus());
    } else if (permissionEntitiesStatus === "failed") {
      setPermissionEntitiesLoading(false);
      notification.error({
        message: "Error",
        description: permissionEntitiesError || "Failed to fetch entities.",
      });
      dispatch(roleActions.clearGetAllPermissionEntitiesStatus());
      dispatch(roleActions.clearGetAllPermissionEntitiesError());
    }
  }, [
    permissionEntitiesStatus,
    permissionEntitiesError,
    permissionEntitiesData,
    dispatch,
  ]);

  return (
    <>
      <FormHeader backButtonText="Back to Roles" />
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
        {loading || permissionEntitiesLoading ? (
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
