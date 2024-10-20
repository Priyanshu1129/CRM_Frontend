"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListHeader } from "@/components";
import { RolesTableView } from "./components";
import { notification } from "antd";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { getAllRoles } from "@/redux/actions/roleAndPermissionAction";

const RolesAndPermissions = () => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.role.getAllRoles
  );
  const [roles, setRoles] = useState(data?.roles);

  const fetchAllRoles = useCallback(() => {
    if (!roles || refresh) {
      dispatch(getAllRoles({}));
    }
  }, [dispatch, roles, refresh]);

  useEffect(() => {
    fetchAllRoles();
  }, [fetchAllRoles]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
      setRoles(data?.roles);
      setLoading(false);
      setRefresh(false);
      dispatch(roleActions.clearGetAllRolesStatus());
    } else if (status == "failed") {
      setLoading(false);
      setRefresh(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch roles and permissions.",
      });
      dispatch(roleActions.clearGetAllRolesStatus());
      dispatch(roleActions.clearGetAllRolesError());
    }
  }, [dispatch, status, data?.roles, error]);

  return (
    <div>
      <ListHeader
        toPath={"/admin-panel/roles-permissions/add-role"}
        buttonText={"Add new role"}
        pageName={"role"}
        setRefresh={setRefresh}
      />
      <RolesTableView data={roles} loading={loading} />
    </div>
  );
};

export default RolesAndPermissions;
