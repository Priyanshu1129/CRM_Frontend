import React, { useEffect, useState } from "react";
import { Table } from "@/components";
import { useSelector } from "react-redux";
import { getColumns } from "./columns";
export const TerritoryTableView = ({
  loading,
  data,
  setVisible,
  setTerritory,
  refresh
  // total,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const { currency } = useSelector((state) => state.currency.viewCurrency);

  useEffect(() => {
    if (currency) {
      setSelectedCurrency(currency);
    }
  }, [currency]);

  const columns = getColumns({
    selectedCurrency,
    setVisible,
    setTerritory
  });

  return (
    <>
      <Table
        // setCurrentPage={setCurrentPage}
        // setPageSize={setPageSize}
        loading={loading}
        data={data}
        // handleChange={handleFilter}
        // total={total}
        columns={columns}
        entityName="Territory"
      />
    </>
  );
};
