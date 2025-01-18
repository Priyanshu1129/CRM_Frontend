import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { getAllRoles } from "@/redux/actions/roleAndPermissionAction";
import { notification } from "antd";

export const useFetchAllRoles = () => {
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

  return {
    loading,
    roles,
    setRefresh,
  };
};
