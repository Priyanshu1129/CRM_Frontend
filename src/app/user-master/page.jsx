"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListHeader } from "@/components";
import { UsersTableView, UsersCardView } from "./components";
import { notification } from "antd";
import { userActions } from "@/redux/slices/userSlice";
import { getAllUsers } from "@/redux/actions/userAction";

const UserMaster = () => {
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.user.getAllUsers
  );
  const [users, setUsers] = useState(data?.users);

  const fetchAllUsers = useCallback(() => {
    if (
      !users ||
      currentPage !== Number(data?.page) ||
      pageSize !== Number(data?.limit) ||
      refresh
    ) {
      dispatch(getAllUsers({ page: currentPage, limit: pageSize }));
    }
  }, [
    dispatch,
    users,
    currentPage,
    pageSize,
    data?.page,
    data?.limit,
    refresh,
  ]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
      setUsers(data?.users);
      setLoading(false);
      setRefresh(false);
      dispatch(userActions.clearGetAllUsersStatus());
    } else if (status == "failed") {
      setLoading(false);
      setRefresh(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch users.",
      });
      dispatch(userActions.clearGetAllUsersStatus());
      dispatch(userActions.clearGetAllUsersError());
    }
  }, [dispatch, status, data?.users, error]);

  return (
    <>
      <ListHeader
        toPath={"/user-master/add-user"}
        buttonText={"Add new user"}
        SearchType={"user"}
        setRefresh={setRefresh}
      />
      {view == "table" ? (
        <UsersTableView
          data={users}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          loading={loading}
          total={data?.totalCount}
        />
      ) : (
        <UsersCardView />
      )}
    </>
  );
};

export default UserMaster;
