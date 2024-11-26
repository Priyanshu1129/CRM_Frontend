import React from "react";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { ArrowRightOutlined } from "@ant-design/icons";

export const SelectDateRange = ({ setStartDate, setEndDate }) => {
  return (
    <Space>
      <DatePicker
        onChange={(date, dateString) => setStartDate(dateString)}
        defaultValue={dayjs("2020-10-10", "YYYY-MM-DD")}
        format={"YYYY-MM-DD"}
        needConfirm
        allowClear={false}
      />
      <ArrowRightOutlined  />
      <DatePicker
        onChange={(date, dateString) => setEndDate(dateString)}
        defaultValue={dayjs(new Date())}
        format={"YYYY-MM-DD"}
        needConfirm
        allowClear={false}
      />
    </Space>
  );
};
