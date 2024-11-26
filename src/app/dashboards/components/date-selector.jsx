import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

export const SelectDate = ({ onChange }) => (
  <DatePicker
    onChange={onChange}
    defaultValue={dayjs(new Date())}
    format={"YYYY-MM-DD"}
    needConfirm
    allowClear={false}
  />
);
