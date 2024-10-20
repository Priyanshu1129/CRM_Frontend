import React from "react";
import { Table } from "@/components";
import { columns } from "./columns";
export const RolesTableView = ({ loading, data, total = 0 }) => {
  return (
    <Table
      loading={loading}
      data={data}
      columns={columns}
      total={total}
      entityName="Roles"
      ScrollX="0"
    />
  );
};
