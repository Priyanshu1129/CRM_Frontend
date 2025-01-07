import React from "react";
import { Select } from "antd";

const { Option } = Select;
export const DashboatdViewSelector = ({ value, handleChange, viewOptions }) => {
  return (
    <Select
      value={value}
      onChange={handleChange}
      placeholder="Select View Type"
    >
      {viewOptions?.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};
