import React from "react";
import { DatePicker } from "antd";
import moment from "moment";

export const YearPicker = ({ onChange }) => {
  return (
    <DatePicker picker="year" onChange={onChange} defaultValue={moment()} style={{width:"100px"}} />
  );
};
