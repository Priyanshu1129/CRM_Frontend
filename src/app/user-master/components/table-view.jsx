import React from "react";
import { Table } from "@/components";
import { columns } from "./columns";
export const UsersTableView = ({
  setCurrentPage,
  setPageSize,
  loading,
  data,
  total,
}) => {
  return (
    <>
      <Table
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        loading={loading}
        data={data}
        columns={columns}
        total={total}
        entityName="Users"
      />
    </>
  );
};
