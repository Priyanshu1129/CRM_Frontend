import { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getFunnelView } from "@/redux/actions/dashboardAction"
import { funnelViewActions } from "@/redux/slices/dashboardSlice"
import { notification } from "antd"

export const useFetchFunnelView = ({ particularDate }) => {
    console.log("particular date in useFetrchFunnelView", particularDate)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [currentDate, setCurrentDate] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [filters, setFilters] = useState({});
    const [filter, setFilter] = useState(false);
    const { status, data, error } = useSelector((state) => state.funnelView.getFunnelView);
    const [funnelViewData, setFunnelViewData] = useState(data?.data);
    const [conversionStats, setConversionStats] = useState(data?.data?.conversionStats || {});

    const fetchFunnelView = useCallback(() => {
        dispatch(getFunnelView({ particularDate, ...filters }));
    }, [dispatch, particularDate, filters])

    useEffect(() => {
        if (refresh || currentDate != particularDate || (filter && filters)) {
            fetchFunnelView();
            setCurrentDate(particularDate);
        }
        setFilter(false);
    }, [currentDate, particularDate, refresh, fetchFunnelView, filter, filters])

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