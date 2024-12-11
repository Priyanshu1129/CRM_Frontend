import { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getMyFunnelView } from "@/redux/actions/dashboardAction"
import { funnelViewActions } from "@/redux/slices/dashboardSlice"
import { notification } from "antd"

export const useFetchMyFunnelView = ({ myViewParticularDate, myView }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [currentDate, setCurrentDate] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [filters, setFilters] = useState({});
    const [filter, setFilter] = useState(false);
    const { status, data, error } = useSelector((state) => state.funnelView.getMyFunnelView);
    const [funnelViewData, setFunnelViewData] = useState(data?.data);
    const [conversionStats, setConversionStats] = useState(data?.data?.conversionStats || {});

    const fetchFunnelView = useCallback(() => {
        dispatch(getMyFunnelView({ particularDate: myViewParticularDate, ...filters }));
    }, [dispatch, myViewParticularDate, filters])

    useEffect(() => {
        if (refresh || currentDate != myViewParticularDate || (filter && filters)) {
            if (myView) {
                fetchFunnelView();
                setCurrentDate(myViewParticularDate);
            }
        }
        setFilter(false);
    }, [currentDate, myViewParticularDate, refresh, fetchFunnelView, filter, filters, myView])

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setFunnelViewData(data?.data)
            setConversionStats(data?.data?.conversionStats);
            setLoading(false);
            setRefresh(false);
            dispatch(funnelViewActions.clearGetFunnelViewStatus());
        } else if (status === "failed") {
            setLoading(false);
            setRefresh(false);
            notification.error({
                message: "Error",
                description: error || "Failed to fetch funnel view data."
            })
            dispatch(funnelViewActions.clearGetFunnelViewStatus());
            dispatch(funnelViewActions.clearGetFunnelViewError());
        }
    }, [status, data, error, dispatch])

    return { loading, funnelViewData, conversionStats, setRefresh, setFilters, setFilter, filters };
}