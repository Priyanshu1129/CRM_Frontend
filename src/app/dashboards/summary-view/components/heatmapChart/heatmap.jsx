import { useState } from "react";
import { Card, Row, Tooltip, Space } from "antd";
import { Text } from "@/components";
import { YearPicker, StageSelector } from "@/app/dashboards/components";
import { useFetchHeatmapView } from "@/hooks/dashboards";
import { months, getColorForValue } from "./config";
import "./heatmapGrid.css";

const data = {
  2022: {
    Jan: 70,
    Feb: 90,
    Mar: 90,
    Apr: 55,
    May: 65,
    Jun: 30,
    Jul: 80,
    Aug: 45,
    Sep: 85,
    Oct: 60,
    Nov: 75,
    Dec: 50,
  },
  2023: {
    Jan: 30,
    Feb: 80,
    Mar: 20,
    Apr: 70,
    May: 60,
    Jun: 40,
    Jul: 90,
    Aug: 35,
    Sep: 75,
    Oct: 50,
    Nov: 65,
    Dec: 55,
  },
  2024: {
    Jan: 60,
    Feb: 50,
    Mar: 75,
    Apr: 45,
    May: 85,
    Jun: 25,
    Jul: 55,
    Aug: 90,
    Sep: 65,
    Oct: 40,
    Nov: 80,
    Dec: 30,
  },
};

export const Heatmap = () => {
  const years = [2022, 2023, 2024];
  const [year, setYear] = useState("2024");
  const [stageId, setStageId] = useState();
  const { loading, heatmapViewData } = useFetchHeatmapView({ year, stageId });

  const onYearChange = (date, dateString) => {
    console.log("selected year", dateString);
    setYear(dateString);
  };

  const onStageChange = (value) => {
    console.log("Selected Stage:", value);
    setStageId(value);
  };

  return (
    <div className="heatmap-grid">
      <Card loading={loading} bordered={false} style={{ width: "100%" }}>
        <Space style={{ marginBottom: 16, gap: 6 }}>
          <YearPicker onChange={onYearChange} />
          <StageSelector onChange={onStageChange} />
        </Space>

        {/* Heatmap Rows */}
        <Row>
          {years.map((year) => (
            <div
              key={year}
              style={{
                width: "33.33%",
                padding: "0 4px",
                textAlign: "center",
              }}
            >
              <div className="months-grid">
                {months.map((month) => {
                  const monthData = heatmapViewData?.[year]?.[month] || 0;
                  const color = getColorForValue(monthData);

                  return (
                    <Tooltip
                      key={month}
                      title={
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span
                            style={{
                              display: "inline-block",
                              width: "12px",
                              height: "12px",
                              backgroundColor: color,
                              marginRight: "8px",
                              borderRadius: "2px",
                            }}
                          ></span>
                          {`${month} ${year}: ${monthData}`}
                        </div>
                      }
                    >
                      <div
                        className="month-cell"
                        style={{ backgroundColor: color }}
                      >
                        <Text>{month}</Text>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
              <Text strong>{year}</Text>
            </div>
          ))}
        </Row>
      </Card>
    </div>
  );
};
