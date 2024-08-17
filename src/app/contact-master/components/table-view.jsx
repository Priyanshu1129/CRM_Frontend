import React from "react";
import { Table } from "@/components";
import { columns } from "./columns";
export const ContactsTableView = ({ loading, data }) => {
  return (
    <>
      <Table loading={loading} data={data} columns={columns} />
    </>
  );
};
