"use client"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { roleActions } from "@/redux/slices/roleAndPermissionSlice";
import { deleteRole } from "@/redux/actions/roleAndPermissionAction";
import { useRouter } from "next/navigation";

export const useDeleteRole = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()
  
  //in data we will have data.confirm  to differentiate actions of actual deletion and fetching data to be deleted 

  const { status, data, error } = useSelector(
    (state) => state.role.deleteRole
  );

  console.log("delete role data in hook: ", data);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: `${data?.confirm ? "role and related entities deleted successfully" : "Role and related entries fetched successfully"}`,
      });
      dispatch(roleActions.clearDeleteRoleError());
      dispatch(roleActions.clearDeleteRoleStatus());
      if(data?.confirm == true) router.push('/admin/roles-permissions');
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to ${data?.confirm ? "fetch data to be deleted" : "Delete Role and related data"}`,
      });
      dispatch(roleActions.clearDeleteRoleStatus());
      dispatch(roleActions.clearDeleteRoleError());
    }
  }, [status, error, dispatch]);

  const handleDeleteRole = (roleId, confirm = 'false') => {
      console.log("confirm in handleDeleteRole", confirm)
      dispatch(deleteRole(roleId, confirm));
  };

  return {loading, data, handleDeleteRole};
};
