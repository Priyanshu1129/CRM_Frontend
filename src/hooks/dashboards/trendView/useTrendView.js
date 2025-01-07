import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTrendView } from "@/redux/actions/dashboardAction/trendView";
import { trendViewActions } from "@/redux/slices/dashboardSlice/trendView";
import { notification } from "antd";
import moment from "moment";

export const useFetchTrendView = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState({});
  const [filter, setFilter] = useState(false);
  const { status, data, error } = useSelector(
    (state) => state.trendView.getTrendView
  );
  const [trendView, setTrendView] = useState(
    data || []
  );

  const fetchTrendView = useCallback(() => {
    dispatch(getTrendView({ ...filters }));
  }, [dispatch, filters]);

  useEffect(() => {
    if (
      refresh ||
      (filter && filters)
    ) {
      fetchTrendView();
    }
    setFilter(false);
    setRefresh(false);
  }, [
    refresh,
    fetchTrendView,
    filter,
    filters,
    dispatch,
  ]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setTrendView(data);
      setLoading(false);
      dispatch(trendViewActions.clearGetTrendViewStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch pipe view data.",
      });
      dispatch(trendViewActions.clearGetTrendViewStatus());
      dispatch(trendViewActions.clearGetTrendViewError());
    }
  }, [status, data, error, dispatch]);

  return { loading, trendView, setRefresh, setFilters, setFilter, filters };
};
