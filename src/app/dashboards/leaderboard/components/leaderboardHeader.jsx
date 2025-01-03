import React from "react";
import { QuarterSelector, EntryTypeSelector } from "./selectors";
import { Grid, Button, Space, Radio } from "antd";

export const LeaderboardHeader = ({
  view,
  setView,
  setSortParameter,
  sortParameter,
  selectedQuarter,
  setSelectedQuarter,
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
        <QuarterSelector
          disable={view === "tableView"}
          handleChange={(value) => setSelectedQuarter(value)}
          selectedQuarter={selectedQuarter}
        />
        <EntryTypeSelector
          disable={view === "tableView"}
          handleChange={(value) => setSortParameter(value)}
          sortParameter={sortParameter}
        />
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
            <Radio.Button value="chartView">Chart View</Radio.Button>
            <Radio.Button value="tableView">Table View</Radio.Button>
          </Radio.Group>
        </Space>
      </Space>
    </div>
  );
};
