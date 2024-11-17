"use client";
import React, { useState, useEffect } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, theme, Grid } from "antd";
import { FullScreenLoading } from "..";
import Sidebar from "@/components/layout/sidebar";
import Header from "./header";

const { Content } = Layout;

const LayoutComponent = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const screens = Grid.useBreakpoint();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (!isMounted) {
    return (
      <AntdRegistry>
        <FullScreenLoading />
      </AntdRegistry>
    );
  }

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
        }}
      >
        <Sidebar  setCollapsed={setCollapsed} collapsed={collapsed} />
        <Layout
          style={{
            flex: 1,
            marginLeft: !screens.xs ? (collapsed ? "80px" : "256px") : 0,
          }}
        >
          <Header />
          <Layout
            style={{
              padding: !screens.xs ? "24px" : "16px",
              height: "100%",
            }}
          >
            <Content
              style={{
                minHeight: 280,
                borderRadius: borderRadiusLG,
                // background: colorBgContainer,
                overflowY: "auto",
                scrollbarWidth: "none",
                scrollbarColor: "unset",
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutComponent;
