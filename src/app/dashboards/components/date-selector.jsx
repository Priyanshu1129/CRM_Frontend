import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";
import { colorConfig } from "@/config";
export const SelectDate = ({ onChange }) => {
  let calendarIcon = <CalendarOutlined style={{ color: colorConfig.primary }} />;

  return (
  <DatePicker
    onChange={onChange}
    defaultValue={dayjs(new Date())}
    format={"YYYY-MM-DD"}
    needConfirm
    allowClear={false}
    suffixIcon ={calendarIcon}
    
  />
)};
