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
    total,
  } = useFetchClients({ currentPage, pageSize });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <ListHeader
        toPath={"/client-master/add-client"}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
        buttonText={"Add New Client"}
        pageName={"client"}
        setRefresh={setRefresh}
        setView={setView}
        view={view}
      />
      <div
        style={{
          flex: "1", // Takes remaining space below header
          overflow: "hidden", // Prevent overflow
          borderRadius: "8px",
          scrollbarWidth: "none",
        }}
      >
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
      </div>
    </div>
  );
};

export default ClientMaster;
