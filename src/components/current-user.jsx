"use client";
import { useState } from "react";
import {
  EditOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Button, Popover } from "antd";
import { CustomAvatar } from "./custom-avatar";
import { Text } from "./text";
import { AccountSettings } from "./account-settings";
import { useLogout } from "@/hooks/auth";
import { useSelector } from "react-redux";
import { useGetUserProfile } from "@/hooks/user";

export const CurrentUser = () => {
  const [opened, setOpened] = useState(false);
  const { data } = useSelector((state) => state.auth.authDetails);
  const user = data;
  const { loading, handleLogout } = useLogout();

  const router = useRouter();

  const handleClick = () => {
    try {
      console.log("clicked for data");
      router.push("/profile");
      setOpened(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        {`${user?.firstName} ${user?.lastName}
        `}
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
          style={{ border: "none", textAlign: "left" }}
          icon={<EditOutlined />}
          onClick={() => router.push("/change-password")}
        >
          Change Password
        </Button>

        <Button
          style={{ textAlign: "left" }}
          icon={<LogoutOutlined />}
          type="text"
          danger
          block
          loading={loading}
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
