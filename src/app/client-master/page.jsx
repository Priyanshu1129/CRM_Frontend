"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ListHeader } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { ClientsCardView, ClientsTableView } from "./components";
import { getAllClients } from "@/redux/actions/clientAction";
import { clientActions } from "@/redux/slices/clientSlice";
import { notification } from "antd";

const ClientMaster = () => {
  const [view, setView] = useState("card");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.client.getAllClients
  );
  const [clients, setClients] = useState(data?.data);

  const fetchAllClients = useCallback(() => {
    if (!clients) {
      // dispatch(getAllClients());
    }
  }, [dispatch, clients]);

  useEffect(() => {
    fetchAllClients();
  }, [fetchAllClients]);

  useEffect(() => {
    if (status == "pending") {
      setLoading(true);
    } else if (status == "success" && data?.status == "success") {
      setClients(data?.data);
      setLoading(false);
      dispatch(clientActions.clearGetAllClientsStatus());
    } else if (status == "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch clients.",
      });
      dispatch(clientActions.clearGetAllClientsStatus());
      dispatch(clientActions.clearGetAllClientsError());
    }
  }, [dispatch, status]);

  return (
    <>
      <ListHeader
        toPath={"/client-master/add-client"}
        buttonText={"Add new client"}
      />
      {view == "table" ? (
        <ClientsTableView />
      ) : (
        <ClientsCardView data={clients} loading={loading} />
      )}
    </>
  );
};

export default ClientMaster;
