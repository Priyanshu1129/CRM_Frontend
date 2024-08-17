import React from "react";
import { Table as AntTable } from "antd";
import { PaginationTotal } from ".";

export const Table = ({ columns, data, loading }) => (
  <AntTable
    loading={loading}
    pagination={{
      pageSizeOptions: ["12", "24", "48", "96"],
      showTotal: (total) => (
        <PaginationTotal total={total} entityName="contacts" />
      ),
    }}
    rowKey="id"
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
