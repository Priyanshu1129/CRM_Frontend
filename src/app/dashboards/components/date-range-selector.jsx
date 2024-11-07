import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

export const SelectDateRange = ({ onChange }) => (
  <RangePicker
    onChange={onChange}
    // defaultValue={moment()}
    needConfirm
    allowClear={false}
  />
);
