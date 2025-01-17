"use client"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { userActions } from "@/redux/slices/userSlice";
import { deleteUser } from "@/redux/actions/userAction";
import { useRouter } from "next/navigation";

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter()
  
  const { status, data, error } = useSelector(
    (state) => state.user.deleteUser
  );

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      notification.success({
        message: "Success",
        description: `user deleted successfully `,
      });
      dispatch(userActions.clearDeleteUserError());
      dispatch(userActions.clearDeleteUserStatus());
      dispatch(userActions.setDeleteUserPopup({open : false , user : null}));
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || `Failed to Delete User`,
      });
      dispatch(userActions.clearDeleteUserStatus());
      dispatch(userActions.clearDeleteUserError());
    }
  }, [status, error, dispatch]);

  const handleDeleteUser = (userId, confirm = 'true', undo = 'false') => {
      dispatch(deleteUser(userId, confirm, undo));
  };

  return {loading, data, handleDeleteUser};
};
