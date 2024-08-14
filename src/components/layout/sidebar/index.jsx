"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Menu, Layout, theme } from "antd";
import { Title } from "../title";
const { Sider } = Layout;
import { resources } from "@/config";
const { useToken } = theme;
const Sidebar = ({ collapsed }) => {
  const router = useRouter();
  const { token } = useToken();
  const onClick = (e) => {
    // router.push(e.key, { scroll: false });
    router.push(e.key);
  };
  return (
    <Sider
      breakpoint="lg"
      width={256}
      style={{ height: "100vh" }}
      trigger={null}
      collapsible
      collapsedWidth="0"
      collapsed={collapsed}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          width: "256px",
          padding: "0 16px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "64px",
          backgroundColor: token.colorBgElevated,
          borderBottom: "none",
        }}
      >
        <Title collapsed={false} />
      </div>
      <Menu
        onClick={onClick}
        style={{
          height: "90%",
        }}
        // theme='dark'
        title="Logo"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={resources}
      />
    </Sider>
  );
};
export default Sidebar;
