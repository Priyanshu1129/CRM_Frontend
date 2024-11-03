import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

export const SelectDate = ({ onChange }) => (
  <DatePicker
    onChange={onChange}
    defaultValue={moment()}
    needConfirm
    allowClear={false}
  />
);
