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
    <>
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
      <ContactsTableView
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        loading={loading}
        data={contacts}
        total={total}
        handleFilter={handleFilter}
      />
    </>
  );
};

export default ContactMaster;
