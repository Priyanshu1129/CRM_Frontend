import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClient } from "@/redux/actions/clientAction";
import { clientActions } from "@/redux/slices/clientSlice";
import { notification } from "antd";

export const useFetchClientDetails = (id) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector(
        (state) => state.client.getClient
    );

    const [client, setClient] = useState(data?.data);

    const fetchClientDetails = useCallback(() => {
        if ((!client && id) || id !== String(client?._id)) {
            dispatch(getClient(id));
        }
    }, [dispatch, id, client]);

    useEffect(() => {
        fetchClientDetails();
    }, [fetchClientDetails])

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

    return { loading, client };

}