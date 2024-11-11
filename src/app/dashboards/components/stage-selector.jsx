import React, { useState, useEffect } from "react";
import { Select, Spin } from "antd";
import { useSalesStages } from "@/hooks";

export const StageSelector = ({ onChange }) => {
  const { loading, salesStages } = useSalesStages();
  const [selectedStage, setSelectedStage] = useState(null);

  // Set the first stage as the selected stage when salesStages is loaded
  useEffect(() => {
    if (!loading && salesStages?.length > 0 && selectedStage === null) {
      const initialStage = salesStages[0].value;
      setSelectedStage(initialStage); // Set the default selected value to the first item
      onChange?.(initialStage); // Trigger onChange with the first stage value if defined
    }
  }, [loading, salesStages]); // Remove onChange from dependencies

  // Handle selection change
  const handleChange = (value) => {
    setSelectedStage(value);
    onChange?.(value); // Trigger onChange if defined
  };

  return (
    <div>
      <Select
        placeholder="Select Stage"
        loading={loading}
        disabled={loading}
        value={selectedStage} // Use value instead of defaultValue for controlled selection
        onChange={handleChange}
      >
        {salesStages?.map((stage) => (
          <Select.Option key={stage.value} value={stage.value}>
            {stage.text}
          </Select.Option>
        ))}
      </Select>

      {loading && (
        <Spin
          size="small"
          style={{ marginLeft: 10, verticalAlign: "middle" }}
        />
      )}
    </div>
  );
};
