import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOpportunity } from "@/redux/actions/opportunityAction";
import { opportunityActions } from "@/redux/slices/opportunitySlice";
import { notification } from "antd";

export const useFetchOpportunityDetails = (id) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { status, error, data } = useSelector(
        (state) => state.opportunity.getOpportunity
    );

    const [opportunity, setOpportunity] = useState(data?.data);

    const fetchOpportunityDetails = useCallback(() => {
        if ((!opportunity && id) || id !== String(opportunity?._id)) {
            dispatch(getOpportunity(id));
        }
    }, [dispatch, id, opportunity]);

    useEffect(() => {
        fetchOpportunityDetails();
    }, [fetchOpportunityDetails]);

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setOpportunity(data?.data);
            setLoading(false);
            dispatch(opportunityActions.clearGetOpportunityStatus());
        } else if (status === "failed") {
            setLoading(false);
            notification.error({
                message: "Error",
                description: error || "Failed to fetch opportunity.",
            });
            dispatch(opportunityActions.clearGetOpportunityStatus());
            dispatch(opportunityActions.clearGetOpportunityError());
        }
    }, [status, error, data?.data, dispatch]);

    return { loading, opportunity };
}