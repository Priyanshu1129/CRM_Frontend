import React from "react";
import { Table } from "@/components";
import { getColumns } from "./columns";
export const ConfigTableView = ({
  loading,
  data,
  setShowUpdateConfigPopup,
  setUpdateConfigData,
  refresh,
  setPageSize,
  configType,
  // total,
}) => {
  const columns = getColumns({
    setShowUpdateConfigPopup,
    setUpdateConfigData,
    configType,
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
