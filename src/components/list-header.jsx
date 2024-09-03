import React from "react";
import { ListTitleButton } from "./list-title-button";
import { ReloadOutlined } from "@ant-design/icons";
import { Grid, Button, Space, Radio } from "antd";
import { ListSearch } from "./list-search";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";

export const ListHeader = ({
  setView,
  setRefresh,
  toPath,
  buttonText,
  pageName,
  view,
  FilterComponent,
}) => {
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
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: screens.xs ? "1.6rem" : undefined,
        }}
      >
        <ListTitleButton toPath={toPath} buttonText={buttonText} />
        {pageName == "client" && <FilterComponent />}
      </Space>
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: screens.xs ? "1.6rem" : undefined,
        }}
      >
        <Button
          type="default"
          icon={<ReloadOutlined />}
          onClick={() => {
            setRefresh(true);
          }}
          size={screens.xs ? "middle" : "large"}
        />

        <Space>
          {pageName && <ListSearch pageName={pageName} />}
          {!screens.xs && view ? (
            <Radio.Group
              size="large"
              value={view}
              onChange={(e) => setView(e.target.value)}
            >
              <Radio.Button value="card">
                <AppstoreOutlined />
              </Radio.Button>
              <Radio.Button value="table">
                <UnorderedListOutlined />
              </Radio.Button>
            </Radio.Group>
          ) : null}
        </Space>
      </Space>
    </div>
  );
};
