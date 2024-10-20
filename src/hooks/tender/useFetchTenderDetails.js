import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTender } from "@/redux/actions/tenderAction";
import { tenderActions } from "@/redux/slices/tenderSlice";
import { notification } from "antd";

export const useFetchTenderDetails = (id) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector(
        (state) => state.tender.getTender
    );
    const [tender, setTender] = useState(data?.data);

    const fetchTenderDetails = useCallback(() => {
        if ((!tender && id) || id !== String(tender?._id)) {
            dispatch(getTender(id));
        }
    }, [dispatch, id, tender]);

    useEffect(() => {
        fetchTenderDetails();
    }, [fetchTenderDetails]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setTender(data?.data);
            setLoading(false);
            dispatch(tenderActions.clearGetTenderStatus());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to fetch tender.",
            });
            dispatch(tenderActions.clearGetTenderStatus());
            dispatch(tenderActions.clearGetTenderError());
        }
    }, [status, error, data?.data, dispatch]);

    return { loading, tender };
}