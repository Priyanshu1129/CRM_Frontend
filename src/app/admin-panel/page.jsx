"use client";
import React from "react";
import { List } from "antd";
import { AdminPanelCard } from "./components";
import { resources } from "./resource";

const AdminPanel = () => {
  return (
    <>
      <List
        grid={{
          gutter: 32,
          // column: 4,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
        }}
        dataSource={resources}
        renderItem={(resource) => (
          <List.Item>
            <AdminPanelCard resource={resource} />
          </List.Item>
        )}
      />
    </>
  );
};

export default AdminPanel;
