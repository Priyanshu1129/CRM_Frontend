import React, { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import { useSalesSubStages } from "@/hooks";
import { FilterOutlined } from "@ant-design/icons";
import { colorConfig } from "@/config";

export const SubStageSelector = ({ onChange, stage }) => {
  const { loading, salesSubStages } = useSalesSubStages({ config: true });
  const [selectedSubStage, setSelectedSubStage] = useState();
  const [filteredStages, setFilteredStages] = useState();

  useEffect(() => {
    if (salesSubStages?.length > 0 && !loading) {
      setFilteredStages(
        salesSubStages?.filter(
          (item) => item?.salesStageLabel?.toLowerCase() == stage.toLowerCase()
        )
      );
    }
  }, [loading, salesSubStages, stage]);

  // Handle selection change
  const handleChange = (value) => {
    setSelectedSubStage(value);
    onChange?.(value); // Trigger onChange if defined
  };

  return (
    <>
      <Select
        style={{ width: "100%" }}
        // size="small"
        mode="multiple"
        placeholder={
          <>
            <FilterOutlined
              style={{ marginRight: "8px", color: colorConfig.primary }}
            />
            Select Sub Stage
          </>
        }
        loading={loading}
        disabled={loading}
        value={selectedSubStage} // Use value instead of defaultValue for controlled selection
        onChange={handleChange}
      >
        {filteredStages?.map((subStage) => (
          <Select.Option key={subStage.value} value={subStage.value}>
            {subStage.text}
          </Select.Option>
        ))}
      </Select>

      {/* {loading && (
        <Spin
          size="small"
          style={{ marginLeft: 10, verticalAlign: "middle" }}
        />
      )} */}
    </>
  );
};
