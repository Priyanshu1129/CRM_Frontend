import React, { useState, useEffect } from "react";
import { Table } from "@/components";
import { getColumns } from "./columns";
import { useSelector } from "react-redux";
export const OpportunitiesTableView = ({
  setCurrentPage,
  setPageSize,
  loading,
  data,
  total,
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
    data,
  });
  return (
    <>
      <Table
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        loading={loading}
        data={data}
        handleChange={handleFilter}
        columns={columns}
        total={total}
        entityName="Opportunities"
      />
    </>
  );
};
