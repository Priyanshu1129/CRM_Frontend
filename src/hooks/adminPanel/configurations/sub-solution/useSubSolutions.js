import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSubSolutions } from "@/redux/actions/configurationAction";
import { notification } from "antd";

export const useSubSolutions = (params = {}) => {
  const { refresh = false, setRefresh = null, configType = null } = params;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.subSolution.getAllSubSolutions
  );
  const [subSolutions, setSubSolutions] = useState(data?.data);

  const fetchAllSubSolutions = useCallback(() => {
    if (!data || refresh) {
      dispatch(getAllSubSolutions());
      setRefresh && setRefresh(false);
    }
  }, [dispatch, data, refresh]);

  useEffect(() => {
    if (!configType || configType == "sub-solution") fetchAllSubSolutions();
  }, [fetchAllSubSolutions, configType]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data?.status === "success") {
      if (data?.data !== subSolutions) {
        setSubSolutions(data?.data);
      }
      setLoading(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to  fetch Sub Solutions",
      });
    }
  }, [status, data, subSolutions, setRefresh]);

  const transformedSubSolutions = useMemo(() => {
    return subSolutions?.map(({ _id, label }) => ({
      value: _id,
      text: label,
    }));
  }, [subSolutions]);

  return { subSolutions: transformedSubSolutions ?? [], loading };
};
