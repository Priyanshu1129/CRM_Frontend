"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Menu, Layout, theme, Grid } from "antd";
import { Title } from "../title";
const { Sider } = Layout;
import { colorConfig, resources } from "@/config";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const router = useRouter();
  const onClick = (e) => {
    router.push(`/${e.key}`, undefined, { scroll: false });
  };
  return (
    <Sider
      breakpoint="lg"
      width={256}
      style={{
        border : "1px solid",
        borderColor : colorConfig.cardBorder,
        fontFamily: "Roboto, sans-serif", // Make sure to use your selected font
        fontWeight: "700",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1,
        scrollbarWidth: "thin",
        scrollbarColor: "unset",
      }}
      theme="light"
      // trigger={true}
      collapsible
      // collapsedWidth={screens.xs && "0"}
      collapsed={collapsed}
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(value) => {
        setCollapsed(value);
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
          borderBottom: "none",
        }}
        // className="demo-logo-vertical"
      >
        <Title collapsed={collapsed} />
      </div>
      <Menu
  onClick={onClick}
  style={{
    height: "calc(100% - 64px)", // Adjust to account for header height
    scrollbarWidth: "thin",
    fontWeight: "700",
    paddingLeft : '12px',
    paddingRight : '12px',
  }}
  theme="light" // Ensures proper base styling
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
