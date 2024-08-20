"use client";
import React, { useState, useEffect, useCallback } from "react";
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

  return (
    <>
      <ListHeader
        toPath={"/client-master/add-client"}
        buttonText={"Add new client"}
        SearchType={"client"}
        setRefresh={setRefresh}
      />
      {view == "table" ? (
        <ClientsTableView />
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
