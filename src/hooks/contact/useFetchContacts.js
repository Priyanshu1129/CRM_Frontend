import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { getAllContacts } from "@/redux/actions/contactAction";
import { contactActions } from "@/redux/slices/contactSlice";

export const useFetchContacts = ({ currentPage, pageSize }) => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
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
      setRefresh(false);
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
      dispatch(contactActions.clearGetAllContactsStatus());
    } else if (status == "failed") {
      setLoading(false);
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

  return {
    loading,
    handleFilter,
    contacts,
    setRefresh,
    setFilter,
    filters,
    setFilters,
    total: data?.totalCount,
  };
};
