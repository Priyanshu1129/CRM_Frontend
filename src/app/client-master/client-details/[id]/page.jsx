"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, notification, Space, theme } from "antd";
import { clientActions } from "@/redux/slices/clientSlice";
import { UpdateClientForm } from "../../components/update-client-form";
import { getClient } from "@/redux/actions/clientAction";
import { useParams } from "next/navigation";
import { FullScreenLoading, FormHeader } from "@/components";

const ClientDetails = () => {
  const [loading, setLoading] = useState(false);
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const { status, error, data } = useSelector(
    (state) => state.client.getClient
  );
  const { id } = useParams();

  const [client, setClient] = useState(data?.data);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchClientDetails = useCallback(() => {
    if ((!client && id) || id !== String(client?._id)) {
      dispatch(getClient(id));
    }
  }, [dispatch, id, client]);

  useEffect(() => {
    fetchClientDetails();
  }, [fetchClientDetails]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setClient(data?.data);
      setLoading(false);
      dispatch(clientActions.clearGetClientStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch client.",
      });
      dispatch(clientActions.clearGetClientStatus());
      dispatch(clientActions.clearGetClientError());
    }
  }, [status, error, data?.data, dispatch]);

  return (
    <>
      <FormHeader backButtonText="Back to Clients" />
      <Space
        direction="vertical"
        style={{
          marginTop: "28px",
          width: "100%",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          padding: screens.xs ? "16px" : "32px",
        }}
      >
        {loading ? <FullScreenLoading /> : <UpdateClientForm client={client} />}
      </Space>
    </>
  );
};
export default ClientDetails;
