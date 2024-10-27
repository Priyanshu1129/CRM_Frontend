import React, { useEffect, useState } from "react";
import { Table } from "@/components";
import { useSelector } from "react-redux";
import { getColumns } from "./columns";
export const ConfigTableView = ({
  loading,
  data,
  setShowUpdateConfigPopup,
  setUpdateConfigData,
  refresh,
  setPageSize,
  configType
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
    setShowUpdateConfigPopup,
    setUpdateConfigData,
    configType
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
        ScrollX="0"
        columns={columns}
        entityName={`${configType}`}
      />
    </>
  );
};
