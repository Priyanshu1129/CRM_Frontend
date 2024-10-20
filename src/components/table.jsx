import React from "react";
import { Table as AntTable } from "antd";
import { PaginationTotal } from ".";

export const Table = ({
  setCurrentPage = 1,
  setPageSize = 12,
  columns,
  data,
  loading,
  entityName,
  total = 0,
  handleChange,
  ScrollX = 1300,
}) => {
  return (
    <AntTable
      loading={loading}
      onChange={handleChange}
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
        x: ScrollX,
      }}
    />
  );
};
