import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { ArrowRightOutlined, CalendarOutlined } from "@ant-design/icons";
import { colorConfig } from "@/config";



export const SelectDateRange = ({ setStartDate, setEndDate }) => {
  let calendarIcon = <CalendarOutlined style={{ color: colorConfig.primary }} />;
  return (
    <Space>
      <DatePicker
        onChange={(date, dateString) => setStartDate(dateString)}
        defaultValue={dayjs("2020-10-10", "YYYY-MM-DD")}
        format={"YYYY-MM-DD"}
        needConfirm
        allowClear={false}
        suffixIcon={calendarIcon}
      />
      <ArrowRightOutlined  />
      <DatePicker
        onChange={(date, dateString) => setEndDate(dateString)}
        defaultValue={dayjs(new Date())}
        format={"YYYY-MM-DD"}
        needConfirm
        allowClear={false}
        suffixIcon={calendarIcon}
      />
    </Space>
  );
};
