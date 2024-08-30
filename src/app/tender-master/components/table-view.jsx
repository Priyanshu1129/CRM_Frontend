import React from "react";
import { Table } from "@/components";
import { getColumns } from "./columns";
export const TendersTableView = ({
  setCurrentPage,
  setPageSize,
  loading,
  data,
  total,
  handleFilter,
}) => {
  const columns = getColumns();
  return (
    <>
      <Table
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        loading={loading}
        data={data}
        handleChange={handleFilter}
        total={total}
        columns={columns}
        entityName="Contacts"
      />
    </>
  );
};
