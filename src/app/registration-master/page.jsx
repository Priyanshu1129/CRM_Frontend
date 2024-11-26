"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { RegistrationsTableView } from "./components";
import { Filter } from "./components/filter";
import { useFetchRegistrations } from "@/hooks/registration";

const RegistrationMaster = () => {
  const [pageSize, setPageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    loading,
    registrations,
    setRefresh,
    setFilter,
    setFilters,
    filters,
    total,
    handleFilter,
  } = useFetchRegistrations({ currentPage, pageSize });

  return (
    <>
      <ListHeader
        toPath={"/registration-master/add-registration"}
        buttonText={"Add New Registration"}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
      />
      <RegistrationsTableView
        data={registrations}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        loading={loading}
        total={total}
        handleFilter={handleFilter}
      />
      )
    </>
  );
};

export default RegistrationMaster;
