import React, { useState } from "react";
import { Table } from "@/components";
import { GetColumns } from "./column";
import { useCurrencies } from "@/hooks";

export const ClientsTableView = ({
  data,
  loading,
  setCurrentPage,
  setPageSize,
  totalClients,
  handleFilter,
}) => {
  const { currencies, loading: currenciesLoading } = useCurrencies();
  const [selectedCurrency, setSelectedCurrency] = useState("1");

  const columns = GetColumns({
    currencies,
    selectedCurrency,
    setSelectedCurrency,
  });

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
