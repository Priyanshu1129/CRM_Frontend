import { editRolePermissions } from "@/redux/actions/roleAndPermissionAction";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { notification } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useEditPermissions = ({ checkedActions, role }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { status, data, error } = useSelector(
    (state) => state.role.editRolePermissions
  );
  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: "Permission updated successfully.",
      });
      dispatch(roleActions.clearEditRolePermissionStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to update Permissions",
      });
      dispatch(roleActions.clearEditRolePermissionStatus());
      dispatch(roleActions.clearEditRolePermissionError());
    }
  }, [status, error, dispatch]);

  const handleUpdate = () => {
    const filterPermissions = (permissions) => {
      return permissions.filter(
        (permission) => permission.allowedActions.length > 0
      );
    };
    const filteredPermissions = filterPermissions(checkedActions);

    dispatch(
      editRolePermissions({ permissionUpdates: filteredPermissions }, role._id)
    );
  };

  return { handleUpdate, loading };
};
