import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

export const SelectDate = ({ onChange }) => (
  <DatePicker
    onChange={(e)=> console.log('date-picker-header', e)}
    defaultValue={moment()}
    needConfirm
    allowClear={false}
  />
);
