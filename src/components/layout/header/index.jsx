import React from "react";
import { Button, Layout, theme, Space } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Notifications, CurrentUser } from "@/components";


const { Header: AntHeader } = Layout;
const Header = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer, colorBgElevated },
  } = theme.useToken();

  const headerStyles = {
    backgroundColor: colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
    position: "sticky",
    top: 0,
    zIndex: 999,
  };

  return (
    <>
      <AntHeader
        // style={{
        //   padding: 0,
        //   background: colorBgContainer,
        // }}
        style={headerStyles}
      >
        {/* <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        /> */}
        <Space align="center" size="middle">
          <Notifications />
          <CurrentUser />
        </Space>
      </AntHeader>
    </>
  );
};
export default Header;
