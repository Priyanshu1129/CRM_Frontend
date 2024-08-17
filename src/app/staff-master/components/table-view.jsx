import React from "react";
import { Table } from "@/components";
import { columns } from "./columns";
export const StaffsTableView = ({ data, loading }) => {
  return (
    <>
      <Table data={data} columns={columns} loading={loading} />
    </>
  );
};
