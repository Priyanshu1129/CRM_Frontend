import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyPipeView } from "@/redux/actions/dashboardAction";
import { pipeViewActions } from "@/redux/slices/dashboardSlice";
import { notification } from "antd";
import moment from "moment";

export const useFetchMyPipeView = ({ particularDate }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const rawCurrentDate = useSelector(
    (state) => state.pipeView.myViewCurrentDate
  );
  const currentDate = rawCurrentDate ? moment(rawCurrentDate) : null;
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState({});
  const [filter, setFilter] = useState(false);
  const { status, data, error } = useSelector(
    (state) => state.pipeView.getMyPipeView
  );
  const [opportunities, setOpportunities] = useState(
    data?.data || {
      lead: [],
      prospect: [],
      qualification: [],
      followup: [],
      proposal: [],
      closing: [],
    }
  );

  const fetchMyPipeView = useCallback(() => {
    dispatch(getMyPipeView({ particularDate: particularDate, ...filters }));
  }, [dispatch, particularDate, filters]);

  useEffect(() => {
    if (
      refresh ||
      !currentDate?.isSame(particularDate, "day") ||
      (filter && filters)
    ) {
      fetchMyPipeView();
      dispatch(
        pipeViewActions.setMyViewCurrentDate(particularDate.toISOString())
      );
    }
    setFilter(false);
    setRefresh(false);
  }, [
    currentDate,
    dispatch,
    particularDate,
    refresh,
    fetchMyPipeView,
    filter,
    filters,
  ]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setOpportunities(data?.data);
      setLoading(false);
      dispatch(pipeViewActions.clearGetMyPipeViewStatus());
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to fetch pipe view data.",
      });
      dispatch(pipeViewActions.clearGetMyPipeViewStatus());
      dispatch(pipeViewActions.clearGetMyPipeViewError());
    }
  }, [status, data, error, dispatch]);

  return { loading, opportunities, setRefresh, setFilters, setFilter, filters };
};
