import React from "react";
import { Table } from "@/components";
import { getColumns } from "./columns";

export const RegistrationsTableView = ({
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
        total={total}
        handleChange={handleFilter}
        columns={columns}
        entityName="Registrations"
      />
    </>
  );
};
