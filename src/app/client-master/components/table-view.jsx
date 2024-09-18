import React, { useState, useEffect } from "react";
import { Table } from "@/components";
import { getColumns } from "./column";
import { useSelector } from "react-redux";

export const ClientsTableView = ({
  data,
  loading,
  setCurrentPage,
  setPageSize,
  totalClients,
  handleFilter,
}) => {

  const [selectedCurrency, setSelectedCurrency] = useState(1);
  const { currency } = useSelector((state) => state.currency.viewCurrency);

  useEffect(() => {
    if (currency) {
      setSelectedCurrency(currency);
    }
  }, [currency]);

  const columns = getColumns({
    selectedCurrency,
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
