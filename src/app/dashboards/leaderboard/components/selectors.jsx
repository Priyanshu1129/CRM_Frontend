import React from "react";
import { Select } from "antd";
import { parameterToLabelMap } from "../config";
import { colorConfig } from "@/config";
const { Option } = Select;

export const EntryTypeSelector = ({ sortParameter, handleChange, disable }) => {
  return (
    <div>
      <span
        style={{
          fontWeight: "500",
          color: disable ? colorConfig.textGrayLight : "black",
        }}
      >
        Sort By{" "}
      </span>
      <Select
        disabled={disable}
        value={sortParameter}
        onChange={handleChange}
        style={{ width: 175 }}
      >
        {parameterToLabelMap &&
          Object.keys(parameterToLabelMap).map((key) => (
            <Option key={key} value={key}>
              {parameterToLabelMap[key]} Entries
            </Option>
          ))}
      </Select>
    </div>
  );
};

export const QuarterSelector = ({ selectedQuarter, handleChange, disable }) => {
  return (
    <div>
      <span
        style={{
          fontWeight: "500",
          color: disable ? colorConfig.textGrayLight : "black",
        }}
      >
        Quarter{" "}
      </span>
      <Select
        disabled={disable}
        value={selectedQuarter}
        onChange={handleChange}
        style={{ width: 130, marginRight: "20px" }}
      >
        <Option value="currentQuarter">4th Quarter</Option>
        <Option value="lastQuarter">3rd Quarter</Option>
        <Option value="last3rdQuarter">2nd Quarter</Option>
        <Option value="last4thQuarter">1st Quarter</Option>
        <Option value="lastYear">Last Year</Option>
      </Select>
    </div>
  );
};
