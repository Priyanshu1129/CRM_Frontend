import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { getUser } from "@/redux/actions/userAction";
import { userActions } from "@/redux/slices/userSlice";

export const useFetchUserDetails = (id) => {
  const dispatch = useDispatch();
  const { status, data, error } = useSelector((state) => state.user.getUser);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(data?.data);

  const fetchUserDetails = useCallback(() => {
    if ((!user && id) || id !== String(user?._id)) {
      console.log("user && id", user);
      setUser(null);
      dispatch(userActions.clearGetUserData());
      dispatch(getUser(id));
    }
  }, [dispatch, id, user]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setUser(data?.data);
      dispatch(userActions.clearGetUserStatus());
      setLoading(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch user.",
      });
      dispatch(userActions.clearGetUserStatus());
      dispatch(userActions.clearGetUserError());
    }
  }, [status, data?.data, error, dispatch]);

  return { user, loading };
};
