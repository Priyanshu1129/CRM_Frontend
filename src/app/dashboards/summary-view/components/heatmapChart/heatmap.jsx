import { useState, useEffect } from "react";
import { Card, Row, Tooltip, Space, Flex } from "antd";
import { Text } from "@/components";
import { YearPicker, StageSelector } from "@/app/dashboards/components";
import { useFetchHeatmapView } from "@/hooks/dashboards";
import { months } from "./config";
import "./heatmapGrid.css";
import { HeatmapShimmer } from "./heatmapShimmer";

export const Heatmap = () => {
  const years = [2022, 2023, 2024];
  const [year, setYear] = useState("2024");
  const [stageId, setStageId] = useState("670e7df4f5e783c1a47cd48f");
  const { loading, heatmapViewData } = useFetchHeatmapView({ year, stageId });

  // Calculate min and max values for color gradient scale
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100); // Initialize with a default range

  useEffect(() => {
    const getMinMaxValues = (data) => {
      let max = 0;
      let min = Infinity;
      for (const year in data) {
        for (const month in data[year]) {
          const value = data[year][month];
          if (value > max) max = value;
          if (value < min) min = value;
        }
      }
      return { min, max };
    };

    if (heatmapViewData) {
      const { min, max } = getMinMaxValues(heatmapViewData);
      setMinValue(min);
      setMaxValue(max);
    }
  }, [heatmapViewData, year, stageId]); // Only re-run when heatmapViewData changes

  const getColorForValue = (value) => {
    if (maxValue === minValue) return "#d0e8ff";
    const intensity = (value - minValue) / (maxValue - minValue);
    const blueShade = Math.floor(255 - 150 * intensity);
    return `rgb(${blueShade}, ${blueShade + 50}, 255)`;
  };

  const onYearChange = (date, dateString) => {
    setYear(dateString);
  };

  const onStageChange = (value) => {
    setStageId(value);
  };

  // if(loading) return <Card loading={true} style={{width:"100%", height:"300px"}} />
  if(loading) return <HeatmapShimmer/>
  return (
    <div className="heatmap-grid">
      <Card style={{ width: "100%"  }}>
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

        {/* Color Gradient Legend with Min/Max Values */}
        <div
          className="color-legend"
          style={{ marginTop: 16, textAlign: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 8 }}>{minValue} (Low)</span>
            <div
              style={{
                height: "10px",
                width: "100%",
                background: `linear-gradient(to right, ${getColorForValue(
                  minValue
                )}, ${getColorForValue(maxValue)})`,
                display: "inline-block",
              }}
            ></div>
            <span style={{ marginLeft: 8 }}>{maxValue} (High)</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
