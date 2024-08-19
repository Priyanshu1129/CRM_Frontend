import React from "react";
import { Table } from "@/components";
import { columns } from "./columns";

export const RegistrationsTableView = ({
  setCurrentPage,
  setPageSize,
  loading,
  data,
}) => {
  return (
    <>
      <Table
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        loading={loading}
        data={data}
        columns={columns}
        entityName="Registrations"
      />
    </>
  );
};
