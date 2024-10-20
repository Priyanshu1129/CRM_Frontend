"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { ClientsCardView, ClientsTableView } from "./components";
import { Filter } from "./components/filter";
import { useFetchClients } from "@/hooks/client";

const ClientMaster = () => {
  const [view, setView] = useState("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const {
    loading,
    clients,
    handleFilter,
    setRefresh,
    filters,
    setFilter,
    setFilters,
    total
  } = useFetchClients({ currentPage, pageSize });

  return (
    <>
      <ListHeader
        toPath={"/client-master/add-client"}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
        buttonText={"Add new client"}
        pageName={"client"}
        setRefresh={setRefresh}
        setView={setView}
        view={view}
      />
      {view == "table" ? (
        <ClientsTableView
          totalClients={total}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          data={clients}
          loading={loading}
          handleFilter={handleFilter}
        />
      ) : (
        <ClientsCardView
          totalClients={total}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          data={clients}
          loading={loading}
        />
      )}
    </>
  );
};

export default ClientMaster;
