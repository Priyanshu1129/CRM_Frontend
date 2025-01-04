import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllIndustries,
  getAllSolutions,
} from "@/redux/actions/configurationAction";

export const useSolutions = (params = {}) => {
  const {
    refresh = false,
    setRefresh = null,
    configType = null,
    config = false,
  } = params;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data } = useSelector(
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
    } else {
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
