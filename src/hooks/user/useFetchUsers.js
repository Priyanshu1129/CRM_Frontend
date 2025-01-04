import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { getAllUsers } from "@/redux/actions/userAction";
import { userActions } from "@/redux/slices/userSlice";

export const useFetchUsers = (currentPage, pageSize, refresh, setRefresh) => {
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.user.getAllUsers
  );
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(data?.users || []);

  const fetchAllUsers = useCallback(() => {
    dispatch(getAllUsers({ page: currentPage, limit: pageSize }));
    setRefresh(false);
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    if (
      !users ||
      currentPage !== Number(data?.page) ||
      pageSize !== Number(data?.limit) ||
      refresh
    ) {
      fetchAllUsers();
    }
  }, [
    fetchAllUsers,
    users,
    currentPage,
    pageSize,
    data?.page,
    data?.limit,
    refresh,
  ]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setUsers(data?.users);
      setLoading(false);
      dispatch(userActions.clearGetAllUsersStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch users.",
      });
      dispatch(userActions.clearGetAllUsersStatus());
      dispatch(userActions.clearGetAllUsersError());
    }
  }, [dispatch, status, data?.users, error, setRefresh]);

  return { users, loading, totalCount: data?.totalCount };
};
