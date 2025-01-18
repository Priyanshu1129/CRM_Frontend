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
  setCurrentPage,
  configType,
}) => {
  const columns = getColumns({
    setShowUpdateConfigPopup,
    setUpdateConfigData,
    configType,
  });

  return (
    <>
      <Table
        loading={loading}
        data={data}
        showAll={true}
        ScrollX="0"
        columns={columns}
        entityName={`${configType}`}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
    </>
  );
};
