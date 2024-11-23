import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export const YearPicker = ({ onChange }) => {
  return (
    <DatePicker
      picker="year"
      onChange={onChange}
      defaultValue={dayjs(new Date())}
      style={{ width: "100px" }}
    />
  );
};
