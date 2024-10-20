import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { getAllClients } from "@/redux/actions/clientAction";
import { clientActions } from "@/redux/slices/clientSlice";


export const useFetchClients = ({ currentPage, pageSize }) => {
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [filters, setFilters] = useState({});
    const [filter, setFilter] = useState(false);

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
            refresh ||
            (filter && filters)
        ) {
            dispatch(
                getAllClients({ page: currentPage, limit: pageSize, ...filters })
            );
            setFilter(false);
        }
    }, [
        dispatch,
        clients,
        currentPage,
        pageSize,
        data?.page,
        data?.limit,
        refresh,
        filters,
        filter,
    ]);

    useEffect(() => {
        fetchAllClients();
    }, [fetchAllClients]);

    useEffect(() => {
        if (filter) {
            fetchAllClients();
        }
    }, [filter, filters, fetchAllClients]);

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
            // Dispatch the getAllClients action with the applied filters and sorting
            currentSortOrder = currentSortOrder == "descend" ? "-1" : "1";
            setFilters({
                ...filters,
                name: currentSortField == "name" ? currentSortOrder : "",
                entryDate: currentSortField == "entryDate" ? currentSortOrder : "",
            });
            setFilter(true);
            fetchAllClients();
        }
    };

    return { loading, handleFilter, clients, total: data?.totalCount, setRefresh, filters, setFilter, setFilters }

}