"use client";
import React, { useState } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout, theme, Grid } from "antd";
import Sidebar from "@/components/layout/sidebar";
import Header from "./header";

const { Content } = Layout;

export default function LayoutComponent({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const screens = Grid.useBreakpoint();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <AntdRegistry>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Sidebar collapsed={collapsed} />
        <Layout>
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
          <Layout style={{ padding: !screens.xs ? "32px":"16px" }}>
            <Content
              style={{
                minHeight: 280,
                borderRadius: borderRadiusLG,
                // background: colorBgContainer,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </AntdRegistry>
  );
}
