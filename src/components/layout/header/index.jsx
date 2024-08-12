import React from "react";
import { Button, Layout, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { Header: AntHeader } = Layout;
const Header = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <AntHeader
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </AntHeader>
    </>
  );
};
export default Header;
