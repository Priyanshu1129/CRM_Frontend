import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSummaryView } from "@/redux/actions/dashboardAction";
import { summaryViewActions } from "@/redux/slices/dashboardSlice";
import { notification } from "antd";

export const useFetchSummaryView = ({ year }) => {
  console.log("inside summary view hook", year);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const { status, data, error } = useSelector(
    (state) => state?.summaryView?.getSummaryView || {}
  );
  const currentYear = useSelector((state) => state.summaryView.currentYear);
  const [summaryViewData, setSummaryViewData] = useState(data);

  const fetchSummaryView = useCallback(() => {
    dispatch(getSummaryView({ year }));
  }, [dispatch, year]);

  useEffect(() => {
    if (refresh || currentYear != year) {
      fetchSummaryView();
      dispatch(summaryViewActions.setCurrentYear(year));
    }
  }, [refresh, fetchSummaryView]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setSummaryViewData(data);
      setLoading(false);
      setRefresh(false);
      dispatch(summaryViewActions.clearGetSummaryViewStatus());
    } else if (status === "failed") {
      setLoading(false);
      setRefresh(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch summary view data.",
      });
      dispatch(summaryViewActions.clearGetSummaryViewStatus());
      dispatch(summaryViewActions.clearGetSummaryViewError());
    }
  }, [status, data, error, dispatch]);

  return {
    loading,
    summaryViewData,
    setRefresh,
  };
};
