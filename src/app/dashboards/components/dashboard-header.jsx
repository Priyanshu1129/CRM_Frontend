import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { Grid, Button, Space } from "antd";
import { SelectDate } from "./date-selector";
import { SelectDateRange } from "./date-range-selector";
import { DashboatdViewSelector } from "./viewTypeSelector";
import { colorConfig } from "@/config";

export const DashboardHeader = ({
  setRefresh,
  dashboard,
  setDate,
  setStartDate,
  setEndDate,
  myView = null,
  setMyView,
  FilterComponent,
  setFilter,
  filters,
  setFilters,
  selectedDate,
  viewOptions,
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
        marginBottom: "24px",
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
        {setDate && (
          <SelectDate
            date={selectedDate}
            onChange={(date, dateString) => setDate(dateString)}
          />
        )}

        {setStartDate && setEndDate && (
          <SelectDateRange
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        )}

        {FilterComponent && (
          <FilterComponent
            filters={filters}
            setFilters={setFilters}
            setFilter={setFilter}
          />
        )}
        {myView != null && (
          <DashboatdViewSelector
            value={myView}
            handleChange={(value) => setMyView(value)}
            viewOptions={viewOptions}
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
        />
      </Space>
    </div>
  );
};
