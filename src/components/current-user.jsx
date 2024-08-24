"use client";
import { useEffect, useState } from "react";

import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Popover, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/actions/authAction";
import { CustomAvatar } from "./custom-avatar";
import { Text } from "./text";
import { AccountSettings } from "./account-settings";
import { authActions } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export const CurrentUser = () => {
  const [opened, setOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  let user = localStorage.getItem("user");
  if (user) user = JSON.parse(user);

  const { status, error } = useSelector((state) => state.auth.logout);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      router.push("/login");
      notification.success({
        message: "Success",
        description: "Logged out successfully.",
      });
      dispatch(authActions.clearLogoutStatus());
    } else if (status == "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to logout.",
      });
      dispatch(authActions.clearLogoutStatus());
      dispatch(authActions.clearLogoutError());
    }
  }, [status, error, dispatch, router]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text
        strong
        style={{
          padding: "12px 20px",
        }}
      >
        {`${user?.firstName} ${user?.lastName}`}
      </Text>
      <div
        style={{
          borderTop: "1px solid #d9d9d9",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <Button
          style={{ textAlign: "left" }}
          // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
          icon={<SettingOutlined />}
          type="text"
          block
          onClick={() => setOpened(true)}
        >
          Account settings
        </Button>
        <Button
          style={{ textAlign: "left" }}
          // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
          icon={<LogoutOutlined />}
          type="text"
          danger
          block
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Popover
        placement="bottomRight"
        content={content}
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 999 }}
      >
        <CustomAvatar
          name={user?.name}
          src={user?.avatar}
          size="default"
          style={{ cursor: "pointer" }}
        />
      </Popover>
      {user && (
        <AccountSettings
          opened={opened}
          setOpened={setOpened}
          userId={user._id}
        />
      )}
    </>
  );
};
