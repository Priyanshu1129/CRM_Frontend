import React from "react";
import { Table } from "@/components";
import { columns } from "./columns";
export const TendersTableView = ({ loading, data }) => {
  return (
    <>
      <Table loading={loading} data={data} columns={columns} />
    </>
  );
};
