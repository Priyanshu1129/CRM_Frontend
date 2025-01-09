import React from "react";
import { Layout, Space } from "antd";
import {
  Notifications,
  CurrentUser,
  CurrencyChangeDropDown,
  BreadcrumbBar,
} from "@/components";
import { usePathname } from "next/navigation";
import { FullscreenButton } from "@/utilities/fullScreen";
import { colorConfig } from "@/config";

const { Header: AntHeader } = Layout;
const Header = () => {
  const currentPath = usePathname();

  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
    position: "sticky",
    top: 0,
    zIndex: 999,
    border: "1px solid",
    borderColor: colorConfig.cardBorder,
  };

  return (
    <>
      <AntHeader style={headerStyles}>
        <Space
          style={{
            // background: colorConfig.baseColor,
            border: `1px solid ${colorConfig.baseColor}`,
            padding: "3px",
            paddingRight: "16px",
            paddingLeft: "6px",
            borderRadius: "6px",
            justifySelf: "start",
          }}
          size="small"
        >
          <BreadcrumbBar />
        </Space>
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
