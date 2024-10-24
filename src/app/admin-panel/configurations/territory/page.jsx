"use client";
import React, { useEffect, useState } from "react";
import { useTerritories } from "@/hooks";
import { TerritoryTableView } from "./component/table-view";
import { ListHeader } from "@/components";
import UpdateConfigPopup from "./component/updateConfigPopup";
import ConfigModal from "./component/ConfigModal";
const Configurations = () => {
  const [pageSize, setPageSize] = useState(12)
  const [currentPage, setCurrentPage] = useState(1);
  const [ territory, setTerritory] = useState(null);
  const [visible, setVisible] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { territories, loading } = useTerritories({refresh, setRefresh});
 

  console.log("territories : ", territories)
  return (
    <>
      <div>Territory</div>
      <ListHeader
        toPath={"/tender-master/add-tender"}
        buttonText={"Add new Territory"}
        pageName={"territory"}
        setRefresh={setRefresh}
        // setFilter={setFilter}
        // setFilters={setFilters}
        // filters={filters}
        // FilterComponent={Filter}
      />
      <TerritoryTableView
        data={territories}
        loading={loading}
        setVisible={setVisible}
        setTerritory={setTerritory}
        refresh={refresh}
        // total={total}
        // handleFilter={handleFilter}
      />
     {visible && <ConfigModal territory={territory} visible={visible} setVisible={setVisible}></ConfigModal>}
    </>
  );
};

export default Configurations;
