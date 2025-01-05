import React from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { Grid, Button, Space } from "antd";
import { SelectDate } from "./date-selector";
import { SelectDateRange } from "./date-range-selector";
import { colorConfig } from "@/config";
import { useRouter } from "next/navigation";

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
  myViewButtonText = "My View",
  selectedDate,
}) => {
  const screens = Grid.useBreakpoint();
  const router = useRouter();
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
          <Button
            style={
              myView ? { background: colorConfig.primary, color: "white" } : {}
            }
            // onClick={() => setMyView(!myView)}
            onClick={() =>
              myView
                ? router.push("/dashboards/pipe-view/all-view")
                : router.push("/dashboards/pipe-view/my-view")
            }
          >
            {myViewButtonText}
          </Button>
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
