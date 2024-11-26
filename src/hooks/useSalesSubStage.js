import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllSalesSubStages,
} from "@/redux/actions/configurationAction";

export const useSalesSubStages = (params = {}) => {
  const { refresh = false, setRefresh = null, configType = null } = params;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { status, data } = useSelector(
    (state) => state.salesSubStage.getAllSalesSubStages
  );
  const [salesSubStage, setSalesSubStages] = useState(data?.data);

  const fetchAllSalesSubStages = useCallback(() => {
    if (!data || refresh) {
      dispatch(getAllSalesSubStages());
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
      setRefresh && setRefresh(false);
    } else {
      setLoading(false);
    }
  }, [status, data, salesSubStage, setRefresh]);

  const transformedSalesSubStage = useMemo(() => {
    return salesSubStage?.map(({ _id, label, salesStage }) => {
      // console.log("sales stage in sales sub stage ", salesStage)
      return {
        value: _id,
        text: label,
        salesStageLabel: salesStage?.label || null,
        salesStage: salesStage
      };
    });
  }, [salesSubStage]);

  return { salesSubStages: transformedSalesSubStage ?? [], loading };
};
