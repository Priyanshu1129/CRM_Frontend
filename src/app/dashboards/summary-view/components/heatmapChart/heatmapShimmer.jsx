import { Card, Row, Space } from "antd";
import { Text } from "@/components";
import { YearPicker, StageSelector } from "@/app/dashboards/components";
import { months } from "./config";
import "./heatmapGrid.css";

export const HeatmapShimmer = () => {
  const years = [2022, 2023, 2024];

  return (
    <div className="heatmap-grid">
      <Card style={{ width: "100%" }}>
        <Space style={{ marginBottom: 16, gap: 6 }}>
          <div className="shimmer year-picker-shimmer" />
          <div className="shimmer stage-selector-shimmer" />
        </Space>

        {/* Shimmer Heatmap Rows */}
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
                {months.map((month) => (
                  <div
                    key={month}
                    className="shimmer month-cell-shimmer"
                  ></div>
                ))}
              </div>
              <div className="shimmer text-shimmer" />
            </div>
          ))}
        </Row>

        {/* Shimmer Color Gradient Legend */}
        <div
          className="color-legend"
          style={{ marginTop: 16, textAlign: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span className="shimmer text-shimmer" style={{ marginRight: 8 }}></span>
            <div className="shimmer color-gradient-shimmer"></div>
            <span className="shimmer text-shimmer" style={{ marginLeft: 8 }}></span>
          </div>
        </div>
      </Card>
    </div>
  );
};
