import React, { useState } from "react";
import { Table } from "@/components";
import { getColumns } from "./columns";
import { useCurrencies } from "@/hooks/useCurrency";
export const TendersTableView = ({
  setCurrentPage,
  setPageSize,
  loading,
  data,
  total,
  handleFilter,
}) => {
  const { currencies, loading: currenciesLoading } = useCurrencies();
  const [selectedCurrency, setSelectedCurrency] = useState("1");

  const columns = getColumns({
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
        handleChange={handleFilter}
        total={total}
        columns={columns}
        entityName="Contacts"
      />
    </>
  );
};
