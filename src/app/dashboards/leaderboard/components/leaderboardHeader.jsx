import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { Grid, Button, Space, Radio } from "antd";

export const LeaderboardHeader = ({ view, setView, setRefresh }) => {
  const screens = Grid.useBreakpoint();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: "8px",
        marginBottom: "28px",
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
        .
      </Space>
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginTop: screens.xs ? "1.6rem" : undefined,
        }}
      >
        <Space>
          <Radio.Group value={view} onChange={(e) => setView(e.target.value)}>
            <Radio.Button value="tableView">Table View</Radio.Button>
            <Radio.Button value="chartView">Chart View</Radio.Button>
          </Radio.Group>
        </Space>
        <Button
          type="default"
          icon={<ReloadOutlined />}
          onClick={() => {
            setRefresh(true);
          }}
        />
      </Space>
    </div>
  );
};
