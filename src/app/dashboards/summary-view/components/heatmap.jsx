import React, { useMemo } from "react";
import { Card, Row, Typography, Tooltip, Select, Space } from "antd";
import "./heatmapGrid.css";

const { Text } = Typography;
const { Option } = Select;

const data = {
  2022: { Jan: 70, Feb: 90, Mar: 90, Apr: 55, May: 65, Jun: 30, Jul: 80, Aug: 45, Sep: 85, Oct: 60, Nov: 75, Dec: 50 },
  2023: { Jan: 30, Feb: 80, Mar: 20, Apr: 70, May: 60, Jun: 40, Jul: 90, Aug: 35, Sep: 75, Oct: 50, Nov: 65, Dec: 55 },
  2024: { Jan: 60, Feb: 50, Mar: 75, Apr: 45, May: 85, Jun: 25, Jul: 55, Aug: 90, Sep: 65, Oct: 40, Nov: 80, Dec: 30 },
};

export const Heatmap = () => {
  const years = [2022, 2023, 2024];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Calculate the maximum value from data
  const maxValue = useMemo(() => Math.max(...Object.values(data).flatMap((year) => Object.values(year))), [data]);

  // Function to get shade of blue based on value
  const getColorForValue = (value) => {
    const intensity = value / maxValue; // Get a value between 0 and 1
    const blue = Math.round(255 * (1 - intensity)); // Darker for higher values
    return `rgb(${blue}, ${blue}, 255)`; // Shades of blue, lighter as intensity decreases
  };

  return (
    <div className="heatmap-grid">
      <Card bordered={false} style={{ width: "100%" }}>
        {/* Menu Area */}
        <Space style={{ marginBottom: 16 }}>
          <Select placeholder="Select Year" style={{ width: 120 }}>
            {years.map((year) => (
              <Option key={year} value={year}>
                {year}
              </Option>
            ))}
          </Select>
          <Select placeholder="Select Metric" style={{ width: 120 }}>
            <Option value="count">Count</Option>
            <Option value="amount">Amount</Option>
          </Select>
        </Space>

        {/* Heatmap Rows */}
        <Row>
          {years.map((year) => (
            <div key={year} style={{ width: "33.33%", padding: "0 4px", textAlign: "center" }}>
              <div className="months-grid">
                {months.map((month) => {
                  const monthData = data?.[year]?.[month] || 0;
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
                      <div className="month-cell" style={{ backgroundColor: color }}>
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
          
        {/* Gradient Bar */}
        <div className="gradient-bar">
          <div
            style={{
              background: "linear-gradient(to right, rgb(0, 0, 255), rgb(230, 230, 255))",
              height: "10px",
              borderRadius: "4px",
              marginTop: "16px",
            }}
          ></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
            <Text>Min: 0</Text>
            <Text>Max: {maxValue}</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};
