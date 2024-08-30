import React from "react";
import { Table } from "@/components";
import { getColumns } from "./columns";

export const BusinessDevelopmentTableView = ({
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
        columns={columns}
        handleChange={handleFilter}
        entityName="Business Developments"
        total={total}
      />
    </>
  );
};
