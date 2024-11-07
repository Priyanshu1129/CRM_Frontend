import { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getFunnelView } from "@/redux/actions/dashboard"
import { funnelViewActions } from "@/redux/slices/dashboardSlice"
import { notification } from "antd"

export const useFetchFunnelView = ({ startDate, endDate }) => {
    console.log('sd', startDate, 'ed', endDate)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [sDate, setSDate] = useState("2010-01-01"); // start date
    const [eDate, setEDate] = useState(Date.now()); // end date
    const [refresh, setRefresh] = useState(false);
    const [filters, setFilters] = useState({});
    const [filter, setFilter] = useState(false);
    const { status, data, error } = useSelector((state) => state.funnelView.getFunnelView);
    const [funnelViewData, setFunnelViewData] = useState(data?.data);
    const [conversionStats, setConversionStats] = useState(data?.data?.conversionStats || {});

    const fetchFunnelView = useCallback(() => {
        dispatch(getFunnelView({ startDate, endDate, ...filters }));
    }, [dispatch, endDate, startDate, filters])

    useEffect(() => {
        if (refresh || startDate != sDate || endDate != eDate || (filter && filters)) {
            fetchFunnelView();
            setSDate(startDate);
            setEDate(endDate);
        }
        setFilter(false);
    }, [sDate, eDate, startDate, endDate, refresh, fetchFunnelView, filter, filters])

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