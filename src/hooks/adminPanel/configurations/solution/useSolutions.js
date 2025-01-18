import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSolutions } from "@/redux/actions/configurationAction";
import { notification } from "antd";

export const useSolutions = (params = {}) => {
  const {
    refresh = false,
    setRefresh = null,
    configType = null,
    config = false,
  } = params;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.solution.getAllSolutions
  );
  const [solutions, setSolutions] = useState(data?.data);

  const fetchAllSolutions = useCallback(() => {
    if (!data || refresh) {
      dispatch(getAllSolutions(config));
      setRefresh && setRefresh(false);
    }
  }, [dispatch, data, refresh]);

  useEffect(() => {
    if (!configType || configType == "solution") fetchAllSolutions();
  }, [fetchAllSolutions, configType]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data?.status === "success") {
      if (data?.data !== solutions) {
        setSolutions(data?.data);
      }
      setLoading(false);
    } else if (status === "failed") {
      notification.error({
        message: "Error",
        description: error || "Failed to  fetch Solutions",
      });
      setLoading(false);
    }
  }, [status, data, solutions, setRefresh]);

  const transformedSolutions = useMemo(() => {
    return solutions?.map(({ _id, label }) => ({
      value: _id,
      text: label,
    }));
  }, [solutions]);

  return { solutions: transformedSolutions ?? [], loading };
};
