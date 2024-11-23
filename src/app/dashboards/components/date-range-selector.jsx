import React from "react";
import { DatePicker } from "antd";
import moment from "moment";
import { FilterTwoTone } from "@ant-design/icons";
import { CalendarOutlined } from "@ant-design/icons";
import { colorConfig } from "@/config";

const { RangePicker } = DatePicker;

export const SelectDateRange = ({ onChange }) => (
  <RangePicker
    onChange={(e)=> console.log('from header date changed', e)}
    // defaultValue={moment()}
    needConfirm
    allowClear={false}
    suffixIcon={
      <CalendarOutlined style={{ color: `${colorConfig.primary}` }} /> // Set the color of the calendar icon
    }
 
  />
);
