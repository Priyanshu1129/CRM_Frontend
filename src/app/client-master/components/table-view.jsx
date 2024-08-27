import React from "react";
import { Table } from "@/components";
import { columns } from "./column";
import { Space, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const TableSearch = ({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
}) => (
  <div style={{ padding: 8 }}>
    <Input
      placeholder={`Search Name`}
      value={selectedKeys[0]}
      onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
      onPressEnter={confirm}
      style={{ marginBottom: 8, display: "block" }}
    />
    <Space>
      <Button
        type="primary"
        onClick={confirm}
        icon={<SearchOutlined />}
        size="small"
        style={{ width: 90 }}
      >
        Search
      </Button>
      <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
        Reset
      </Button>
    </Space>
  </div>
);

export const ClientsTableView = ({
  data,
  loading,
  setCurrentPage,
  setPageSize,
  totalClients,
}) => {
  return (
    <>
      <Table
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        loading={loading}
        data={data}
        total={totalClients}
        columns={columns}
        entityName="Clients"
      />
    </>
  );
};
