import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRole } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";

export const useAddRole = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { status, data, error } = useSelector((state) => state.role.createRole);
  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Role created successfully.",
      });
      dispatch(roleActions.clearCreateRoleStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to add role.",
      });
      dispatch(roleActions.clearCreateRoleStatus());
      dispatch(roleActions.clearCreateRoleError());
    }
  }, [status, error, dispatch]);

  const onFinish = (values) => {
    dispatch(createRole(values));
  };

  return { loading, onFinish };
};
