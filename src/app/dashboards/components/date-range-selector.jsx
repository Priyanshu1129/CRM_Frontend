// import React from "react";
// import { DatePicker } from "antd";
// import dayjs from "dayjs";
// import { CalendarOutlined } from "@ant-design/icons";
// import { colorConfig } from "@/config";

// const { RangePicker } = DatePicker;

// export const SelectDateRange = ({ onChange }) => (
//   <RangePicker
//     onChange={onChange}
//     defaultValue={[dayjs("2015/01/01"), dayjs(new Date())]}
//     format={"DD-MM-YYYY"}
//     needConfirm
//     allowClear={false}
//     suffixIcon={
//       <CalendarOutlined style={{ color: `${colorConfig.primary}` }} /> // Set the color of the calendar icon
//     }
//   />
// );

import React from "react";
import { DatePicker , Space} from "antd";
import dayjs from "dayjs";

export const SelectDateRange = ({ setStartDate, setEndDate }) => 
  {
   return ( <Space>
  <DatePicker
    onChange={(date, dateString)=>setStartDate(dateString)}
    defaultValue={dayjs("2020-10-10", "YYYY-MM-DD")}
    format={"YYYY-MM-DD"}
    needConfirm
    allowClear={false}
  />
    <DatePicker
    onChange={(date, dateString)=> setEndDate(dateString)}
    defaultValue={dayjs(new Date())}
    format={"YYYY-MM-DD"}
    needConfirm
    allowClear={false}
  />
  </Space>)};
