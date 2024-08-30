"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ListHeader } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { ContactsTableView, ContactsCardView } from "./components";
import { notification } from "antd";
import { getAllContacts } from "@/redux/actions/contactAction";
import { contactActions } from "@/redux/slices/contactSlice";

const ContactMaster = () => {
  const [view, setView] = useState("table");
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const prevFiltersRef = useRef({});
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
      refresh
    ) {
      dispatch(getAllContacts({ page: currentPage, limit: pageSize }));
    }
  }, [
    dispatch,
    contacts,
    currentPage,
    pageSize,
    data?.page,
    data?.limit,
    refresh,
  ]);

  useEffect(() => {
    fetchAllContacts();
  }, [fetchAllContacts]);

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

  const handleFilter = (pagination, filters, sorter) => {
    let { field: currentSortField, order: currentSortOrder } = sorter || {};
    const prevSortField = prevSorterRef.current?.field;
    const prevSortOrder = prevSorterRef.current?.order;

    // Compare filters
    const hasFiltersChanged =
      JSON.stringify(filters) !== JSON.stringify(prevFiltersRef.current);

    // Compare sorter by field and order
    const hasSorterChanged =
      currentSortField !== prevSortField || currentSortOrder !== prevSortOrder;

    // Update refs with the current filters and sorter
    prevFiltersRef.current = filters;
    prevSorterRef.current = {
      field: currentSortField,
      order: currentSortOrder,
    };

    if (hasFiltersChanged || hasSorterChanged) {
      const industry = filters?.industry || "";
      const subIndustry = filters?.subIndustry || "";
      const territory = filters?.territory || "";
      const enteredBy = filters?.enteredBy || "";

      // Dispatch the getAllClients action with the applied filters and sorting
      currentSortOrder = currentSortOrder == "descend" ? "-1" : "1";
      dispatch(
        getAllContacts({
          industry,
          subIndustry,
          territory,
          enteredBy,
          entryDate: currentSortField == "entryDate" ? currentSortOrder : "1",
        })
      );
    }
  };

  return (
    <>
      <ListHeader
        toPath={"/contact-master/add-contact"}
        buttonText={"Add new contact"}
        SearchType={"contact"}
        setRefresh={setRefresh}
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
