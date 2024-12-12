import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";
import { colorConfig } from "@/config";
export const YearPicker = ({ onChange, myView }) => {
  let calendarIcon = <CalendarOutlined style={{ color: colorConfig.primary }} />;
  return (
    <DatePicker
      picker="year"
      suffixIcon={calendarIcon}
      onChange={onChange}
      defaultValue={dayjs(new Date())}
      style={{ width: "100px" }}
      allowClear={false}
    />
  );
};
