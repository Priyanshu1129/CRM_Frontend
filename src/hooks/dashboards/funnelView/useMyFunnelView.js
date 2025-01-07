import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyFunnelView } from "@/redux/actions/dashboardAction";
import { funnelViewActions } from "@/redux/slices/dashboardSlice";
import { notification } from "antd";
import moment from "moment";

export const useFetchMyFunnelView = ({
  myViewParticularDate,
  myView,
  canSeeMyView,
  filters,
  filter,
  setFilter,
  refresh,
  setRefresh,
}) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const rawCurrentDate = useSelector(
    (state) => state.funnelView.myViewCurrentDate
  );
  const currentDate = rawCurrentDate ? moment(rawCurrentDate) : null;

  const { status, data, error } = useSelector(
    (state) => state.funnelView.getMyFunnelView
  );
  const [funnelViewData, setFunnelViewData] = useState(data?.data);
  const [conversionStats, setConversionStats] = useState(
    data?.data?.conversionStats || {}
  );

  // if (!canSeeMyView || !myView) {
  //   return {
  //     loading: false,
  //     funnelViewData: null,
  //     conversionStats: null,
  //   };
  // }

  const fetchFunnelView = useCallback(() => {
    dispatch(
      getMyFunnelView({ particularDate: myViewParticularDate, ...filters })
    );
  }, [dispatch, myViewParticularDate, filters]);

  useEffect(() => {
    if (
      refresh ||
      !currentDate?.isSame(myViewParticularDate, "day") ||
      (filter && filters)
    ) {
      if (myView && canSeeMyView) {
        fetchFunnelView();
        dispatch(
          funnelViewActions.setMyViewCurrentDate(
            myViewParticularDate.toISOString()
          )
        );
      }
    }
    setFilter(false);
    setRefresh(false);
  }, [
    currentDate,
    myViewParticularDate,
    refresh,
    fetchFunnelView,
    filter,
    filters,
    myView,
    dispatch,
    canSeeMyView,
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
