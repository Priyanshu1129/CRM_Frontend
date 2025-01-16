"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { OpportunitiesTableView } from "./components";
import { Filter } from "./components/filter";
import { useFetchOpportunities } from "@/hooks/deal";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <ListHeader
        toPath={"/deal/add-deal"}
        buttonText={"Add New Deal"}
        pageName={"deal"}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
      />
      <div
        style={{
          flex: "1", // Takes remaining space below header
          overflow: "hidden", // Prevent overflow
          borderRadius: "8px",
        }}
      >
        <OpportunitiesTableView
          data={opportunities}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          loading={loading}
          total={total}
          handleFilter={handleFilter}
        />
      </div>
    </div>
  );
};

export default OpportunityMaster;
