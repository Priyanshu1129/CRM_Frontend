import React from "react";
import { Button, Layout, theme, Space } from "antd";
import {
  Notifications,
  CurrentUser,
  CurrencyChangeDropDown,
} from "@/components";
import { FullscreenButton } from "@/utilities/fullScreen";

const { Header: AntHeader } = Layout;
const Header = () => {
  const headerStyles = {
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
        <Space align="center" size="small">
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
