"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { TendersTableView } from "./components";
import { Filter } from "./components/filter";
import { useFetchTenders } from "@/hooks/tender";

const TenderMaster = () => {
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    tenders,
    setRefresh,
    loading,
    total,
    handleFilter,
    setFilter,
    setFilters,
    filters,
  } = useFetchTenders({ pageSize, currentPage });

  return (
    <>
      <ListHeader
        toPath={"/tender-master/add-tender"}
        buttonText={"Add new tender"}
        pageName={"tender"}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
      />
      <TendersTableView
        data={tenders}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        loading={loading}
        total={total}
        handleFilter={handleFilter}
      />
    </>
  );
};

export default TenderMaster;
