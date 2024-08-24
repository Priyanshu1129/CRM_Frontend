"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, notification, Space, theme } from "antd";
import { userActions } from "@/redux/slices/userSlice";
import { UpdateUserForm } from "../../components/update-user-form";
import { getUser } from "@/redux/actions/userAction";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";

const UserDetails = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const { status, error, data } = useSelector((state) => state.user.getUser);
  const { id } = useParams();

  const [user, setUser] = useState(data?.data);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchUserDetails = useCallback(() => {
    if ((!user && id) || id !== String(user?._id)) {
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
      setLoading(false);
      dispatch(userActions.clearGetUserStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch user.",
      });
      dispatch(userActions.clearGetUserStatus());
      dispatch(userActions.clearGetUserError());
    }
  }, [status, error, data?.data, dispatch]);

  return (
    <>
      <FormHeader backButtonText="Back to Users" />
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
        {loading ? <FullScreenLoading /> : <UpdateUserForm user={user} />}
      </Space>
    </>
  );
};
export default UserDetails;
