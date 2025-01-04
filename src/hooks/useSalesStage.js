import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSalesStages } from "@/redux/actions/configurationAction";
import { notification } from "antd";

export const useSalesStages = (params = {}) => {
  const {
    refresh = false,
    setRefresh = null,
    configType = null,
    config = false,
  } = params;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.salesStage.getAllSalesStages
  );
  const [salesStage, setSalesStages] = useState(data?.data);

  const fetchAllSalesStages = useCallback(() => {
    if (!data || refresh) {
      dispatch(getAllSalesStages(config));
      setRefresh && setRefresh(false);
    }
  }, [dispatch, data, refresh]);

  useEffect(() => {
    if (!configType || configType == "sales-stage") fetchAllSalesStages();
  }, [fetchAllSalesStages, configType]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data?.status === "success") {
      if (data?.data !== salesStage) {
        setSalesStages(data?.data);
      }
      setLoading(false);
    } else if (status === "failed") {
      notification.error({
        message: "Error",
        description: error || "Failed to  fetch Sales Stages",
      });
      setLoading(false);
    }
  }, [status, data, salesStage, setRefresh]);

  const transformedSolutions = useMemo(() => {
    return salesStage?.map(({ _id, label }) => ({
      value: _id,
      text: label,
    }));
  }, [salesStage]);

  return { salesStages: transformedSolutions ?? [], loading };
};
