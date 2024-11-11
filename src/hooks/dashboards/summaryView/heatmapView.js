import { useState, useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getHeatmapView } from "@/redux/actions/dashboardAction"
import { summaryViewActions } from "@/redux/slices/dashboardSlice"
import { notification } from "antd"

export const useFetchHeatmapView = ({ year, stageId }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [selectedYear, setSelectedYear] = useState(year); // start year
    const [selectedStage, setSelectedStage] = useState(stageId);
    const [refresh, setRefresh] = useState(false);
    const [filters, setFilters] = useState({});
    const [filter, setFilter] = useState(false);
    const { status, data, error } = useSelector((state) => state.summaryView.getHeatmapView);
    const [heatmapViewData, setHeatmapViewData] = useState(data?.data);

    const fetchHeatmapView = useCallback(() => {
        dispatch(getHeatmapView({ year, stageId, ...filters }));
    }, [dispatch, year, stageId, filters])

    useEffect(() => {
        if (refresh || selectedStage != stageId || selectedYear != year || (filter && filters)) {
            fetchHeatmapView();
            setSelectedYear(year);
            setSelectedStage(stageId);
        }
        setFilter(false);
    }, [selectedStage, stageId, selectedYear, year, refresh, fetchHeatmapView, filter, filters])

    useEffect(() => {
        if (status === "pending") {
            setLoading(true);
        } else if (status === "success") {
            setHeatmapViewData(data?.data)
            setLoading(false);
            setRefresh(false);
            dispatch(summaryViewActions.clearGetHeatmapViewStatus());
        } else if (status === "failed") {
            setLoading(false);
            setRefresh(false);
            notification.error({
                message: "Error",
                description: error || "Failed to fetch heatmap view data."
            })
            dispatch(summaryViewActions.clearGetHeatmapViewStatus());
            dispatch(summaryViewActions.clearGetHeatmapViewError());
        }
    }, [status, data, error, dispatch])

    return { loading, heatmapViewData, setRefresh, setFilters, setFilter, filters };
}