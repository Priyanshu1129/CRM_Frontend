import React from "react";
import { ListTitleButton } from "./list-title-button";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Grid, Space } from "antd";
import { ListSearch } from "./list-search";
import { Text } from "./text";

export const ListHeader = ({ setRefresh, toPath, buttonText, SearchType }) => {
  const screens = Grid.useBreakpoint();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <ListTitleButton toPath={toPath} buttonText={buttonText} />
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          type="default"
          // @ts-expect-error Ant Design Icon's v5.0.1 has an issue with @types/react@^18.2.66
          icon={<ReloadOutlined />}
          onClick={() => {
            setRefresh(true);
          }}
          size={screens.xs ? "middle" : "large"}
          style={{
            marginTop: screens.xs ? "1.6rem" : "0rem",
          }}
        />
        <ListSearch SearchType={SearchType} />
      </Space>
    </div>
  );
};
