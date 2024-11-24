import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CalendarOutlined } from "@ant-design/icons";
import { colorConfig } from "@/config";

const { RangePicker } = DatePicker;

export const SelectDateRange = ({ onChange }) => (
  <RangePicker
    onChange={onChange}
    defaultValue={[dayjs("2015/01/01"), dayjs(new Date())]}
    format={"DD-MM-YYYY"}
    needConfirm
    allowClear={false}
    suffixIcon={
      <CalendarOutlined style={{ color: `${colorConfig.primary}` }} /> // Set the color of the calendar icon
    }
  />
);
