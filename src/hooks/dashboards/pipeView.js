import { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getPipeView } from "@/redux/actions/dashboard"
import { pipeViewActions } from "@/redux/slices/dashboardSlice"
import { notification } from "antd"

export const useFetchPipeView = ({ particularDate }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [currentDate, setCurrentDate] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const { status, data, error } = useSelector((state) => state.pipeView.getPipeView);
    const [opportunities, setOpportunities] = useState(data?.data || { lead: [], prospect: [], qualification: [], followup: [], proposal: [], closing: [] });

    const fetchPipeView = useCallback(() => {
        dispatch(getPipeView({ particularDate }));
    }, [dispatch, particularDate])

    useEffect(() => {
        if (refresh || currentDate != particularDate) {
            fetchPipeView();
            setCurrentDate(particularDate);
        }
    }, [currentDate, particularDate, refresh, fetchPipeView, setCurrentDate])

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setOpportunities(data?.data)
            setLoading(false);
            setRefresh(false);
            dispatch(pipeViewActions.clearGetPipeViewStatus());
        } else if (status === "failed") {
            setLoading(false);
            setRefresh(false);
            notification.error({
                message: "Error",
                description: error || "Failed to fetch pipe view data."
            })
            dispatch(pipeViewActions.clearGetPipeViewStatus());
            dispatch(pipeViewActions.clearGetPipeViewError());
        }
    }, [status, data, error, dispatch])

    return { loading, opportunities, setRefresh };
}