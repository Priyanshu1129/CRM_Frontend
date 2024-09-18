import React, { useState, useEffect } from "react";
import { Table } from "@/components";
import { getColumns } from "./columns";
import { useSelector } from "react-redux";

export const BusinessDevelopmentTableView = ({
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
  });

  return (
    <>
      <Table
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        loading={loading}
        data={data}
        columns={columns}
        handleChange={handleFilter}
        entityName="Business Developments"
        total={total}
      />
    </>
  );
};
