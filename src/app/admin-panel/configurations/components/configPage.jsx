"use client";
import React, { useEffect, useState } from "react";
import { useSubIndustries, useTerritories, useIndustries } from "@/hooks";

import { ListHeader } from "@/components";
import UpdateConfigModal from "./update-config-modal";
import CreateConfigModal from "./create-config-modal";
import { ConfigTableView } from "./table-view";
import { useSolutions } from "@/hooks/useSolutions";

const ConfigPage = ({configType}) => {
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  // const [ territory, setTerritory] = useState(null);
  const [ updateConfigData, setUpdateConfigData] = useState(null);

  const [showUpdateConfigPopup, setShowUpdateConfigPopup] = useState(false);
  const [showCreateConfigPopup, setShowCreateConfigPopup] = useState(false);
  const [refresh, setRefresh] = useState(false);


  // const { territories, loading } = useTerritories({refresh, setRefresh});
  var DataAndLoading;
  var data;
  var loading;
  switch(configType){
    case "territory" :
       DataAndLoading = useTerritories({refresh, setRefresh});
       data =  DataAndLoading.territories;
       loading = DataAndLoading.loading;
       break;
    case "industry" :
        DataAndLoading = useIndustries({refresh, setRefresh});
        data =  DataAndLoading.industries;
        loading = DataAndLoading.loading;
        break;
    case "sub-industry" :
        DataAndLoading = useSubIndustries({refresh, setRefresh});
        data =  DataAndLoading.subIndustries;
        loading = DataAndLoading.loading;
        break;
    case "solution" :
        DataAndLoading = useSolutions({refresh, setRefresh});
        data =  DataAndLoading.solutions;
        loading = DataAndLoading.loading;
        break;

  }

  console.log("All Config data List : ", data);
  return (
    <>
    
      <ListHeader
        toPath={"/tender-master/add-tender"}
        buttonText={`Add new ${configType}`}
        pageName={configType}
        setRefresh={setRefresh}
        type = {"config"}
        setShowCreateConfigPopup={setShowCreateConfigPopup}
        // setFilter={setFilter}
        // setFilters={setFilters}
        // filters={filters}
        // FilterComponent={Filter}
      />
      <ConfigTableView
        data={data}
        loading={loading}
        setShowUpdateConfigPopup={setShowUpdateConfigPopup}
        setUpdateConfigData={setUpdateConfigData}
        refresh={refresh}
        setPageSize={setPageSize}
        pageSize={pageSize}
        configType={configType}
        // total={data?.length()}
        // handleFilter={handleFilter}
      />
    <UpdateConfigModal configType={configType} updateConfigData={updateConfigData} showUpdateConfigPopup={showUpdateConfigPopup} setShowUpdateConfigPopup={setShowUpdateConfigPopup}/>
    <CreateConfigModal configType={configType} showCreateConfigPopup={showCreateConfigPopup} setShowCreateConfigPopup={setShowCreateConfigPopup} />
    </>
  );
};

export default ConfigPage;
