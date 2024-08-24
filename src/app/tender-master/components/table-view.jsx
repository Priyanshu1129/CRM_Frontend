import React from "react";
import { Table } from "@/components";
import { columns } from "./columns";
export const TendersTableView = ({
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
        total={total}
        columns={columns}
        entityName="Contacts"
      />
    </>
  );
};
