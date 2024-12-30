"use client";
import React, { useState } from "react";
import { ListHeader } from "@/components";
import { ContactsTableView } from "./components";
import { Filter } from "./components/filter";
import { useFetchContacts } from "@/hooks/contact";

const ContactMaster = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const {
    loading,
    contacts,
    handleFilter,
    total,
    filters,
    setFilter,
    setFilters,
    setRefresh,
  } = useFetchContacts({ currentPage, pageSize });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full viewport height
      }}
    >
      <ListHeader
        toPath={"/contact-master/add-contact"}
        buttonText={"Add New Contact"}
        pageName={"contact"}
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
        <ContactsTableView
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          loading={loading}
          data={contacts}
          total={total}
          handleFilter={handleFilter}
        />
      </div>
    </div>
  );
};

export default ContactMaster;
