import { useState, useCallback, useEffect, useRef } from "react";;
import { notification } from "antd";
import { registrationActions } from "@/redux/slices/registrationSlice";
import { getAllRegistrations } from "@/redux/actions/registrationAction";
import { useDispatch, useSelector } from "react-redux"

export const useFetchRegistrations = ({ currentPage, pageSize }) => {
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [filters, setFilters] = useState({});
    const [filter, setFilter] = useState(false);

    const prevSorterRef = useRef({});
    const dispatch = useDispatch();
    const { status, data, error } = useSelector(
        (state) => state.registration.getAllRegistrations
    );
    const [registrations, setRegistrations] = useState(data?.registrations);


    const fetchAllRegistrations = useCallback(() => {
        if (
            !registrations ||
            currentPage !== Number(data?.page) ||
            pageSize !== Number(data?.limit) ||
            refresh ||
            (filter && filters)
        ) {
            dispatch(
                getAllRegistrations({ page: currentPage, limit: pageSize, ...filters })
            );
            setFilter(false);
        }
    }, [
        dispatch,
        registrations,
        currentPage,
        pageSize,
        data?.page,
        data?.limit,
        refresh,
        filter,
        filters,
    ]);

    useEffect(() => {
        fetchAllRegistrations();
    }, [fetchAllRegistrations]);

    useEffect(() => {
        if (filter) {
            fetchAllRegistrations();
        }
    }, [filter, filters, fetchAllRegistrations]);

    useEffect(() => {
        if (status == "pending") {
            setLoading(true);
        } else if (status == "success") {
            setRegistrations(data?.registrations);
            setLoading(false);
            setRefresh(false);
            dispatch(registrationActions.clearGetAllRegistrationsStatus());
        } else if (status == "failed") {
            setLoading(false);
            setRefresh(false);
            notification.error({
                message: "Error",
                description: error || "Failed to fetch registrations.",
            });
            dispatch(registrationActions.clearGetAllRegistrationsStatus());
            dispatch(registrationActions.clearGetAllRegistrationsError());
        }
    }, [dispatch, status, data?.registrations, error]);

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
                entryDate: currentSortField == "entryDate" ? currentSortOrder : "",
            });
            setFilter(true);
            fetchAllRegistrations();
        }
    };

    return {
        loading,
        registrations,
        setRefresh,
        handleFilter,
        total: data?.totalCount,
        setFilter,
        setFilters,
        filters
    }

}