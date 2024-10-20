import React from "react";
import { Button, Layout, theme, Space } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  Notifications,
  CurrentUser,
  CurrencyChangeDropDown,
} from "@/components";
import { FullscreenButton } from "@/utilities/fullScreen";

const { Header: AntHeader } = Layout;
const Header = () => {
  const {
    token: { colorBgContainer, colorBgElevated },
  } = theme.useToken();

  const headerStyles = {
    backgroundColor: colorBgContainer,
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
      <AntHeader style={headerStyles}>
        <Space align="center" size="middle">
          <CurrencyChangeDropDown />
          <FullscreenButton />
          <Notifications />
          <CurrentUser />
        </Space>
      </AntHeader>
    </>
  );
};
export default Header;
