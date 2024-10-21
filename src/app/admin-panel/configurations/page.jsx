"use client";
import React from "react";
import { List } from "antd";
import { configResources } from "./configResource";
import { ConfigCard } from "./components/configCard";
const Configurations = () => {
  return (
    <>
      <List
        grid={{
          gutter: 20,
          // column: 4,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 1,
          xl: 2,
        }}
        dataSource={configResources}
        renderItem={(resource) => (
          <List.Item>
            <ConfigCard resource={resource} />
          </List.Item>
        )}
      />
    </>
  );
};

export default Configurations;
