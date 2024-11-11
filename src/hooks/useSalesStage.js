import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSalesStages } from "@/redux/actions/configurationAction";

export const useSalesStages = (params = {}) => {
    const { refresh = false, setRefresh = null, configType = null } = params

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, data } = useSelector(
        (state) => state.salesStage.getAllSalesStages
    );
    const [salesStage, setSalesStages] = useState(data?.data);

    const fetchAllSalesStages = useCallback(() => {
        if (!data || refresh) {
            dispatch(getAllSalesStages());
        }
    }, [dispatch, data, refresh]);

    useEffect(() => {
        if (!configType || configType == "sales-stage")
            fetchAllSalesStages();
    }, [fetchAllSalesStages, configType]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success" && data?.status === "success") {
            if (data?.data !== salesStage) {
                setSalesStages(data?.data);
            }
            setLoading(false);
            setRefresh && setRefresh(false);
        } else {
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