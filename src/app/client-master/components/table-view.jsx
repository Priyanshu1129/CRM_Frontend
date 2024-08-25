import React from "react";
import { Table } from "@/components";
import { columns } from "./column";

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
