import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSalesSubStages } from "@/redux/actions/configurationAction";
import { notification } from "antd";

export const useSalesSubStages = (params = {}) => {
  const {
    refresh = false,
    setRefresh = null,
    configType = null,
    config = false,
  } = params;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data, error } = useSelector(
    (state) => state.salesSubStage.getAllSalesSubStages
  );
  const [salesSubStage, setSalesSubStages] = useState(data?.data);

  const fetchAllSalesSubStages = useCallback(() => {
    if (!data || refresh) {
      dispatch(getAllSalesSubStages(config));
      setRefresh && setRefresh(false);
    }
  }, [dispatch, data, refresh]);

  useEffect(() => {
    if (!configType || configType == "sales-sub-stage")
      fetchAllSalesSubStages();
  }, [fetchAllSalesSubStages, configType]);

  useEffect(() => {
    if (status === "pending") {
      setLoading(true);
    } else if (status === "success" && data?.status === "success") {
      if (data?.data !== salesSubStage) {
        setSalesSubStages(data?.data);
      }
      setLoading(false);
    } else if (status === "failed") {
      setLoading(false);
      notification.error({
        message: "Error",
        description: error || "Failed to  fetch Sales Sub Stages",
      });
    }
  }, [status, data, salesSubStage, setRefresh]);

  const transformedSalesSubStage = useMemo(() => {
    return salesSubStage?.map(({ _id, label, salesStage }) => {
      // console.log("sales stage in sales sub stage ", salesStage)
      return {
        value: _id,
        text: label,
        salesStageLabel: salesStage?.label || null,
        salesStage: salesStage,
      };
    });
  }, [salesSubStage]);

  return { salesSubStages: transformedSalesSubStage ?? [], loading };
};
