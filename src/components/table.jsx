import React from "react";
import { Table as AntTable } from "antd";

export const Table = ({columns, data}) => (
  <AntTable
    columns={columns}
    dataSource={data}
    style={{
      marginTop: "28px",
    }}
    scroll={{
      x: 1300,
    }}
  />
);

