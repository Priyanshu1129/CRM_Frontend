import { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notification } from "antd";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { getAllTenders } from "@/redux/actions/tenderAction";

export const useFetchTenders = ({ pageSize, currentPage }) => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState({});
  const [filter, setFilter] = useState(false);
  const prevSorterRef = useRef({});
  const dispatch = useDispatch();

  const { status, data, error } = useSelector(
    (state) => state.tender.getAllTenders
  );
  const [tenders, setTenders] = useState(data?.tenders);

  const fetchTenders = useCallback(() => {
    if (
      currentPage !== Number(data?.page) ||
      pageSize !== Number(data?.limit) ||
      refresh ||
      filter
    ) {
      dispatch(
        getAllTenders({ page: currentPage, limit: pageSize, ...filters })
      );
      setFilter(false);
      setRefresh(false);
    }
  }, [currentPage, pageSize, filters, refresh, filter, dispatch, data]);

  useEffect(() => fetchTenders(), [fetchTenders]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setLoading(false);
      setTenders(data?.tenders);

      dispatch(tenderActions.clearGetAllTendersStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch tenders.",
      });
      dispatch(tenderActions.clearGetAllTendersStatus());
      dispatch(tenderActions.clearGetAllTendersError());
    }
  }, [status, data, error, dispatch]);

  const handleFilter = (pagination, tableFilters, sorter) => {
    const { field: sortField, order: sortOrder } = sorter || {};
    const prevSortField = prevSorterRef.current.field;
    const prevSortOrder = prevSorterRef.current.order;

    if (sortField !== prevSortField || sortOrder !== prevSortOrder) {
      prevSorterRef.current = { field: sortField, order: sortOrder };
      setFilter(true);
      setFilters({
        ...filters,
        entryDate:
          sortField === "entryDate"
            ? sortOrder === "descend"
              ? "-1"
              : "1"
            : "",
      });
    }
  };

  return {
    tenders,
    setRefresh,
    loading,
    total: data?.totalCount,
    handleFilter,
    setFilter,
    filters,
    setFilters,
  };
};
