import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFunnelView } from "@/redux/actions/dashboardAction";
import { funnelViewActions } from "@/redux/slices/dashboardSlice";
import { notification } from "antd";
import moment from "moment";

export const useFetchFunnelView = ({
  allViewParticularDate,
  myView,
  canSeeAllView,
  filters,
  filter,
  setFilter,
  refresh,
  setRefresh,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const rawCurrentDate = useSelector(
    (state) => state.funnelView.allViewCurrentDate
  );
  const currentDate = rawCurrentDate ? moment(rawCurrentDate) : null;

  const { status, data, error } = useSelector(
    (state) => state.funnelView.getFunnelView
  );
  const [funnelViewData, setFunnelViewData] = useState(data?.data);
  const [conversionStats, setConversionStats] = useState(
    data?.data?.conversionStats || {}
  );

  if (!canSeeAllView || myView) {
    return {
      loading: false,
      funnelViewData: null,
      conversionStats: null,
    };
  }

  const fetchFunnelView = useCallback(() => {
    dispatch(
      getFunnelView({ particularDate: allViewParticularDate, ...filters })
    );
  }, [dispatch, allViewParticularDate, filters]);

  useEffect(() => {
    if (
      refresh ||
      !currentDate?.isSame(allViewParticularDate, "day") ||
      (filter && filters)
    ) {
      if (!myView && canSeeAllView) {
        fetchFunnelView();
        dispatch(
          funnelViewActions.setAllViewCurrentDate(
            allViewParticularDate.toISOString()
          )
        );
      }
    }
    setFilter(false);
    setRefresh(false);
  }, [
    currentDate,
    allViewParticularDate,
    refresh,
    fetchFunnelView,
    filter,
    filters,
    myView,
    dispatch,
    canSeeAllView,
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
  };
};
