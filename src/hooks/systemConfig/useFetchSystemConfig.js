import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { systemConfigActions } from "@/redux/slices/systemSlice";
import { getSystemConfig } from "@/redux/actions/systemConfigAction.js";
import { notification } from "antd";

export const useFetchSystemConfigDetails = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector(
        (state) => state.systemConfig.getSystemConfig
    );
    const [systemConfig, setSystemConfig] = useState(data?.data);

    const fetchSystemConfigDetails = useCallback(() => {
        if ((!systemConfig)) {
            dispatch(getSystemConfig());
        }
    }, [dispatch, systemConfig]);

    useEffect(() => {
        fetchSystemConfigDetails();
    }, [fetchSystemConfigDetails]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setSystemConfig(data?.data);
            setLoading(false);
            dispatch(systemConfigActions.clearGetSystemConfigStatus());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to fetch systemConfig.",
            });
            dispatch(systemConfigActions.clearGetSystemConfigStatus());
            dispatch(systemConfigActions.clearGetSystemConfigError());
        }
    }, [status, error, data?.data, dispatch]);

    return { loading, systemConfig }
}