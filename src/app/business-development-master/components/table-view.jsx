import React from "react";
import { Table } from "@/components";
import { columns } from "./columns";

export const BusinessDevelopmentTableView = ({ data, loading }) => {
  return (
    <>
      <Table data={data} loading={loading} columns={columns} />
    </>
  );
};
