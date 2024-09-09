"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ListHeader } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { ContactsTableView, ContactsCardView } from "./components";
import { notification } from "antd";
import { getAllContacts } from "@/redux/actions/contactAction";
import { contactActions } from "@/redux/slices/contactSlice";
import { Filter } from "./components/filter";

const ContactMaster = () => {
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [filters, setFilters] = useState({});
  const [filter, setFilter] = useState(false);

  const prevSorterRef = useRef({});
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.contact.getAllContacts
  );
  const [contacts, setContacts] = useState(data?.contacts);

  const fetchAllContacts = useCallback(() => {
    if (
      !contacts ||
      currentPage !== Number(data?.page) ||
      pageSize !== Number(data?.limit) ||
      refresh ||
      (filters && filter)
    ) {
      dispatch(
        getAllContacts({ page: currentPage, limit: pageSize, ...filters })
      );
      setFilter(false);
    }
  }, [
    dispatch,
    contacts,
    currentPage,
    pageSize,
    data?.page,
    data?.limit,
    refresh,
    filters,
    filter,
  ]);

  useEffect(() => {
    fetchAllContacts();
  }, [fetchAllContacts]);

  useEffect(() => {
    if (filter) {
      fetchAllContacts();
    }
  }, [filter, filters, fetchAllContacts]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
      setContacts(data?.contacts);
      setLoading(false);
      setRefresh(false);
      dispatch(contactActions.clearGetAllContactsStatus());
    } else if (status == "failed") {
      setLoading(false);
      setRefresh(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch contacts.",
      });
      dispatch(contactActions.clearGetAllContactsStatus());
      dispatch(contactActions.clearGetAllContactsError());
    }
  }, [dispatch, status, data?.contacts, error]);

  const handleFilter = (pagination, tableFilters, sorter) => {
    let { field: currentSortField, order: currentSortOrder } = sorter || {};
    const prevSortField = prevSorterRef.current?.field;
    const prevSortOrder = prevSorterRef.current?.order;

    // Compare sorter by field and order
    const hasSorterChanged =
      currentSortField !== prevSortField || currentSortOrder !== prevSortOrder;

    prevSorterRef.current = {
      field: currentSortField,
      order: currentSortOrder,
    };

    if (hasSorterChanged) {
      currentSortOrder = currentSortOrder == "descend" ? "-1" : "1";
      setFilters({
        ...filters,
        entryDate: currentSortField == "entryDate" ? currentSortOrder : "",
      });
      setFilter(true);
      fetchAllContacts();
    }
  };

  return (
    <>
      <ListHeader
        toPath={"/contact-master/add-contact"}
        buttonText={"Add new contact"}
        pageName={"contact"}
        setRefresh={setRefresh}
        setFilter={setFilter}
        setFilters={setFilters}
        filters={filters}
        FilterComponent={Filter}
      />
      {view == "table" ? (
        <ContactsTableView
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          loading={loading}
          data={contacts}
          total={data?.totalCount}
          handleFilter={handleFilter}
        />
      ) : (
        <ContactsCardView />
      )}
    </>
  );
};

export default ContactMaster;
