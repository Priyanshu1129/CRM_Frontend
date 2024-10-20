"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { OpportunitiesTableView } from "./components";
import { Filter } from "./components/filter";
import { useFetchOpportunities } from "@/hooks/opportunity";

const OpportunityMaster = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [filters, setFilters] = useState({});

  const { loading, opportunities, total, setFilter, setRefresh, handleFilter } =
    useFetchOpportunities({
      pageSize,
      currentPage,
      filters,
      setFilters,
    });

  return (
    <>
      <ListHeader
        toPath={"/opportunity-master/add-opportunity"}
        buttonText={"Add new opportunity"}
        pageName={"opportunity"}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
      />
      <OpportunitiesTableView
        data={opportunities}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        loading={loading}
        total={total}
        handleFilter={handleFilter}
      />
    </>
  );
};

export default OpportunityMaster;
