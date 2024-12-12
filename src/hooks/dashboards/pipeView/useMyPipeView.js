import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyPipeView } from "@/redux/actions/dashboardAction";
import { pipeViewActions } from "@/redux/slices/dashboardSlice";
import { notification } from "antd";

export const useFetchMyPipeView = ({ myViewParticularDate, myView }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(null);
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
    dispatch(getMyPipeView({ particularDate: myViewParticularDate, ...filters }));
  }, [dispatch, myViewParticularDate, filters]);

  useEffect(() => {
    if (refresh || currentDate != myViewParticularDate || (filter && filters)) {
      if (myView) {
        fetchMyPipeView();
        setCurrentDate(myViewParticularDate);
      }
    }
    setFilter(false);
  }, [
    currentDate,
    myViewParticularDate,
    refresh,
    fetchMyPipeView,
    setCurrentDate,
    filter,
    filters,
    myView,
  ]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success") {
      setOpportunities(data?.data);
      setLoading(false);
      setRefresh(false);
      dispatch(pipeViewActions.clearGetMyPipeViewStatus());
    } else if (status === "failed") {
      setLoading(false);
      setRefresh(false);
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
