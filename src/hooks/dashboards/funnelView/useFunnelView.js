import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFunnelView } from "@/redux/actions/dashboardAction";
import { funnelViewActions } from "@/redux/slices/dashboardSlice";
import { notification } from "antd";
import moment from "moment";

export const useFetchFunnelView = ({
  particularDate,
  myView,
  viewChecking,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const rawCurrentDate = useSelector((state) => state.funnelView.currentDate);
  const currentDate = rawCurrentDate ? moment(rawCurrentDate) : null;
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState({});
  const [filter, setFilter] = useState(false);
  const { status, data, error } = useSelector(
    (state) => state.funnelView.getFunnelView
  );
  const [funnelViewData, setFunnelViewData] = useState(data?.data);
  const [conversionStats, setConversionStats] = useState(
    data?.data?.conversionStats || {}
  );

  const fetchFunnelView = useCallback(() => {
    dispatch(getFunnelView({ particularDate, ...filters }));
  }, [dispatch, particularDate, filters]);

  useEffect(() => {
    if (
      refresh ||
      !currentDate?.isSame(particularDate, "day") ||
      (filter && filters)
    ) {
      if (!myView && !viewChecking) {
        fetchFunnelView();
        dispatch(
          funnelViewActions.setCurrentDate(particularDate.toISOString())
        );
      }
    }
    setFilter(false);
    setRefresh(false);
  }, [
    currentDate,
    particularDate,
    refresh,
    fetchFunnelView,
    filter,
    filters,
    myView,
    dispatch,
    viewChecking,
  ]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setFunnelViewData(data?.data);
      setConversionStats(data?.data?.conversionStats);
      setLoading(false);
      dispatch(funnelViewActions.clearGetFunnelViewStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch funnel view data.",
      });
      dispatch(funnelViewActions.clearGetFunnelViewStatus());
      dispatch(funnelViewActions.clearGetFunnelViewError());
    }
  }, [status, data, error, dispatch]);

  return {
    loading,
    funnelViewData,
    conversionStats,
    setRefresh,
    setFilters,
    setFilter,
    filters,
  };
};
