import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { Grid, Button, Space } from "antd";
import { SelectDate } from "./date-selector";

export const DashboardHeader = ({
  setRefresh,
  dashboard,
  setDate,
  FilterComponent,
  setFilter,
  filters,
  setFilters,
}) => {
  const screens = Grid.useBreakpoint();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: "8px",
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
        <SelectDate onChange={(date, dateString) => setDate(date)} />
        {FilterComponent && (
          <FilterComponent
            filters={filters}
            setFilters={setFilters}
            setFilter={setFilter}
          />
        )}
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
      </Space>
    </div>
  );
};
