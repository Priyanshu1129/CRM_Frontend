import React from "react";
import { Table } from "@/components";
import { getColumns } from "./column";

export const ClientsTableView = ({
  data,
  loading,
  setCurrentPage,
  setPageSize,
  totalClients,
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
        total={totalClients}
        columns={columns}
        entityName="Clients"
        handleChange={handleFilter}
      />
    </>
  );
};
