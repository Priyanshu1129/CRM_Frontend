"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, Layout, theme, Grid } from "antd";
import { Title } from "../title";
const { Sider } = Layout;
import { colorConfig, resources } from "@/config";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState("");
  useEffect(() => {
    // Set the selected key based on the current route (optional improvement for route-based selection)
    const path = window.location.pathname.substring(1); // Remove leading "/"
    setSelectedKey(path || "cockpit");
  }, []);

  const onClick = (e) => {
    setSelectedKey(e.key); // Set the selected menu key
    router.push(`/${e.key}`, undefined, { scroll: false });
  };

  return (
    <Sider
      breakpoint="lg"
      width={256}
      style={{
        border: "1px solid",
        borderColor: colorConfig.cardBorder,
        fontWeight: "500",
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
          fontWeight: "500",
          paddingLeft: "12px",
          paddingRight: "12px",
          marginTop: "8px",
        }}
        theme="light" // Ensures proper base styling
        title="title"
        selectedKeys={[selectedKey]}
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        items={resources}
      />
    </Sider>
  );
};
export default Sidebar;
