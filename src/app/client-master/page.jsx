"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ListHeader } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { ClientsCardView, ClientsTableView } from "./components";
import { getAllClients } from "@/redux/actions/clientAction";
import { clientActions } from "@/redux/slices/clientSlice";
import { notification } from "antd";
import { ClientSelector } from "@/components";

const ClientMaster = () => {
  const [view, setView] = useState("card");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const prevFiltersRef = useRef({});
  const prevSorterRef = useRef({});
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.client.getAllClients
  );
  const [clients, setClients] = useState(data?.clients);

  const fetchAllClients = useCallback(() => {
    if (
      !clients ||
      currentPage !== Number(data?.page) ||
      pageSize !== Number(data?.limit) ||
      refresh
    ) {
      dispatch(getAllClients({ page: currentPage, limit: pageSize }));
    }
  }, [
    dispatch,
    clients,
    currentPage,
    pageSize,
    data?.page,
    data?.limit,
    refresh,
  ]);

  useEffect(() => {
    fetchAllClients();
  }, [fetchAllClients]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success") {
      setClients(data?.clients);
      setLoading(false);
      setRefresh(false);
      dispatch(clientActions.clearGetAllClientsStatus());
    } else if (status == "failed") {
      setLoading(false);
      setRefresh(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch clients.",
      });
      dispatch(clientActions.clearGetAllClientsStatus());
      dispatch(clientActions.clearGetAllClientsError());
    }
  }, [dispatch, status, data?.clients, error]);

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
        getAllClients({
          industry,
          subIndustry,
          territory,
          enteredBy,
          name: currentSortField == "name" ? currentSortOrder : "1",
          entryDate: currentSortField == "entryDate" ? currentSortOrder : "1",
        })
      );
    }
  };

  return (
    <>
      <ListHeader
        toPath={"/client-master/add-client"}
        buttonText={"Add new client"}
        SearchType={"client"}
        setRefresh={setRefresh}
        setView={setView}
        view={view}
      />
      {view == "table" ? (
        <ClientsTableView
          totalClients={data?.totalCount}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          data={clients}
          loading={loading}
          handleFilter={handleFilter}
        />
      ) : (
        <ClientsCardView
          totalClients={data?.totalCount}
          setCurrentPage={setCurrentPage}
          setPageSize={setPageSize}
          data={clients}
          loading={loading}
        />
      )}
    </>
  );
};

export default ClientMaster;
