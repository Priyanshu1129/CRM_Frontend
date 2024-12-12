import { useState, useEffect } from "react";
import { Card, Row, Tooltip, Space, Flex } from "antd";
import { Text } from "@/components";
import { YearPicker, StageSelector, Filter } from "@/app/dashboards/components";
import { useFetchHeatmapView, useFetchMyHeatmapView } from "@/hooks/dashboards";
import { months } from "./config";
import "./heatmapGrid.css";
import { HeatmapShimmer } from "./heatmapShimmer";
import { colorConfig } from "@/config";

export const Heatmap = ({ myView }) => {
  const [year, setYear] = useState("2024");
  const [myViewYear, setMyViewYear] = useState("2024");
  const [stageId, setStageId] = useState("670e7df4f5e783c1a47cd48f");
  const [myViewStageId, setMyViewStageId] = useState(
    "670e7df4f5e783c1a47cd48f"
  );
  const [heatmapViewData, setHeatmapViewData] = useState();

  // all view hook
  const { loading, heatmapViewData: allViewHeatmapData } = useFetchHeatmapView({
    year,
    stageId,
    myView,
  });

  // my view hook
  const { loading: myViewLoading, heatmapViewData: myViewHeatmapData } =
    useFetchMyHeatmapView({ myViewYear, myViewStageId, myView });

  const [allViewYearLabels, setAllViewYearLabels] = useState([
    "2022",
    "2023",
    "2024",
  ]);
  const [myViewYearLabels, setMyViewYearLabels] = useState([
    "2022",
    "2023",
    "2024",
  ]);

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
  }, [heatmapViewData]); // Only re-run when heatmapViewData changes

  const getColorForValue = (value) => {
    if (maxValue === minValue) return colorConfig.primary;
    const intensity = (value - minValue) / (maxValue - minValue);
    const blueShade = Math.floor(255 - 150 * intensity);
    return `rgb(${blueShade}, ${blueShade + 50}, 255)`;
  };

  const onYearChange = (date, dateString) => {
    if (myView) {
      setMyViewYear(dateString);
      setMyViewYearLabels([dateString - 2, dateString - 1, dateString]);
    } else {
      setYear(dateString);
      setAllViewYearLabels([dateString - 2, dateString - 1, dateString]);
    }
  };

  const onStageChange = (value) => {
    if (myView) setMyViewStageId(value);
    else setStageId(value);
  };

  useEffect(() => {
    if (!loading && !myViewLoading) {
      setHeatmapViewData(myView ? myViewHeatmapData : allViewHeatmapData);
    }
  }, [myView, myViewHeatmapData, allViewHeatmapData, loading, myViewLoading]);

  return (
    <div className="heatmap-grid">
      {
        <Card style={{ width: "100%" }}>
          <div style={{ marginBottom: 16, gap: 6 }}>
            <Space style={{ display: "flex", justifyContent: "space-between" }}>
              <Space>
                <YearPicker onChange={onYearChange} />
                <StageSelector onChange={onStageChange} />
              </Space>
              <Filter />
            </Space>
          </div>

          {/* Heatmap Rows */}
          {loading || myViewLoading ? (
            <HeatmapShimmer />
          ) : (
            <Row>
              {(myView ? myViewYearLabels : allViewYearLabels)?.map((year) => (
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
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
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
          )}
          {/* Color Gradient Legend with Min/Max Values */}
          <div
            className="color-legend"
            style={{ marginTop: 16, textAlign: "center" }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  marginLeft: 8,
                  color: `${colorConfig.textGray}`,
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {minValue} (Low)
              </span>
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
              <span
                style={{
                  marginLeft: 8,
                  color: `${colorConfig.textGray}`,
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                {maxValue} (High)
              </span>
            </div>
          </div>
        </Card>
      }
    </div>
  );
};
