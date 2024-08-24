import React from "react";
import { Table } from "@/components";
import { columns } from "./columns";
export const StaffsTableView = ({
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
        entityName="Staffs"
      />
    </>
  );
};
