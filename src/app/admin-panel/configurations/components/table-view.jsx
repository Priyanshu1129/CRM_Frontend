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
  console.log("DIT : ",data)

  return (
    <>
      <Table
        loading={loading}
        data={data}
        ScrollX="0"
        columns={columns}
        entityName={`${configType}`}
      />
    </>
  );
};
