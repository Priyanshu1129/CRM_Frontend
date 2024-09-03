import React, { useEffect, useState } from "react";
import { Table } from "@/components";
import { GetColumns } from "./column";
import {
  useIndustries,
  useSubIndustries,
  useTerritories,
  useUsers,
} from "@/hooks";

export const ClientsTableView = ({
  data,
  loading,
  setCurrentPage,
  setPageSize,
  totalClients,
  handleFilter,
}) => {
  const { industries } = useIndustries();
  const { subIndustries } = useSubIndustries();
  const { territories } = useTerritories();
  const { users } = useUsers();
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    const value = GetColumns({ industries, subIndustries, territories, users });
    setColumns(value);
  }, [industries, subIndustries, territories, users]);

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
