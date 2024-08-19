import React from "react";
import { Table as AntTable } from "antd";
import { PaginationTotal } from ".";

export const Table = ({
  setCurrentPage,
  setPageSize,
  columns,
  data,
  loading,
  entityName,
  total,
}) => (
  <AntTable
    loading={loading}
    pagination={{
      pageSizeOptions: ["12", "24", "48", "96"],
      defaultPageSize: 12,
      defaultCurrent: 1,
      onChange: (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
      },
      showTotal: (total) => (
        <PaginationTotal total={total} entityName={entityName} />
      ),
      total: total,
      showQuickJumper: true,
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
